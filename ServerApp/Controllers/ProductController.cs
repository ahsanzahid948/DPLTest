using Microsoft.AspNetCore.Mvc;
using ServerApp.Data;
using ServerApp.Models;
using ServerApp.ViewModels;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet()]
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);

        }
        [HttpPost()]
        public IActionResult AddProduct(Product product)
        {
            _context.Products.Add(product);
            int result = _context.SaveChanges();
            if (result == 0)
            {
                return Ok(new Response<int> { Status = "Success", Message = "error creating product!", Data = result });
            }
            return Ok(new Response<int> { Status = "Success", Message = "product created successfully!" });

        }
        [HttpPatch()]
        public IActionResult UpdateProduct(Product product)
        {
            var data = _context.Products.FirstOrDefault(x => x.Id == product.Id);
            data.Name = product.Name;
            data.Description = product.Description;
            data.Stock = product.Stock;
            data.Cost = product.Cost;

            int result = _context.SaveChanges();
            if (result == 0)
            {
                return Ok(new Response<int> { Status = "Success", Message = "error updating product!", Data = result });
            }
            return Ok(new Response<int> { Status = "Success", Message = "product updated successfully!" });

        }
        [HttpDelete()]
        public IActionResult DeleteProduct(int id)
        {
            var data = _context.Products.FirstOrDefault(x => x.Id == id);
            _context.Remove(data);
            int result = _context.SaveChanges();
            if (result == 0)
            {
                return Ok(new Response<int> { Status = "Success", Message = "error deleting product!", Data = result });
            }
            return Ok(new Response<int> { Status = "Success", Message = "product deleted successfully!" });

        }
    }
}
