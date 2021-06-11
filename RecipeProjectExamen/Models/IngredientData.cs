using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeProject.Models
{
    public class IngredientData
    {
        public Guid ID { get; set; }

        public Guid RecipeID { get; set; }

        public Guid IngredientID { get; set; }

        public string Quantity { get; set; }
    }
}
