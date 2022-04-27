import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formValidation: FormGroup;
  errorMessage = '';
  formValidationMessages = {
  email: [
  { type: 'required', message: 'El email es un campo obligatorio.'},
  { type: 'pattern', message: 'El formato del email no es correcto.'}
  ],
  password: [
  { type: 'required', message: 'La contraseña es un campo obligatorio.' },
  { type: 'minlength', message: 'La lóngitud mínima de una contraseña es 6 caracteres.' }
  ]
 };

  constructor( private authService: AuthService, private formBuilder: FormBuilder,private router: Router) { }


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



tryLogin(value){
  this.authService.doLogin(value).then(res => {
    this.router.navigate(['../movie']);
  }, err => {
    this.errorMessage = err.message;
    console.log(err);
  });
  }













}
