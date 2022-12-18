import { ICarModel } from './cars.model';
import { CarsService } from './cars.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: ICarModel[] = [];

  constructor(private carsService: CarsService) {
    carsService.startSignlaRConnection();
  }

  ngOnInit(): void { }

  onAddCarClick(id: string, description: string): void {
    console.log(id, description);
    this.carsService.addCar({ id: id, description: description } as ICarModel).subscribe(res => {
      this.carsService.getAllCars().subscribe(res => {
        console.log(res);
        this.cars = res;
      });

      this.carsService.addCarStatusListener(id);
      this.carsService.getCarStatus().subscribe(innerRes => {
        let car = this.cars.filter(car => car.id === innerRes.carId);
        car[0].carStatus = innerRes.carStatus;
      });
    });
  }

}
