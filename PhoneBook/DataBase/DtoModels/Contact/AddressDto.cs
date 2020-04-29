using System;

namespace DataBase.DtoModels.Contact
{
    public class AddressDto
    {
        public Guid AddressCategoryId { get; set; }
        public string Address { get; set; }
    }
}