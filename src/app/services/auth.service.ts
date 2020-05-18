import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User;

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFireDatabase,
    private _router: Router,
    private _messageService: MessageService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this._auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this._router.navigateByUrl('/');
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this._auth.signInWithEmailAndPassword(email, password);

      if (result.user.emailVerified !== true) {
        this.sendVerificationEmail();
        this._messageService.showMessage('Bitte bestätigen Sie ihre E-Mail. Bitte überprüfen Sie ihre Mailbox.');
      }
      this._setUserData(result.user);

    } catch (error) {
      this._messageService.showMessage(error);
    }  
  }

  async sendVerificationEmail() {
    const user = await this._auth.currentUser;

    return user.sendEmailVerification()
    .then(() => {
      this._router.navigateByUrl('/');
    })
  }

  // Sign up with email/password
  async signUp(email: string, password: string) {
    try {
      const result = await this._auth.createUserWithEmailAndPassword(email, password).then(result => {
        this.sendVerificationEmail();
        this._setUserData(result.user);
      });

      return result;
    }
    catch (error) {
      this._messageService.showMessage(error.message);
    }
  }

  // Reset Forggot password
  async resetPassword(passwordResetEmail: string) {
    try {
      await this._auth.sendPasswordResetEmail(passwordResetEmail);
      this._messageService.showMessage('E-Mail zum Rücksetzen des Passworts wurde versendet. Bitte überprüfen Sie ihre Mailbox.');
    }
    catch (error) {
      this._messageService.showMessage(error.message);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  private _setUserData(user: User) {
    const userRef = this._db.object<User>(`users/${user.uid}`);
    return userRef.set({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    });
  }

  // Sign out 
  async signOut() {
    try {
      const result = this._auth.signOut();
      localStorage.removeItem('user');
      this._router.navigate(['sign-in']);

      return result;
    } catch (error) {
      this._messageService.showMessage(error);
    }
  }
}
