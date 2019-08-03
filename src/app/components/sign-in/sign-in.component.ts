import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { DialogService } from '../../services/dialog.service';
import { TitleService } from '../../services/title.service';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

users: User[];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _messageService: MessageService
  ) {
    this._authService.allowedUsers().then(u => this.users = u.val());
  }

  login() {
    this._authService.doGoogleLogin().then(res => {
      if (res.user && this.users.filter(u => u.email === res.user.email).length > 0) {
        this._router.navigate(['/']);
        this._messageService.showMessage('Anmeldung erfolgreich.');
      } else {
        this._messageService.showMessage('Anmeldung fehlgeschlagen.');
      }
    }, err => {
      this._messageService.showMessage('Anmeldung fehlgeschlagen.');
    });
  }
}
