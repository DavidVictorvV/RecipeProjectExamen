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
    public class IngredientDatasController : ControllerBase
    {
        private readonly RecipeProjectExamenContext _context;

        public IngredientDatasController(RecipeProjectExamenContext context)
        {
            _context = context;
        }

        // GET: api/IngredientDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IngredientData>>> GetIngredientData()
        {
            return await _context.IngredientData.ToListAsync();
        }

        // GET: api/IngredientDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IngredientData>> GetIngredientData(Guid id)
        {
            var ingredientData = await _context.IngredientData.FindAsync(id);

            if (ingredientData == null)
            {
                return NotFound();
            }

            return ingredientData;
        }

        // PUT: api/IngredientDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngredientData(Guid id, IngredientData ingredientData)
        {
            if (id != ingredientData.ID)
            {
                return BadRequest();
            }

            _context.Entry(ingredientData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientDataExists(id))
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

        // POST: api/IngredientDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task PostIngredientData([FromBody] IngredientData ingredientData)
        {
            if (ingredientData.ID == Guid.Empty)
            {
                ingredientData.ID = Guid.NewGuid();
            }

            _context.IngredientData.Add(ingredientData);
            await _context.SaveChangesAsync();
        }

        // DELETE: api/IngredientDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngredientData(Guid id)
        {
            var ingredientData = await _context.IngredientData.FindAsync(id);
            if (ingredientData == null)
            {
                return NotFound();
            }

            _context.IngredientData.Remove(ingredientData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IngredientDataExists(Guid id)
        {
            return _context.IngredientData.Any(e => e.ID == id);
        }
    }
}
