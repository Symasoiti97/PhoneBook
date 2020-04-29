using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Models
{
    [Table("Users")]
    public class UserDb
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public ICollection<GroupDb> Groups { get; set; }
        public ICollection<ContactDb> Contacts { get; set; }
    }
}