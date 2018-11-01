import { registerLocaleData } from '@angular/common';
import localeAT from '@angular/common/locales/de-AT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewCompartmentDialogComponent } from './components/new-compartment-dialog/new-compartment-dialog.component';
import { CompartmentListComponent } from './components/compartment-list/compartment-list.component';
import { EditCompartmentDialogComponent } from './components/edit-compartment-dialog/edit-compartment-dialog.component';
import { EditItemDialogComponent } from './components/edit-item-dialog/edit-item-dialog.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { NewItemDialogComponent } from './components/new-item-dialog/new-item-dialog.component';
import { MaterialModule } from './material.module';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

registerLocaleData(localeAT);

@NgModule({
  declarations: [
    AppComponent
    , ItemListComponent
    , NewItemDialogComponent
    , CompartmentListComponent
    , EditItemDialogComponent
    , EditCompartmentDialogComponent
    , NewCompartmentDialogComponent
    , LoadingComponent
    , MessageDialogComponent
    , SignInComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-AT' }],
  bootstrap: [AppComponent],
  entryComponents: [
    NewItemDialogComponent
    , EditItemDialogComponent
    , EditCompartmentDialogComponent
    , NewCompartmentDialogComponent
    , MessageDialogComponent
  ]
})
export class AppModule { }
