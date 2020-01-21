import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from './geocode.service';
import { Location } from './location-model';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ] 
})
export class AppComponent implements OnInit {
  address = 'London';
  location: Location;
  loading: boolean;

  constructor(
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
  ) {}
  
  ngOnInit() {
    this.showLocation();
  }

  showLocation() {
    this.addressToCoordinates();
  }

  addressToCoordinates() {
    this.loading = true;
    this.geocodeService.geocodeAddress(this.address)
    .subscribe((location: Location) => {
        this.location = location;
        this.loading = false;
        this.ref.detectChanges();  
      }      
    );     
  }
}
