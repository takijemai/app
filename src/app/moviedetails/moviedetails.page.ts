import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaserviceService } from '../services/peliculaservice.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.page.html',
  styleUrls: ['./moviedetails.page.scss'],
})
export class MoviedetailsPage implements OnInit {
  title: string;
  image: string;
  genre: string;
  actors: string;
  idp: string;
  pelicula: string;
  data: any;

  constructor(private route: ActivatedRoute,public peliculaservice: PeliculaserviceService) { }

  ngOnInit() {
    this.idp = this.route.snapshot.paramMap.get('id');
    this.peliculaservice.getdetails(this.idp).subscribe(res => {
      this.data = res;
      this.title = res.Title;
      this.image = res.Poster;
      this.genre = res.Genre;
      this.actors = res.Actors;
    });


  }






}
