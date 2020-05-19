import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Item } from '../../models/item';
import { CompartmentService } from '../../services/compartment.service';
import { Observable } from 'rxjs';
import { Compartment } from '../../models/compartment';
import { ValidationHelper } from 'src/app/helper/validation-helper';

@Component({
  selector: 'edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  styleUrls: ['./edit-item-dialog.component.scss']
})
export class EditItemDialogComponent implements OnInit {

  editForm: FormGroup;
  compartments: Observable<Compartment[]>;

  constructor(
    private _dialogRef: MatDialogRef<EditItemDialogComponent>
    , @Inject(MAT_DIALOG_DATA) private _data: Item
    , private _formBuilder: FormBuilder
    , private _compartmentService: CompartmentService
  ) { }

  ngOnInit() {
    this.editForm = this._formBuilder.group(this._data);
    this.compartments = this._compartmentService.get();
  }

  getErrorMessage(control: AbstractControl){
    return ValidationHelper.getErrorMessage(control);
  }

  submit(): void {
    this._dialogRef.close(this.editForm.value);
  }

  cancel(): void {
    this._dialogRef.close();
  }

}
