import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';
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
    public loadingCtrl: LoadingController,) { }

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

























  logout() {
    this.router.navigate(['/home']);

  }













}
