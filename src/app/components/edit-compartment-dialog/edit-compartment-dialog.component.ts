import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Compartment } from '../../models/compartment';
import { CompartmentService } from '../../services/compartment.service';

@Component({
  selector: 'edit-compartment-dialog',
  templateUrl: './edit-compartment-dialog.component.html',
  styleUrls: ['./edit-compartment-dialog.component.scss']
})
export class EditCompartmentDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<EditCompartmentDialogComponent>
    , @Inject(MAT_DIALOG_DATA) private _data: Compartment
    , private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.editForm = this._formBuilder.group(this._data);
  }

  submit(): void {
    this._dialogRef.close(this.editForm.value);
  }

  cancel(): void {
    this._dialogRef.close();
  }
}
