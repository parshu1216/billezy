import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  lat: number;
  lng: number;
  data;
  stopCondition = false;
  private querySubscription;

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  myDocData;

  constructor(private _backendService: BackendService) { }

  ngOnInit() {/*
    const secondsCounter = interval(200000);
    // Subscribe to begin publishing values
    this.querySubscription = secondsCounter.subscribe(n =>
      //console.log(`It's been ${n} seconds since subscribing!`)
      this.getLocations()); 
      this.getUserLoc();*/
  }
 /* 
  getLocations() {
    var positionOption = { enableHighAccuracy: false, maximumAge: Infinity, timeout: 60000 };
    var gpsSunccuss = function (currentPosition) {
      //use gps position
    };
    var gpsFailed = function () {
      //use some 3rd party position solution(get position by your device ip)
      //getPositionBy3rdParty();
    };

    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.data = { "lat": position.coords.latitude, "long": position.coords.longitude };
        console.log(this.data);
        //this._backendService.setLocations(this.data).subscribe((res)=> console.log("Success"));
      }), gpsFailed, positionOption);
    }
  }
  getUserLoc(){
    this.dataLoading = true;
    this.querySubscription = this._backendService.getUserLocation().subscribe((res) => {
      if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.myDocData = res["data"];
      } else {
          this.error = true;
          this.errorMessage = res["errorMessage"];
          this.dataLoading = false;
      }
  },
      (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      },
      () => {
          this.dataLoading = false;
      });
  }
  */
    ngOnDestroy(){
      if(this.querySubscription){
        // uncomment this if you want app to continuosly capture location when app is in memory
        //this.querySubscription.unsubscribe();
      }
    }
}
