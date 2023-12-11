import { Component, ElementRef, AfterViewInit, ViewChild, inject, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { LocationService } from 'src/app/core/services/location/location.service';

@Component({
  selector: 'app-view-real-time',
  templateUrl: './view-real-time.component.html',
  styleUrls: ['./view-real-time.component.scss'],
})
export class ViewRealTimeComponent implements AfterViewInit {

  @ViewChild('map', { read: ElementRef })
  mapRef!: ElementRef<HTMLElement>;
  map: GoogleMap | undefined;
  private location: LocationService = inject(LocationService);

  ngAfterViewInit() {
    setTimeout(() => {
      this.createMap();
    }, 5000)
  }

  async createMap() {
    const { lat, lng } = await this.location.getLocation();


    this.map = await GoogleMap.create({
      id: 'local-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyD8de9y6yfTP9sD5NDlSsZpwHUbEj8jiTQ',
      forceCreate: true,
      config: {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: 12
      }
    });

  }

}
