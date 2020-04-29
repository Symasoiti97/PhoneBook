using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DataBase.DtoModels.Contact;
using DataBase.DtoModels.Group;
using DataBase.DtoModels.User;
using DataBase.Models;
using Newtonsoft.Json;

namespace DataBase.Mapping
{
    public class ApiMapperProfile : Profile
    {
        public ApiMapperProfile()
        {
            CreateMap<UserDb, UserDto>();

            CreateMap<ContactDb, ContactDto>()
                .ForMember(dest => dest.Notes, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<IEnumerable<NoteDto>>(src.Notes)))
                .ForMember(dest => dest.Groups,
                    opt => opt.MapFrom(src =>
                        src.ContactsGroups.Select(i => new GroupDto {Id = i.GroupDb.Id, Name = i.GroupDb.Name})
                            .ToList()));

            CreateMap<GroupDb, GroupDto>();

            //CreateMap<ContactGroupDb, GroupDto>()
            //    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.GroupDb.Name))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.GroupDb.Id));

            CreateMap<AddressCategoryDb, AddressCategoryDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Addresses));
            CreateMap<AddressDb, AddressDto>();
            CreateMap<PhoneCategoryDb, PhoneCategoryDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Phones));
            CreateMap<PhoneDb, PhoneDto>();

            CreateMap<AddressCategoryDb, CategoryDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Addresses));
            CreateMap<AddressDb, EntityDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Address));
            CreateMap<PhoneCategoryDb, CategoryDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Phones));
            CreateMap<PhoneDb, EntityDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Number));

            CreateMap<AddressDto, AddressDb>()
                .ForMember(dest => dest.AddressCategoryId, opt => opt.MapFrom(src => src.AddressCategoryId))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<PhoneDto, PhoneDb>()
                .ForMember(dest => dest.PhoneCategoryId, opt => opt.MapFrom(src => src.PhoneCategoryId))
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Number))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<CategoryDto, AddressCategoryDb>()
                //.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Addresses, opt => opt.MapFrom(src => src.Items))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<EntityDto, AddressDb>()
               // .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Name))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<CategoryDto, PhoneCategoryDb>()
           //     .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Phones, opt => opt.MapFrom(src => src.Items))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<EntityDto, PhoneDb>()
             //   .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Name))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}