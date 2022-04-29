import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PeliculaserviceService } from '../services/peliculaservice.service';
import { DbService } from '../services/db.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.page.html',
  styleUrls: ['./addmovie.page.scss'],
})
export class AddmoviePage implements OnInit {
  photo: SafeResourceUrl;
  pelicula: string;

  result: Observable<any>;

  constructor(private sanitizer: DomSanitizer, private peliculaservice: PeliculaserviceService, private route: ActivatedRoute
    , private authservice: AuthService, private router: Router, private dbservice: DbService,
  private alertCtrl: AlertController) { }

  ngOnInit() {
  }

 search(): void{

      this.result = this.peliculaservice.searchMovie(this.pelicula);
}



async addmovie(item){

const alert = await this.alertCtrl.create({
header:'Confirming add',
mode:'ios',
message:'are you sure to add pelicula',
buttons: [
  {
    text: 'no',
    role:'cancel'
  },
  {
    text: 'yes',
    handler : ()=>{
      console.log('add pelicula');
      let data: {

      };
      this.dbservice.createMovie(item).then(res=>{
        console.log('pelicula anadida');
         // this.router.navigate(['/movie']);
      });

  }


  }
]
});

await alert.present();
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
