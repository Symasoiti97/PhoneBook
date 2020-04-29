using System;
using System.Collections.Generic;

namespace DataBase.DtoModels.Contact
{
    public class AddressCategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<PhoneDto> Items { get; set; }
    }
}