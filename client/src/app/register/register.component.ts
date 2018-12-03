import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  savedChanges: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  
  ngOnDestroy(){
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
  }
  
}
