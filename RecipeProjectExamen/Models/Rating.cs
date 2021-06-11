using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeProject.Models
{
    public class Rating
    {
        public Guid ID { get; set; }

        public int RatingNr { get; set; }

        public Guid UserID { get; set; }

        public Guid RecipeID { get; set; }

    }
}
