import { Component, OnInit } from '@angular/core';
import { CompartmentService } from '../../services/compartment.service';
import { Compartment } from '../../models/compartment';
import { Observable } from 'rxjs';
import { DialogService } from '../../services/dialog.service';

@Component({
  templateUrl: './compartment-list.component.html',
  styleUrls: ['./compartment-list.component.scss']
})
export class CompartmentListComponent implements OnInit {

  compartments: Observable<Compartment[]>;

  constructor(
    private _compartmentService: CompartmentService
    , private _dialogService: DialogService
  ) { }

  ngOnInit() {
    this.compartments = this._compartmentService.get();
  }

  addCompartment() {
    this._dialogService.addNewCompartmentDialog().afterClosed().subscribe(i => {
      if (i) {
        this._compartmentService.add(i);
      }
    });

  }

  editCompartment(compartment: Compartment) {
    this._dialogService.editCompartmentDialog(compartment).afterClosed().subscribe(i => {
      if (i) {
        this._compartmentService.update(i);
      }
    });
  }

  removeCompartment(key: string) {
    this._compartmentService.remove(key);
  }

}
