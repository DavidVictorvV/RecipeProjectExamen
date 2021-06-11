using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeProject.Models
{
    public class Coments
    {

        public Guid ID { get; set; }

        public string Msg { get; set; }

        public Guid RecipeID { get; set; }

        public Guid UserID { get; set; }

    }
}
