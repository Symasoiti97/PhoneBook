using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using DataBase.Common;

namespace DataBase.Models
{
    [Table("Contacts")]
    public class ContactDb
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string UrlImage { get; set; }

        public string Notes { get; set; }

        public Guid UserId { get; set; }
        public UserDb User { get; set; }

        public ICollection<ContactGroupDb> ContactsGroups { get; set; }
        public ICollection<PhoneDb> Phones { get; set; }
        public ICollection<PhoneCategoryDb> PhoneCategories { get; set; }
        public ICollection<AddressDb> Addresses { get; set; }
        public ICollection<AddressCategoryDb> AddressCategories { get; set; }
    }
}