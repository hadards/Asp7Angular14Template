import { ICarModel } from './cars.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  baseUrl!: string;
  hubConnection!: signalR.HubConnection;
  carStatusSubject = new Subject<{carId: string, carStatus: string}>();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  addCar(car: ICarModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/cars', car);
  }

  getCar(id: string): Observable<ICarModel> {
    return this.http.get<ICarModel>(this.baseUrl + `api/cars/${id}`);
  }

  getAllCars(): Observable<ICarModel[]> {
    return this.http.get<ICarModel[]>(this.baseUrl + 'api/cars');
  }
  public startSignlaRConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7166/carshub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addCarStatusListener(carId: string): void {
    this.hubConnection.send("StartSendingCarStatus", carId);
    this.hubConnection.on('onCarStatus', (data) => {
      this.carStatusSubject.next(data);
    });
  }

  public getCarStatus(): Observable<any> {
    return this.carStatusSubject.asObservable();
  }
}
