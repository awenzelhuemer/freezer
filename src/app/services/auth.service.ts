import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFireDatabase
  ) {
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getEmail() {
    return this.isLoggedIn() ? firebase.auth().currentUser.email : null;
  }

  allowedUsers() {
    return this._db.list<User[]>('users').query.once('value');
  }

  isLoggedIn() {
    return firebase.auth().currentUser != null;
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      this._auth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this._auth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
