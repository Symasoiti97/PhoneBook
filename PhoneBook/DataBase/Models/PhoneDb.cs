using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Models
{
    [Table("Phones")]
    public class PhoneDb
    {
        public Guid Id { get; set; }
        public string Number { get; set; }

        public Guid PhoneCategoryId { get; set; }
        public PhoneCategoryDb PhoneCategory { get; set; }
        
        public Guid ContactId { get; set; }
        public ContactDb Contact { get; set; }
    }
}