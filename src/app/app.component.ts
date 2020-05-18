import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { TitleService } from './services/title.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  @ViewChild('snav', { static: false }) sidenav: MatSidenav;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  themingSubscription: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef
    , media: MediaMatcher
    , private _authService: AuthService
    , private _titleService: TitleService
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  get title() {
    return this._titleService.get();
  }

  get email() {
    return this._authService.userData?.email;
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  closeSidenav() {
    this.sidenav.close();
  }

  signOut() {
    this._authService.signOut().then(() => this.closeSidenav());
  }

}
