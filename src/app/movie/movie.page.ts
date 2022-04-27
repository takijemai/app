import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { PeliculaserviceService } from '../services/peliculaservice.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  pelicula: string;
  data: string;
  result: Observable<any>;

  constructor( private authservice: AuthService,private router: Router,
    private peliculaservice: PeliculaserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(['/home']);

  }


    search(): void{

      this.result = this.peliculaservice.searchMovie(this.pelicula);
}




}
