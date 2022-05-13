import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { PeliculaserviceService } from '../services/peliculaservice.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  items: Array<any>;

  constructor(private authservice: AuthService, private router: Router,
    private peliculaservice: PeliculaserviceService, private route: ActivatedRoute,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController,private dbservice: DbService,) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }


  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor, espere...'
    });
    this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      });
    });
  }
async presentLoading(loading) {
  return await loading.present();
  }



async delete(id: any){

const alert = await this.alertCtrl.create({
header:'Confirming delete',
mode:'ios',
message:'are you sure to delete',
buttons: [
  {
    text: 'no',
    role:'cancel'
  },
  {
    text: 'yes',
    handler : ()=>{
      console.log('delete pelicula');
      this.dbservice.deleteMovie(id).then(res=>{
        console.log('pelicula eleminada');

      });
      //this.items.splice(id,1);
  }


  }
]
});

await alert.present();
}

  logout() {
    this.router.navigate(['/home']);

  }













}
