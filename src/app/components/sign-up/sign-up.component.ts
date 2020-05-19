import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { TitleService } from '../../services/title.service';
import { User } from '../../models/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidationHelper } from 'src/app/helper/validation-helper';
import { MyErrorStateMatcher } from 'src/app/helper/my-error-state-matcher';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  matcher = new MyErrorStateMatcher();

  signUpForm = this._fb.group({
    emails: this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      emailConfirmation: ['', [Validators.email, Validators.required]],
    }, { validators: ValidationHelper.checkEmails }),
    passwords: this._fb.group({
      password: ['', Validators.required],
      passwordConfirmation: ['', [Validators.required]],
    }, { validators: ValidationHelper.checkPasswords })
    
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
    this._authService.signUp(user.emails.email, user.passwords.password);

  }

  getErrorMessage(control: AbstractControl){
    return ValidationHelper.getErrorMessage(control);
  }

  signIn() {
    this._router.navigateByUrl('/sign-in');
  }
}
