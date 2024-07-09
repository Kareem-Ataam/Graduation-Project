using APIs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfflineSuggesionController : ControllerBase
    {
        private readonly GraduationDataBaseContext _context;

        public OfflineSuggesionController(GraduationDataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShops()
        {
            var sellers = await _context.Sellers.ToListAsync();
            return Ok(sellers);
        }

        [HttpGet("GetSellerLocations")]
        public async Task<IActionResult> GetSellerLocations(string productNameOrDescription)
        {
            var beautyEmails = _context.BeautyProducts
                .Where(p => p.ProductName.Contains(productNameOrDescription) || p.ProductDescription.Contains(productNameOrDescription))
                .Select(p => p.Email);

            var bookEmails = _context.BooksProducts
                .Where(p => p.ProductName.Contains(productNameOrDescription) || p.ProductDescription.Contains(productNameOrDescription))
                .Select(p => p.Email);

            var electronicsEmails = _context.ElectronicsProducts
                .Where(p => p.ProductName.Contains(productNameOrDescription) || p.ProductDescription.Contains(productNameOrDescription))
                .Select(p => p.Email);

            var fashionEmails = _context.FashionProducts
                .Where(p => p.ProductName.Contains(productNameOrDescription) || p.ProductDescription.Contains(productNameOrDescription))
                .Select(p => p.Email);

            var gamingEmails = _context.GamingProducts
                .Where(p => p.ProductName.Contains(productNameOrDescription) || p.ProductDescription.Contains(productNameOrDescription))
                .Select(p => p.Email);

            var sportsEmails = _context.SportsProducts
                .Where(p => p.ProductName.Contains(productNameOrDescription) || p.ProductDescription.Contains(productNameOrDescription))
                .Select(p => p.Email);

            var allEmails = await beautyEmails
                .Union(bookEmails)
                .Union(electronicsEmails)
                .Union(fashionEmails)
                .Union(gamingEmails)
                .Union(sportsEmails)
                .Distinct()
                .ToListAsync();

            var sellers = await _context.Sellers
                .Where(s => allEmails.Contains(s.Email))
                .Select(s => new
                {
                    s.FName,
                    s.LName,
                    s.Email,
                    s.Long,
                    s.Lat
                })
                .ToListAsync();

            if (!sellers.Any())
            {
                return Ok("No Products Found");
            }

            var locations = sellers.Select(s => new
            {
                s.FName,
                s.LName,
                s.Email,
                Longitude = s.Long,
                Latitude = s.Lat
            });

            return Ok(locations);
        }


    }
}
