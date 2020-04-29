using System;

namespace DataBase.DtoModels.Contact
{
    public class PhoneDto
    {
        public string Number { get; set; }
        public Guid PhoneCategoryId { get; set; }
    }
}