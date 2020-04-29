using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Models
{
    [Table("ContactsGroups")]
    public class ContactGroupDb
    {
        public Guid ContactId { get; set; }
        public ContactDb ContactDb { get; set; }
        public Guid GroupId { get; set; }
        public GroupDb GroupDb { get; set; }
    }
}