import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { DialogService } from '../../services/dialog.service';
import { TitleService } from '../../services/title.service';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  users: User[];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _titleService: TitleService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {

    this._authService.allowedUsers().then(u => this.users = u.val());
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg'));
  }

  ngOnInit(): void {
    this._titleService.set('Anmelden');
    this._authService.allowedUsers().then(u => {
      this.users = u.val();
    });
  }

  login() {
    this._authService.doGoogleLogin().then(res => {
      if (res.user && this.users.filter(u => u.email === res.user.email).length > 0) {
        this._router.navigate(['/']);
      } else {
        this._messageService.showMessage('Anmeldung fehlgeschlagen.', 'Wiederholen?').onAction().subscribe(() => this.login());
      }
    }, err => {
      this._messageService.showMessage('Anmeldung fehlgeschlagen.').onAction().subscribe(() => this.login());
    });
  }
}
