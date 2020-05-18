import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CompartmentListComponent } from './components/compartment-list/compartment-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard.ts.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full', canActivate: [AuthGuard] }
  , { component: SignInComponent, path: 'sign-in', canActivate: [SecureInnerPagesGuard] }
  , { component: SignUpComponent, path: 'sign-up', canActivate: [SecureInnerPagesGuard] }
  , { component: ItemListComponent, path: 'items', canActivate: [AuthGuard] }
  , { component: CompartmentListComponent, path: 'compartments', canActivate: [AuthGuard] }
  , { component: ResetPasswordComponent, path: 'reset-password', canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
