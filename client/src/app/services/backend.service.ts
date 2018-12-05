import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private _http: HttpClient) { }
  setUser(formData){
   /* let fakeResponse_3 = {
      "errorCode" : "1",
      "errorMessage" : "User Created.",
      "rowCount" : "30",
      "data": {
        "token" : "abcd"
      }
    };
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakeResponse_3)
        }
        ,5000)
      }); */

   let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
   let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this._http.post('http://localhost:3000/register', formData, httpOptions);
  }

  /*loggedIn() {
    return !!localStorage.getItem('token')    
  }*/
}
