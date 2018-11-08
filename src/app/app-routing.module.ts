import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CompartmentListComponent } from './components/compartment-list/compartment-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full', canActivate: [AuthGuard] }
  , { component: SignInComponent, path: 'sign-in' }
  , { component: ItemListComponent, path: 'items', canActivate: [AuthGuard] }
  , { component: CompartmentListComponent, path: 'compartments', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
