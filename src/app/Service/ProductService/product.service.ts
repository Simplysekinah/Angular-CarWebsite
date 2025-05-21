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
}
