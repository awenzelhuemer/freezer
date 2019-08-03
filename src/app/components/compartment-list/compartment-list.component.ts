import { Component, OnInit } from '@angular/core';
import { CompartmentService } from '../../services/compartment.service';
import { Compartment } from '../../models/compartment';
import { Observable } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { TitleService } from '../../services/title.service';

@Component({
  templateUrl: './compartment-list.component.html',
  styleUrls: ['./compartment-list.component.scss']
})
export class CompartmentListComponent implements OnInit {

  compartments: Compartment[];

  constructor(
    private _compartmentService: CompartmentService
    , private _dialogService: DialogService
    , private _titleService: TitleService
  ) { }

  ngOnInit() {
    this._titleService.set('Gefrierfächer');
    this._compartmentService.get().subscribe(c => this.compartments = c);
  }

  addCompartment() {
    this._dialogService.openAddNewCompartmentDialog().afterClosed().subscribe(i => {
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

  removeCompartment(compartment: Compartment) {
    this._dialogService.openMessageDialog('Soll das Fach wirklich gelöscht werden?').afterClosed().subscribe(result => {
      if (result === true) {
        this._compartmentService.remove(compartment.key);
      }
    });
  }

  get hasSelected() {
    return this.compartments && this.compartments.filter(i => i.selected).length > 0;
  }

  get selectedCompartment() {
    return this.compartments.filter(i => i.selected)[0];
  }

  selectCompartment(compartment: Compartment) {
    this.compartments.forEach(i => i.selected = compartment.key === i.key ? !compartment.selected : false);
  }
}
