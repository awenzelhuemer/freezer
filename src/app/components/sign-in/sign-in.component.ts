import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { DialogService } from '../../services/dialog.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
    , private _authService: AuthService
    , private _router: Router
    , private _messageService: MessageService
    , private _titleService: TitleService
  ) { }

  ngOnInit() {
    this._titleService.set("Anmelden");
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    this._messageService.dismiss();

    this._authService.doLogin(this.loginForm.value).then(res => {
      this._router.navigate(['/']);
    }, err => {
      this._messageService.showMessage("Es konnte kein Benutzer mit dieser E-Mail und diesem Passwort gefunden werden.");
    })
  }

  resetPassword() {
    this._authService.doResetPassword(this.loginForm.get('email').value).then(res => {
      this._messageService.showMessage("E-Mail zum Zurücksetzen wurde versendet.");
    }, err => {
      this._messageService.showMessage("E-Mail existiert nicht.");
    });
  }
}
