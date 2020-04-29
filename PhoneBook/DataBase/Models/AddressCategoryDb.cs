using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Models
{
    [Table("AddressCategory")]
    public class AddressCategoryDb
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
       
        public Guid ContactId { get; set; }
        public ContactDb Contact { get; set; }

        public ICollection<AddressDb> Addresses { get; set; }
    }
}