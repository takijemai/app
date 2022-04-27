import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formValidation: FormGroup;
  formValidationMessages = {
   email: [
      { type: 'required', message: 'El email es un campo obligatorio.' },
      { type: 'pattern', message: 'El formato del email no es correcto.'}
    ],
    password: [
      { type: 'required', message: 'La contraseña es un campo obligatorio.' },
      { type: 'minlength', message: 'La lóngitud mínima de una contraseña es 6 caracteres.'}
    ]
  };
  constructor(private router: Router, private authService: AuthService, public alertCtrl: AlertController,
  private formBuilder: FormBuilder) { }

  ngOnInit() {
this.formValidation = this.formBuilder.group({
  email: new FormControl('', Validators.compose([
  Validators.required,
  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ])),
  password: new FormControl('', Validators.compose([
  Validators.minLength(6),
  Validators.required
  ])),
  });
  }


  OnSubmitRegister(value){
    this.authService.signup(value).then(
      auth => {
        this.router.navigate(['../movie']);
        console.log(auth);
      },

      auth => {
        this.showAlert();
      }
    );
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Warning !',
      subHeader: 'un error!',
      message: 'Complete el formulario =(',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}









