import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { TitleService } from '../../services/title.service';
import { User } from '../../models/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPasswordForm = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _titleService: TitleService,
    private _fb: FormBuilder
  ) {
    this._titleService.set('Passwort zurücksetzen');
  }

  reset() {
    var email = this.resetPasswordForm.value.email;
    this._authService.resetPassword(email);
  }

  signIn() {
    this._router.navigateByUrl('/sign-in');
  }
}
