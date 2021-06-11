using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeProject.Models
{
    public class User
    {

        public Guid ID { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }

        public Boolean LoggedIn { get; set; }
    }
}
