import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, UserInterface } from '../../Interface/auth';
import { Observable, tap } from 'rxjs';
import { adminapi } from '../../Api/api';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http:HttpClient) { }

  Signup(UserInterface:UserInterface):Observable<any>{
    return this.http.post(adminapi.register,UserInterface)
  }
  Signin(Login:Login):Observable<any>{
    return this.http.post(adminapi.login,Login).pipe(
      tap((response:any)=>{
        if(response && response.token){
          localStorage.setItem('adminToken',response.token)
        }
      })
    )
  }

  getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('adminToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

    // Example: Fetch protected data
    getUserData(): Observable<any> {
      return this.http.get(adminapi.dashboard, { headers: this.getAuthHeaders() });
    }
}
