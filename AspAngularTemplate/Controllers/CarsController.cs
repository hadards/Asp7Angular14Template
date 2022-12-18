using AspAngularTemplate.Models;
using AspAngularTemplate.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspAngularTemplate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        CarsService carsService = null;
        public CarsController(CarsService service)
        {
            carsService = service;
        }

        // GET: api/<CarsController>
        [HttpGet]
        public IEnumerable<CarModel> Get()
        {
            return carsService.GetAllCars();
        }

        // GET api/<CarsController>/5
        [HttpGet("{id}")]
        public ActionResult<CarModel> Get(string id)
        {
            return carsService.GetCar(id);
        }

        // POST api/<CarsController>
        [HttpPost]
        public void Post([FromBody] CarModel car)
        {
            carsService.AddCar(car);
        }

        // DELETE api/<CarsController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            carsService.DeleteCar(id);
        }
    }
}
