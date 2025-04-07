import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { uploadProduct } from '../../Interface/auth';
import { adminapi } from '../../Api/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  CreateProducts(uploadProduct: uploadProduct): Observable<any> {
    return this.http.post(adminapi.createproduct, uploadProduct);
  }

  GetProducts(): Observable<any> {
    return this.http.get(adminapi.getproducts);
  }
}
