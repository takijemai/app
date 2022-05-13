import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  constructor() { }

 public async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }


  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });


}
