import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  data: any;
  latitude: number;
  longitude: number;
  accuracy: number;


  constructor() { }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
  this.longitude = position.coords.longitude;
    this.accuracy = position.coords.accuracy;
    this.data = {
      latitude: this.latitude,
      longitude: this.longitude,
      accuracy: this.accuracy

    };
    return this.data;

  }









}
