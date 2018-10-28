import { Injectable } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { NewItemDialogComponent } from "../components/new-item-dialog/new-item-dialog.component";
import { Item } from "../models/item";
import { EditItemDialogComponent } from "../components/edit-item-dialog/edit-item-dialog.component";
import { Compartment } from "../models/compartment";
import { EditCompartmentDialogComponent } from "../components/edit-compartment-dialog/edit-compartment-dialog.component";
import { NewCompartmentDialogComponent } from "../components/new-compartment-dialog/new-compartment-dialog.component";
import { MessageDialogComponent } from "../components/message-dialog/message-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  constructor(
    private _dialog: MatDialog
  ) {

  }

  openMessageDialog(title: string, message: string) {
    return this._dialog.open(MessageDialogComponent, { data: {title: title, message: message}});
  }

  openAddNewItemDialog() {
    return this._dialog.open(NewItemDialogComponent);
  }

  openEditItemDialog(item: Item) {
    return this._dialog.open(EditItemDialogComponent, { data: item });
  }

  openAddNewCompartmentDialog() {
    return this._dialog.open(NewCompartmentDialogComponent);
  }

  editCompartmentDialog(compartment: Compartment) {
    return this._dialog.open(EditCompartmentDialogComponent, { data: compartment });
  }

}
