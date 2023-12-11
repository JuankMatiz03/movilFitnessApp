import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Observable, catchError, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http: HttpClient = inject(HttpClient);

  private apiKey = 'AIzaSyD8de9y6yfTP9sD5NDlSsZpwHUbEj8jiTQ';

  getAddress(): Observable<any> {
    return from(Geolocation.getCurrentPosition()).pipe(
      switchMap((ubication: Position) => {
        const lat: number = ubication.coords.latitude;
        const lng: number = ubication.coords.longitude;

        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;

        return this.http.get(apiUrl);
      }),
      catchError((error) => {
        console.error('Error al obtener la dirección desde las coordenadas:', error);
        throw error;
      })
    );
  }


  async getLocation(): Promise<{lat: number, lng: number}> {
    const ubication: Position = await Geolocation.getCurrentPosition();

    const lat: number = ubication.coords.latitude;
    const lng: number = ubication.coords.longitude;

    return { lat, lng }
  }


}
