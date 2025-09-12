import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { uploadProduct } from '../../Interface/auth';
import { adminapi } from '../../Api/api';
import { admin } from '../../Utils/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // removeFavorite(carId: string, userId: any) {
  //   throw new Error('Method not implemented.');
  // }
  // removeFavorite(_id: string, String: StringConstructor) {
  //   throw new Error('Method not implemented.');
  // }
  // addFavorite(_id: string, userId: any) {
  //   throw new Error('Method not implemented.');
  // }
  //  id ='popular';
// const categoryR ='recommendation';
  constructor(private http: HttpClient) {}

  CreateProducts(uploadProduct: uploadProduct): Observable<any> {
    return this.http.post(adminapi.createproduct, uploadProduct);
  }

  GetProducts(): Observable<any> {
    return this.http.get(adminapi.getproducts);
  }
  GetProductsbyCategory():Observable<any>{
    return this.http.get(adminapi.getbycategory);
  }
  GetProductsbyCategorys():Observable<any>{
    return this.http.get(adminapi.getbycategorys);
  }
  GetProductsbyId(_id:String):Observable<any>{
    return this.http.get(`${adminapi.getbyid}${_id}`);
  }
  GetProductsbyIds(id:String[]):Observable<any>{
    return this.http.post(adminapi.getbyids, {id});
  }
  GetProductsbyName(name:String):Observable<any>{
    return this.http.get(`${adminapi.getbyname}${name}`);
  }
  
}
