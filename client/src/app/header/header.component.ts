import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthGuardService) { }

  ngOnInit() {
  }
  loggedIn() {
    return !!localStorage.getItem('token')    
  }
  
}
