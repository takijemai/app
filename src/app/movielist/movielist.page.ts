import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PeliculaserviceService } from '../services/peliculaservice.service';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.page.html',
  styleUrls: ['./movielist.page.scss'],
})
export class MovielistPage implements OnInit {
pelicula: string;
  data: string;
  result: Observable<any>;
  constructor(private router: Router,private peliculaservice: PeliculaserviceService,) { }

  ngOnInit() {
  }

logout(){
    this.router.navigate(['/home']);

  }

search(): void{

      this.result = this.peliculaservice.searchMovie(this.pelicula);
}


}
