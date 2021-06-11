using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeProjectExamen.Data;
using RecipeProjectExamen.Models;

namespace RecipeProjectExamen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentTablesController : ControllerBase
    {
        private readonly RecipeProjectExamenContext _context;

        public CommentTablesController(RecipeProjectExamenContext context)
        {
            _context = context;
        }

        // GET: api/CommentTables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentTable>>> GetCommentTable()
        {
            return await _context.CommentTable.ToListAsync();
        }

        // GET: api/CommentTables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentTable>> GetCommentTable(Guid id)
        {
            var commentTable = await _context.CommentTable.FindAsync(id);

            if (commentTable == null)
            {
                return NotFound();
            }

            return commentTable;
        }

        // PUT: api/CommentTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommentTable(Guid id, CommentTable commentTable)
        {
            if (id != commentTable.ID)
            {
                return BadRequest();
            }

            _context.Entry(commentTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentTableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CommentTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task PostCommentTable([FromBody] CommentTable commentTable)
        {
            if (commentTable.ID == Guid.Empty)
            {
                commentTable.ID = Guid.NewGuid();
            }

            _context.CommentTable.Add(commentTable);
            await _context.SaveChangesAsync();
        }

        // DELETE: api/CommentTables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommentTable(Guid id)
        {
            var commentTable = await _context.CommentTable.FindAsync(id);
            if (commentTable == null)
            {
                return NotFound();
            }

            _context.CommentTable.Remove(commentTable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentTableExists(Guid id)
        {
            return _context.CommentTable.Any(e => e.ID == id);
        }
    }
}
