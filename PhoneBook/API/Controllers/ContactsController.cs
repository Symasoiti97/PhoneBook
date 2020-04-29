using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using DataBase.Models;
using DataManager;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataBase.Common;
using DataBase.DtoModels.Contact;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/contact")]
    public class ContactsController : Controller
    {
        private readonly IDataBaseService _dbService;
        private readonly IMapper _mapper;

        public ContactsController(IDataBaseService dbService, IMapper mapper)
        {
            _dbService = dbService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<ContactDto>> Search(string pattern)
        {
            var userId = User.Claims.GetUserId();

            if (!string.IsNullOrEmpty(pattern))
                return await _dbService
                    .Get<ContactDb>(i => i.User.Id == userId &&
                                         EF.Functions.ILike(i.Email, $"%{pattern}%") ||
                                         EF.Functions.ILike(i.Name, $"%{pattern}%") ||
                                         i.Phones.Any(p => EF.Functions.ILike(p.Number, $"%{pattern}%")) ||
                                         i.Addresses.Any(p => EF.Functions.ILike(p.Address, $"%{pattern}%")))
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .OrderBy(i => i.Name)
                    .ToListAsync();

            return await _dbService.Get<ContactDb>(i => i.User.Id == userId)
                .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                .OrderBy(i => i.Name)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ContactDto> Get(Guid id)
        {
            var contact = await _dbService.Get<ContactDb>(u => u.Id == id)
                .ProjectTo<ContactDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
            if (contact == null)
                throw new Exception("Контакта не существует");

            return contact;
        }


        [HttpGet("group/{groupId}")]
        public async Task<List<ContactDto>> GetByGroupId(Guid groupId)
        {
            var userId = User.Claims.GetUserId();

            var contacts = await _dbService.Get<ContactDb>(i =>
                    i.User.Id == userId && i.ContactsGroups.Any(j => j.GroupDb.Id == groupId))
                .ProjectTo<ContactDto>(_mapper.ConfigurationProvider).ToListAsync();

            return contacts;
        }

        [HttpPost]
        public async Task CreateContact([FromBody] CreateEntityRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = User.Claims.GetUserId();

            var contactDb = new ContactDb
            {
                Name = request.Name,
                UserId = userId,
                Notes = "[]",
                Gender = Gender.Undefined,
                AddressCategories = DefaultAddressCategories(),
                PhoneCategories = DefaultPhoneCategories()
            };

            await _dbService.Insert(contactDb);
        }

        private static List<AddressCategoryDb> DefaultAddressCategories()
        {
            var addressCategoriesDb = new List<AddressCategoryDb>
            {
                new AddressCategoryDb
                {
                    Name = "Домашний"
                },
                new AddressCategoryDb
                {
                    Name = "Рабочий"
                },
                new AddressCategoryDb
                {
                    Name = "Мобильный"
                }
            };

            return addressCategoriesDb;
        }

        private static List<PhoneCategoryDb> DefaultPhoneCategories()
        {
            var nePhoneCategoryDb = new List<PhoneCategoryDb>
            {
                new PhoneCategoryDb
                {
                    Name = "Домашний"
                },
                new PhoneCategoryDb
                {
                    Name = "Рабочий"
                },
                new PhoneCategoryDb
                {
                    Name = "Мобильный"
                }
            };

            return nePhoneCategoryDb;
        }

        [HttpPut("{contactId}")]
        public async Task UpdateContact(Guid contactId, [FromBody] UpdateContactRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            await using var transaction = await _dbService.Transaction();

            var contactDb = await _dbService.Get<ContactDb>(i => i.Id == contactId)
                .Include(i => i.ContactsGroups)
                .Include(i => i.AddressCategories)
                .Include(i => i.Addresses)
                .Include(i => i.PhoneCategories)
                .Include(i => i.Phones)
                .FirstOrDefaultAsync();
            if (contactDb == null)
                throw new Exception("Контакта не существует");

            var contactsGroups = request.GroupIds?
                .Select(i => new ContactGroupDb {GroupId = i, ContactId = contactDb.Id}).ToList();

            var addressCategories = _mapper.Map<List<AddressCategoryDb>>(request.AddressCategories);
            var phoneCategories = _mapper.Map<List<PhoneCategoryDb>>(request.PhoneCategories);

            addressCategories.ForEach(i =>
            {
                i.ContactId = contactId;
                foreach (var address in i.Addresses)
                {
                    address.ContactId = contactId;
                }
            });

            phoneCategories.ForEach(i =>
            {
                i.ContactId = contactId;
                foreach (var phone in i.Phones)
                {
                    phone.ContactId = contactId;
                }
            });

            await _dbService.DeleteRange(contactDb.ContactsGroups);
            await _dbService.DeleteRange(contactDb.Addresses);
            await _dbService.DeleteRange(contactDb.Phones);
            await _dbService.DeleteRange(contactDb.AddressCategories);
            await _dbService.DeleteRange(contactDb.PhoneCategories);

            contactDb.Name = request.Name;
            contactDb.DateOfBirth = request.DateOfBirth;
            contactDb.Email = request.Email;
            contactDb.Gender = request.Gender;
            contactDb.Notes = JsonSerializer.Serialize(request.Notes);
            contactDb.AddressCategories = addressCategories;
            contactDb.PhoneCategories = phoneCategories;
            contactDb.ContactsGroups = contactsGroups;

            await _dbService.Update(contactDb);

            await transaction.CommitAsync();
        }

        [HttpPost("category/address/{contactId}")]
        public async Task CreateAddressCategory(Guid contactId, [FromBody] CreateEntityRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var newAddressCategoryDb = new AddressCategoryDb
            {
                ContactId = contactId,
                Name = request.Name
            };

            await _dbService.Insert(newAddressCategoryDb);
        }

        [HttpDelete("category/address/{addressCategoryId}")]
        public async Task DeleteAddressCategory(Guid addressCategoryId)
        {
            var addressCategoryDb = await _dbService.Get<AddressCategoryDb>(i => i.Id == addressCategoryId)
                .SingleOrDefaultAsync();

            if (addressCategoryDb == null)
                throw new Exception("Категории адреса не существует");

            await _dbService.Delete(addressCategoryDb);
        }

        [HttpPost("category/phone/{contactId}")]
        public async Task CreatePhoneCategory(Guid contactId, [FromBody] CreateEntityRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var newPhoneCategoryDb = new PhoneCategoryDb
            {
                ContactId = contactId,
                Name = request.Name
            };

            await _dbService.Insert(newPhoneCategoryDb);
        }

        [HttpDelete("category/phone/{phoneCategoryId}")]
        public async Task DeletePhoneCategory(Guid phoneCategoryId)
        {
            var phoneCategoryDb = await _dbService.Get<PhoneCategoryDb>(i => i.Id == phoneCategoryId)
                .SingleOrDefaultAsync();

            if (phoneCategoryDb == null)
                throw new Exception("Категории телефона не существует");

            await _dbService.Delete(phoneCategoryDb);
        }

        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            var contactDb = await _dbService.Get<ContactDb>().FirstOrDefaultAsync(x => x.Id == id);
            if (contactDb == null)
                throw new Exception("Контакта не существует");

            await _dbService.Delete(contactDb);
        }
    }
}