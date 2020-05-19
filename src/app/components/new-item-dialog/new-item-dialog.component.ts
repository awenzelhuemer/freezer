import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Item } from '../../models/item';
import { CompartmentService } from '../../services/compartment.service';
import { Compartment } from '../../models/compartment';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ValidationHelper } from 'src/app/helper/validation-helper';

@Component({
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.scss']
})
export class NewItemDialogComponent implements OnInit {

  newForm: FormGroup;
  compartments: Observable<Compartment[]>;

  constructor(
    private _dialogRef: MatDialogRef<NewItemDialogComponent>
    , private _formBuilder: FormBuilder
    , private _compartmentService: CompartmentService
  ) {

  }

  ngOnInit() {
    this.compartments = this._compartmentService.get();
    this.newForm = this._formBuilder.group({
      name: ['', Validators.required],
      amount: [''],
      expiryDate: [moment().add(200, 'days')],
      compartmentKey: ['', Validators.required]
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
