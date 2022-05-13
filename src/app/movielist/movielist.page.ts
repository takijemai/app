import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
 movies: any[]=[];
  result: Observable<any>;
  constructor(private router: Router, private peliculaservice: PeliculaserviceService, private afs: AngularFirestore,) {
this.afs.collectionGroup('movies').get().subscribe((querysnapshot)=> {
  querysnapshot.docs.forEach(doc => {
  this.movies.push(doc.data());
    console.log(doc.data());
    });
    });
  }
  ngOnInit() {
  }

logout(){
    this.router.navigate(['/home']);

  }

search(): void{

      this.result = this.peliculaservice.searchMovie(this.pelicula);
}








}
