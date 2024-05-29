using BackEnd.Data;
using BackEnd.Dtos;
using BackEnd.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly BagShopContext _bagshopContext;

        public ProductController(BagShopContext bagshopContext)
        {
            _bagshopContext = bagshopContext;
        }

        [HttpPost("CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromForm] ProductDto productDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (productDto.ImageFile1 == null || productDto.ImageFile2 == null)
                    return BadRequest("At least 2 images are required.");

                var imagePaths = new List<string>();

                foreach (var imageFile in new[] { productDto.ImageFile1, productDto.ImageFile2, productDto.ImageFile3, productDto.ImageFile4 })
                {
                    if (imageFile != null)
                    {
                        var fileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
                        var filePath = Path.Combine("wwwroot/images", fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await imageFile.CopyToAsync(stream);
                        }

                        imagePaths.Add(fileName);
                    }
                }

                // Check if enough images were provided
                if (imagePaths.Count < 2)
                {
                    // Clean up created images
                    foreach (var path in imagePaths)
                    {
                        var fullPath = Path.Combine("wwwroot/images", path);
                        if (System.IO.File.Exists(fullPath))
                        {
                            System.IO.File.Delete(fullPath);
                        }
                    }

                    return BadRequest("At least 2 images are required.");
                }

                var productToCreate = new Product
                {
                    ProductName = productDto.ProductName,
                    Description = productDto.Description,
                    Price = productDto.Price,
                    ProductCategoryId = productDto.ProductCategoryId,
                    StockQuantity = productDto.StockQuantity,
                    ImagePath1 = imagePaths[0],
                    ImagePath2 = imagePaths[1],
                    ImagePath3 = imagePaths.Count > 2 ? imagePaths[2] : null,
                    ImagePath4 = imagePaths.Count > 3 ? imagePaths[3] : null,
                    IsActive = productDto.IsActive,
                    UniqueName = $"{Guid.NewGuid()}_{productDto.ProductName}"
                };

                _bagshopContext.Products.Add(productToCreate);
                await _bagshopContext.SaveChangesAsync();

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while saving the entity changes. See the inner exception for details.");
            }
        }

    }
}
