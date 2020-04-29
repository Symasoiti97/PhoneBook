using System;
using System.Collections.Generic;
using DataBase.DtoModels.Group;

namespace DataBase.DtoModels.Contact
{
    public class ContactDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public string UrlImage { get; set; }
        public IEnumerable<NoteDto> Notes { get; set; }
        public List<GroupDto> Groups { get; set; }
        public List<CategoryDto> AddressCategories { get; set; }
        public List<CategoryDto> PhoneCategories { get; set; }
    }
}