import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PeliculaserviceService } from '../services/peliculaservice.service';
import { DbService } from '../services/db.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeolocationService } from '../services/geolocation.service';
import { ImageserviceService } from '../services/imageservice.service';
import { StorageserviceService } from '../services/storageservice.service';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.page.html',
  styleUrls: ['./addmovie.page.scss'],
})
export class AddmoviePage implements OnInit {
  photo: SafeResourceUrl;
  imageUpload: Photo;
  pelicula: string;
  url: string;
formValidation: FormGroup;
  result: Observable<any>;
  geolocation: Promise<any>;
   latitude: number;
  longitude: number;
  accuracy: number;
  data: any[] = [];
  uid: string;

  constructor(private sanitizer: DomSanitizer, private peliculaservice: PeliculaserviceService, private route: ActivatedRoute
    , private authservice: AuthService, private router: Router, private dbservice: DbService,
    private alertCtrl: AlertController, private formBuilder: FormBuilder, private geolocationservice: GeolocationService,
  private imageService: ImageserviceService, private storageservice: StorageserviceService) {

   }

  ngOnInit() {
    this.resetFields();
    this.geolocation = this.geolocationservice.getLocation();
    this.geolocation.then(res=>{
      this.data = res;
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      this.accuracy = res.accuracy;

    });
  }

resetFields(){
  this.formValidation = this.formBuilder.group({
  title: new FormControl('', Validators.required),
  year: new FormControl('', Validators.required),
  image: new FormControl('', Validators.required),
  //cam: new FormControl('', [Validators.required]),
  });
  }

  onSubmit(value) {
    const data = {
      title: value.title,
      year: value.year,
      image: value.image
    };
    this.dbservice.createMovie(data)
      .then(
        res => {
          this.router.navigate(['/movie']);
        }
      );

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
    this.imageUpload = image;
  this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image &&
(image.webPath));
  }

  savefoto() {
    this.imageService.readAsBase64(this.imageUpload).then((imageBase64) => {
      if (imageBase64) {
        this.dbservice
          .savePhotoFirebase(this.uid, imageBase64)
          .then((res) => {
            if (res) {
              this.url = res;
              console.log('image', this.url);

            }
          });
      }
    });
  }

}




