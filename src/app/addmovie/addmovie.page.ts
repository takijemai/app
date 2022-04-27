import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.page.html',
  styleUrls: ['./addmovie.page.scss'],
})
export class AddmoviePage implements OnInit {
photo: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
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
