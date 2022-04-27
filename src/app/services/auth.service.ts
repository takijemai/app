import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from './db.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(public afAuth: AngularFireAuth, private router: Router, private dbService: DbService,
    public afs: AngularFirestore,
  ) {
  this.afAuth.authState.subscribe((user) => {
  if (user) {
  this.userData = user;
  localStorage.setItem('user', JSON.stringify(this.userData));
  JSON.parse(localStorage.getItem('user'));
  } else {
  localStorage.setItem('user', null);
  JSON.parse(localStorage.getItem('user'));
  }
  });

  }

doLogin(value){
  return new Promise<any>((resolve, reject) => {
    this.afAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err));
  });
  }
doLogout(){
  return new Promise<void>((resolve, reject) => {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['../login']);
        resolve();
      }).catch((error) => {
        console.log(error);
        reject();
      });
  });
  }

  signup(value) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(res => {
        resolve(res);
        console.log(res);

      }).catch(err => reject(err));
    });
}





}
