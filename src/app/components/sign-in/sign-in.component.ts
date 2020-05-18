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
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm = this._fb.group({
    email: ['',[ Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _titleService: TitleService,
    private _fb: FormBuilder
  ) {
    this._titleService.set('Anmelden');
  }

  login() {
    var user = this.signInForm.value;
    this._authService.signIn(user.email, user.password);
  }

  register() {
    this._router.navigateByUrl('/sign-up');
  }

  resetPassword(){
    this._router.navigateByUrl('/reset-password');
  }
}
