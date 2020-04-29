using System;
using System.Collections.Generic;
using DataBase.Common;

namespace DataBase.DtoModels.Contact
{
    public class UpdateContactRequest
    {
        public string Name { get; set; }
        public Gender Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public List<NoteDto> Notes { get; set; }
        public List<Guid> GroupIds { get; set; }
        public List<CategoryDto> PhoneCategories { get; set; }
        public List<CategoryDto> AddressCategories { get; set; }
    }
}