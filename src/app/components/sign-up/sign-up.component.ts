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
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    emailConfirmation: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _titleService: TitleService,
    private _messageService: MessageService,
    private _fb: FormBuilder
  ) {
    this._titleService.set('Registrieren');
  }

  register() {
    var user = this.signUpForm.value;
    if (user.email != user.emailConfirmation) {
      this._messageService.showMessage('E-Mails müssen übereinstimmen.');
    } else {
      this._authService.signUp(user.email, user.password);
    }
  }

  signIn() {
    this._router.navigateByUrl('/sign-in');
  }
}
