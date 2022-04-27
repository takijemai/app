import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {
private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore,public afAuth: AngularFireAuth) { }

getMovies(){
return new Promise<any>((resolve, reject) => {
  this.afAuth.user.subscribe(currentUser => {
    if (currentUser) {
        this.snapshotChangesSubscription =
          this.afs.collection('users').doc(currentUser.uid).collection('movies').snapshotChanges();
        resolve(this.snapshotChangesSubscription);
      }
    });
  });
  }

getMovie(movieId){
  return new Promise<any>((resolve, reject) => {
    this.afAuth.user.subscribe(currentUser => {
      if (currentUser) {
        this.snapshotChangesSubscription = this.afs.doc<any>('users/' +
          currentUser.uid + '/movies/' + movieId).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err);
          });
      }
    });
  });
  }

  createMovie(value){
    return new Promise<any>((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.afs.collection('users').doc(user.uid).collection('movies').add({
        title: value.title,
        year: value.year,
        image: value.image,
        actors: value.actors,
        genre: value.genre
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }
  updateMovie(movieKey, value){
    return new Promise<any>((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.afs.collection('users').doc(user.uid).collection('movies').doc(movieKey).
        set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

deleteMovie(movieKey){
  return new Promise<any>((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('user'));
    this.afs.collection('users').doc(user.uid).collection('movies').doc(movieKey).
      delete()
      .then(
        res => resolve(res),
        err => reject(err)
      );
  });
  }

unsubscribeOnLogOut(){
  this.snapshotChangesSubscription.unsubscribe();
  }






















}
