import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'new-compartment-dialog',
  templateUrl: './new-compartment-dialog.component.html',
  styleUrls: ['./new-compartment-dialog.component.scss']
})
export class NewCompartmentDialogComponent implements OnInit {

  newForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<NewCompartmentDialogComponent>
    , private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.newForm = this._formBuilder.group({
      name: ['', Validators.required]
    });
  }

  submit(): void {
    this._dialogRef.close(this.newForm.value);
  }

  cancel(): void {
    this._dialogRef.close();
  }
}
