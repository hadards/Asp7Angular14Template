using AspAngularTemplate.Models;

namespace AspAngularTemplate.Services
{
    public class CarsService
    {
        List<CarModel> lst = new();

        public void AddCar(CarModel car)
        {
            lst.Add(car);
        }

        public void DeleteCar(string carId)
        {
            foreach (var item in lst)
            {
                if (item.Id == carId)
                {
                    lst.Remove(item);
                    break;
                }
            }
        }

        public List<CarModel> GetAllCars()
        {
            return lst;
        }

        public CarModel GetCar(string carId)
        {
            return lst.Find(c => c.Id == carId);
        }
    }
}
