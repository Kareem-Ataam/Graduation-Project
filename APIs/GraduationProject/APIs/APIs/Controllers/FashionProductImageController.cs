﻿using APIs.DTOs;
using APIs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIs.Controllers
{
    [Authorize(Roles = "Buyer,Seller")]
    [Route("api/[controller]")]
    [ApiController]
    public class FashionProductImageController : ControllerBase
    {
        #region PrivateFields
        private readonly GraduationDataBaseContext _context;
        private List<string> _imagesExtensions = new List<string> { ".jpg", ".png" };
        private long _maxSize = 1048576;
        #endregion

        #region DependecyInjection
        public FashionProductImageController(GraduationDataBaseContext context)
        {
            _context = context;
        }
        #endregion

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostFashionProductImage([FromForm] ImageDTO imageDTO)
        {
            if (!_imagesExtensions.Contains(Path.GetExtension(imageDTO.ProductImage.FileName.ToLower())))
                return BadRequest("The Extension is not allowed");

            if (imageDTO.ProductImage.Length > _maxSize)
                return BadRequest("The size is bigger than 1 MB");

            var IsValidProduct = await _context.FashionProducts.AnyAsync(x => x.ProductId == imageDTO.ProductId);
            if (!IsValidProduct)
                return BadRequest("The product is not found");

            using var dataStream = new MemoryStream();
            await imageDTO.ProductImage.CopyToAsync(dataStream);

            var FashionProductImage = new FashionProductImage
            {
                ProductId = imageDTO.ProductId,
                ProductImage = dataStream.ToArray(),
            };

            await _context.AddAsync(FashionProductImage);
            await _context.SaveChangesAsync();

            return Ok(FashionProductImage);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var FashionProductsImage = await _context.FashionProductImages
                .Include(x => x.Product)
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
                })
                .ToListAsync();
            return Ok(FashionProductsImage);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var ProductImage = await _context.FashionProductImages.FindAsync(id);
            if (ProductImage == null)
                return NotFound();
            return Ok(ProductImage);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var Image = await _context.FashionProductImages.FindAsync(id);
            if (Image == null)
                return NotFound();

            _context.Remove(Image);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
