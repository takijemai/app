import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeliculaserviceService {
  url = 'http://www.omdbapi.com/';
   apiKey = '3c40cb83';
  constructor(private http: HttpClient) { }


searchMovie(title: string): Observable<any> {
  return this.http.get(`${this.url}?s=${encodeURI(title)}}&apikey=${this.apiKey}`).pipe(
  map(results => results['Search'])
  );
  }
  getdetails(id: string): Observable<any> {
    return this.http.get(`${this.url}?i=${encodeURI(id)}&apikey=${this.apiKey}`);
}

}
