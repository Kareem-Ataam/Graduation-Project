using APIs.DTOs;
using APIs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIs.Controllers
{
    [Authorize (Roles ="Buyer,Seller")]
    [Route("api/[controller]")]
    [ApiController]
    public class BeautyProductImageController : ControllerBase
    {
        /// <summary>
        /// Private Fields Used in DependecyInjection
        /// </summary>
        #region PrivateFields
        private readonly GraduationDataBaseContext _context;
        private new List<string> _imagesExtensions = new List<string> { ".jpg", ".png" };
        private long _maxSize = 1048576;
        #endregion

        /// <summary>
        /// DependecyInjection
        /// </summary>
        /// <param name="context"></param>
        #region DependecyInjection
        public BeautyProductImageController(GraduationDataBaseContext context)
        {
            _context = context;
        }
        #endregion


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostBeautyProductImage([FromForm] ImageDTO imageDTO)
        {
            if (!_imagesExtensions.Contains(Path.GetExtension(imageDTO.ProductImage.FileName.ToLower())))
                return BadRequest("The Extension is not allowed");

            if (imageDTO.ProductImage.Length > _maxSize)
                return BadRequest("The size is bigger than 1 MB");

            var IsValidProduct = await _context.BeautyProducts.AnyAsync(x => x.ProductId == imageDTO.ProductId);
            if (!IsValidProduct)
                return BadRequest("The product is not found");

            using var dataStream = new MemoryStream();
            await imageDTO.ProductImage.CopyToAsync(dataStream);

            var BeautyProductImage = new BeautyProductsImage
            {
                ProductId = imageDTO.ProductId,
                ProductImage = dataStream.ToArray(),

            };

            await _context.AddAsync(BeautyProductImage);
            await _context.SaveChangesAsync();

            return Ok(BeautyProductImage);
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var BeautyProductsImage = await _context.BeautyProductsImages.
                Include(x => x.Product)
                .Select(x => new ImageDetailsDTO
                {
                    AvgRating = 0,
                    Brand = x.Product.Brand,
                    ProductName = x.Product.ProductName,
                    ProductDescription = x.Product.ProductDescription,
                    Comment = x.Product.Comment,
                    Category = x.Product.Category,
                    Email = x.Product.Email,
                    Price = x.Product.Price,
                    ProductId = x.Product.ProductId,
                    Image = x.ProductImage,
                    ProductImageId = x.ProductImageId,
                })
                .ToListAsync();
            return Ok(BeautyProductsImage);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var ProductImage = await _context.BeautyProductsImages.FindAsync(id);
            if (ProductImage == null)
                return NotFound();
            return Ok(ProductImage);
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var Image = await _context.BeautyProductsImages.FindAsync(id);
            if (Image == null)
                return NotFound();

            _context.Remove(Image);
            _context.SaveChanges();
            return Ok();
        }
    }
}
