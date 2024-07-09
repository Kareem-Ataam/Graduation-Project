using APIs.DTOs;
using APIs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace APIs.Controllers
{
    [Authorize(Roles ="Buyer,Seller")]
    [Route("api/[controller]")]
    [ApiController]
    public class BeautyWishListController : ControllerBase
    {
        private readonly GraduationDataBaseContext _context;

        public BeautyWishListController(GraduationDataBaseContext context)
        {
            _context = context;
        }


        
        [HttpGet("MyWishListProducts")]
        public async Task<ActionResult<BeautyWishlist>> GetMyWishListProductsByBuyer(string email)
        {
            var beautyWishlist = await _context.BeautyWishlists.FirstOrDefaultAsync(bw => bw.Email == email);

            if (beautyWishlist == null)
            {
                return NotFound();
            }

            return beautyWishlist;
        }

        // POST: api/beautywishlist
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BeautyWishlist>> PostBeautyWishlist(WishListDTO beautyWishlistDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the item already exists in the wishlist
            var existingWishlistItem = await _context.BeautyWishlists.FirstOrDefaultAsync(bw =>
                bw.Email == beautyWishlistDTO.Email && bw.ProductId == beautyWishlistDTO.ProductId);

            if (existingWishlistItem != null)
            {
                return Conflict("Item already exists in the wishlist");
            }

            // Create a new BeautyWishlist entity
            var beautyWishlist = new BeautyWishlist
            {
                Email = beautyWishlistDTO.Email,
                ProductId = beautyWishlistDTO.ProductId,
                Comment = beautyWishlistDTO.Comment
            };

            // Add the entity to the context
            _context.BeautyWishlists.Add(beautyWishlist);

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Handle unique constraint violation or other database update errors
                return BadRequest("Unable to save wishlist item.");
            }

            // Return a CreatedAtAction response with the created entity
            return CreatedAtAction(nameof(GetBeautyWishlist), new { email = beautyWishlistDTO.Email, productId = beautyWishlistDTO.ProductId }, beautyWishlist);
        }

        // GET: api/beautywishlist/example@g.com/1
        [HttpGet("{email}/{productId}")]
        public async Task<ActionResult<BeautyWishlist>> GetBeautyWishlist(string email, int productId)
        {
            var beautyWishlist = await _context.BeautyWishlists.FirstOrDefaultAsync(bw => bw.Email == email && bw.ProductId == productId);

            if (beautyWishlist == null)
            {
                return NotFound();
            }

            return beautyWishlist;
        }

        
        // GET: api/beautywishlist/example@g.com/1
        [HttpGet("{productId}")]
        public async Task<ActionResult<BeautyWishlist>> GetBeautyWishlistByProductID(int productId)
        {
            var beautyWishlist = await _context.BeautyWishlists
                .Include(bw => bw.Product)
                .FirstOrDefaultAsync(bw => bw.ProductId == productId);

            if (beautyWishlist == null)
            {
                return NotFound();
            }

            return beautyWishlist;
        }

        
        // PUT: api/beautywishlist/example@g.com/1
        [HttpPut("{email}/{productId}")]
        public async Task<IActionResult> UpdateBeautyWishlist(string email, int productId, WishListDTO beautyWishlistDTO)
        {
            if (email != beautyWishlistDTO.Email || productId != beautyWishlistDTO.ProductId)
            {
                return BadRequest();
            }

            var beautyWishlist = await _context.BeautyWishlists.FirstOrDefaultAsync(bw => bw.Email == email && bw.ProductId == productId);

            if (beautyWishlist == null)
            {
                return NotFound();
            }

            // Update beauty wishlist details
            beautyWishlist.Comment = beautyWishlistDTO.Comment;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Handle unique constraint violation or other database update errors
                return BadRequest();
            }

            return Ok();
        }
        // DELETE: api/beautywishlist/example@g.com/1
        [HttpDelete("{email}/{productId}")]
        public async Task<IActionResult> DeleteBeautyWishlist(string email, int productId)
        {
            var beautyWishlist = await _context.BeautyWishlists.FirstOrDefaultAsync(bw => bw.Email == email && bw.ProductId == productId);

            if (beautyWishlist == null)
            {
                return NotFound();
            }

            _context.BeautyWishlists.Remove(beautyWishlist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/beautywishlist/example@g.com/1
        [HttpDelete("{productId}")]
        
        public async Task<IActionResult> DeleteBeautyWishlistByProductID(int productId)
        {
            var beautyWishlist = await _context.BeautyWishlists.FirstOrDefaultAsync(bw => bw.ProductId == productId);

            if (beautyWishlist == null)
            {
                return NotFound();
            }

            _context.BeautyWishlists.Remove(beautyWishlist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BeautyWishlistExists(string email, int productId)
        {
            return _context.BeautyWishlists.Any(bw => bw.Email == email && bw.ProductId == productId);
        }
    }
}

