import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: AngularFireAuth
  ) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  getEmail() {
    return this.isLoggedIn() ? firebase.auth().currentUser.email : null;
  }

  isLoggedIn() {
    return firebase.auth().currentUser != null;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this._auth.auth.signOut()
        resolve();
      }
      else {
        reject();
      }
    });
  }

  doResetPassword(email: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }
}
