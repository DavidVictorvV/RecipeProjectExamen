using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeProject.Models
{
    public class Recipe
    {
        public Guid ID { get; set; }

        public string RecipeName { get; set; }

        public string ImageLink { get; set; }

        public Guid AuthorId { get; set; }

        public string RecipeSummary { get; set; }

        public string RecipeDetails { get; set; }

        public int CookingTime { get; set; }

        public int RecipeRatingAverage { get; set; }

    }
}
