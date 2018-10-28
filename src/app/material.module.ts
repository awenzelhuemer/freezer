import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [MatToolbarModule
    , MatListModule
    , MatCardModule
    , MatButtonModule
    , MatIconModule
    , MatDialogModule
    , MatFormFieldModule
    , MatInputModule
    , MatSnackBarModule
    , MatMenuModule
    , MatExpansionModule
    , MatTableModule
    , MatSelectModule
    , MatSidenavModule
    , MatDatepickerModule
    , MatAutocompleteModule
    , MatSlideToggleModule
    , MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule
    , MatListModule
    , MatCardModule
    , MatButtonModule
    , MatIconModule
    , MatDialogModule
    , MatFormFieldModule
    , MatInputModule
    , MatSnackBarModule
    , MatMenuModule
    , MatExpansionModule
    , MatTableModule
    , MatSelectModule
    , MatSidenavModule
    , MatDatepickerModule
    , MatMomentDateModule
    , MatAutocompleteModule
    , MatSlideToggleModule
    , MatProgressSpinnerModule
  ]
})
export class MaterialModule{

}
