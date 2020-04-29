using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Models
{
    [Table("Groups")]
    public class GroupDb
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid UserId { get; set; }
        public UserDb User { get; set; }

        public ICollection<ContactGroupDb> ContactsGroups { get; set; }
    }
}