using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeProject.Models
{
    public class Ingredient
    {
        public Guid ID { get; set; }

        public string Name { get; set; }

        public string Details { get; set; }
    }
}
