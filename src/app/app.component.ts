import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild, Sanitizer } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { TitleService } from './services/title.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('snav', { static: false }) sidenav: MatSidenav;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef
    , media: MediaMatcher
    , updateService: UpdateService
    , private _authService: AuthService
    , private _router: Router
    , private _titleService: TitleService
    , private _messageService: MessageService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  get title() {
    return this._titleService.get();
  }

  get email() {
    return this._authService.getEmail();
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  private _gotToSignIn() {
    this._router.navigate(['/sign-in']);
  }

  signOut() {
    this._authService.doLogout();
    this.closeSidenav();
    this._gotToSignIn();
  }

}
