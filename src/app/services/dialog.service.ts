import { Injectable } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { NewItemDialogComponent } from "../components/new-item-dialog/new-item-dialog.component";
import { Item } from "../models/item";
import { EditItemDialogComponent } from "../components/edit-item-dialog/edit-item-dialog.component";
import { Compartment } from "../models/compartment";
import { EditCompartmentDialogComponent } from "../components/edit-compartment-dialog/edit-compartment-dialog.component";
import { NewCompartmentDialogComponent } from "../components/new-compartment-dialog/new-compartment-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  constructor(
    private _dialog: MatDialog
  ) {

  }

  addNewItemDialog() {
    return this._dialog.open(NewItemDialogComponent);
  }

  editItemDialog(item: Item) {
    return this._dialog.open(EditItemDialogComponent, { data: item });
  }

  addNewCompartmentDialog() {
    return this._dialog.open(NewCompartmentDialogComponent);
  }

  editCompartmentDialog(compartment: Compartment) {
    return this._dialog.open(EditCompartmentDialogComponent, { data: compartment });
  }

}
