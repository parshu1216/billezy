import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy(){
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
  }
}
