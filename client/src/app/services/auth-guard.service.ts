import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _route: Router) { }
  canActivate() {
    if(localStorage.getItem('token')) {
       return true;
    } else {
       this._route.navigate(['/login']);
       return false;
   }
}
  logout(){
    window.localStorage.removeItem("token");
    this._route.navigate(['/login']);
  }
}