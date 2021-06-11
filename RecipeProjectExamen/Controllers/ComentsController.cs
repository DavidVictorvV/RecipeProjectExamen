using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeProject.Models;
using RecipeProjectExamen.Data;

namespace RecipeProjectExamen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentsController : ControllerBase
    {
        private readonly RecipeProjectExamenContext _context;

        public ComentsController(RecipeProjectExamenContext context)
        {
            _context = context;
        }

        // GET: api/Coments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coments>>> GetComents()
        {
            return await _context.Coments.ToListAsync();
        }

        // GET: api/Coments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Coments>> GetComents(Guid id)
        {
            var coments = await _context.Coments.FindAsync(id);

            if (coments == null)
            {
                return NotFound();
            }

            return coments;
        }

        // PUT: api/Coments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComents(Guid id, Coments coments)
        {
            if (id != coments.ID)
            {
                return BadRequest();
            }

            _context.Entry(coments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComentsExists(id))
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

        // POST: api/Coments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]

        public async Task PostComents([FromBody] Coments coments)
        {
            if (coments.ID == Guid.Empty)
            {
                coments.ID = Guid.NewGuid();
            }

            _context.Coments.Add(coments);
            await _context.SaveChangesAsync();
        }

        // DELETE: api/Coments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComents(Guid id)
        {
            var coments = await _context.Coments.FindAsync(id);
            if (coments == null)
            {
                return NotFound();
            }

            _context.Coments.Remove(coments);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComentsExists(Guid id)
        {
            return _context.Coments.Any(e => e.ID == id);
        }
    }
}
