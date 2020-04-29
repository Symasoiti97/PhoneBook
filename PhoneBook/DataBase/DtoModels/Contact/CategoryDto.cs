using System;
using System.Collections.Generic;

namespace DataBase.DtoModels.Contact
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<EntityDto> Items { get; set; }
    }
}