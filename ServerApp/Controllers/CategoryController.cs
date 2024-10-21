using Microsoft.AspNetCore.Mvc;
using ServerApp.Data;
using ServerApp.Models;
using ServerApp.ViewModels;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private ApplicationDbContext _context;
        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet()]
        public IActionResult GetCategories()
        {
            var Categories = _context.Categories.ToList();
            return Ok(Categories);

        }
        [HttpPost()]
        public IActionResult AddCategory(Category Category)
        {
            _context.Categories.Add(Category);
            int result = _context.SaveChanges();
            if (result == 0)
            {
                return Ok(new Response<int> { Status = "Success", Message = "error creating Category!", Data = result });
            }
            return Ok(new Response<int> { Status = "Success", Message = "Category created successfully!" });

        }
        [HttpPatch()]
        public IActionResult UpdateCategory(Category Category)
        {
            var data = _context.Categories.FirstOrDefault(x => x.Id == Category.Id);
            data.Name = Category.Name;
            data.Description = Category.Description;

            int result = _context.SaveChanges();
            if (result == 0)
            {
                return Ok(new Response<int> { Status = "Success", Message = "error updating Category!", Data = result });
            }
            return Ok(new Response<int> { Status = "Success", Message = "Category updated successfully!" });

        }
        [HttpDelete()]
        public IActionResult DeleteCategory(int id)
        {
            var data = _context.Categories.FirstOrDefault(x => x.Id == id);
            _context.Remove(data);
            int result = _context.SaveChanges();
            if (result == 0)
            {
                return Ok(new Response<int> { Status = "Success", Message = "error deleting Category!", Data = result });
            }
            return Ok(new Response<int> { Status = "Success", Message = "Category deleted successfully!" });

        }
    }
}
