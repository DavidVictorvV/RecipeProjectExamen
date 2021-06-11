using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeProjectExamen.Models
{
    public class CommentTable
    {

        public Guid ID { get; set; }

        public string Msg { get; set; }

        public Guid RecipeID { get; set; }

        public Guid UserID { get; set; }

        public DateTime SentDate { get; set; }

    }
}
