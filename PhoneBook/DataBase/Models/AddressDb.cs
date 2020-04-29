using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Models
{
    [Table("Addresses")]
    public class AddressDb
    {
        public Guid Id { get; set; }
        public string Address { get; set; }

        public Guid AddressCategoryId { get; set; }
        public AddressCategoryDb AddressCategory { get; set; }

        public Guid ContactId { get; set; }
        public ContactDb Contact { get; set; }
    }
}