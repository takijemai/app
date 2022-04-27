import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PeliculaserviceService } from '../services/peliculaservice.service';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.page.html',
  styleUrls: ['./addmovie.page.scss'],
})
export class AddmoviePage implements OnInit {
  photo: SafeResourceUrl;
  pelicula: string;
  data: string;
  result: Observable<any>;
  constructor(private sanitizer: DomSanitizer, private peliculaservice: PeliculaserviceService, private route: ActivatedRoute
   ,private authservice: AuthService,private router: Router,) { }

  ngOnInit() {
  }

 search(): void{

      this.result = this.peliculaservice.searchMovie(this.pelicula);
}

addmovie() {

}



  async takePicture() {
  const image = await Camera.getPhoto({
  quality: 100,
  allowEditing: false,
  resultType: CameraResultType.Uri
  });
  this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image &&
(image.webPath));
  }

}
