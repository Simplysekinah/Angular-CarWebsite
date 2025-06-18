import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentCar } from '../../Interface/auth';
import { adminapi, api } from '../../Api/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarRentalService {

  constructor(private http:HttpClient) { }

  RentCar(rentCar:rentCar):Observable<any>{
    return this.http.post(api.rentaldetails,rentCar);
  }
}
