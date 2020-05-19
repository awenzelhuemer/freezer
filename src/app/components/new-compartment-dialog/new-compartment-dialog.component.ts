import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidationHelper } from 'src/app/helper/validation-helper';

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

  getErrorMessage(control: AbstractControl){
    return ValidationHelper.getErrorMessage(control);
  }

  submit(): void {
    this._dialogRef.close(this.newForm.value);
  }

  cancel(): void {
    this._dialogRef.close();
  }
}
