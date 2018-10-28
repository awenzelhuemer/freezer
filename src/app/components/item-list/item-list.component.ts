import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Compartment } from "../../models/compartment";
import { Item } from "../../models/item";
import { CompartmentService } from "../../services/compartment.service";
import { DialogService } from "../../services/dialog.service";
import { ItemService } from "../../services/item.service";
import * as moment from 'moment';

@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {

  compartments: Compartment[];
  items: Item[];
  filteredItems: Item[];
  filterForm: FormGroup;

  showLoadingIndicator: boolean = false;

  constructor(
    private _dialogService: DialogService
    , private _compartmentService: CompartmentService
    , private _itemService: ItemService
    , formBuilder: FormBuilder
  ) {
    this.filterForm = formBuilder.group({
      name: [null],
      compartmentKey: [null]
    });

    this.filterForm.valueChanges.subscribe(v => this.filter())
  }

  ngOnInit() {
    this._compartmentService.get().subscribe(c => this.compartments = c);

    this.showLoadingIndicator = true;

    this._itemService.get().subscribe(i => {
      this.items = this.filteredItems = i;

      this.showLoadingIndicator = false;
    });
  }

  filter() {
    var nameFilter: string = this.filterForm.get("name").value;
    var compartmentKeyFilter: string = this.filterForm.get("compartmentKey").value;

    this.filteredItems = this.items.filter(i => (!nameFilter || i.name.toUpperCase().indexOf(nameFilter.toUpperCase()) > -1)
                                             && ((!compartmentKeyFilter || i.compartmentKey === compartmentKeyFilter)));
  }

  getCompartment(key: string) {
    let result = this.compartments.filter(c => c.key == key);
    return result ? result[0] : null;
  }

  addItem() {
    this._dialogService.openAddNewItemDialog().afterClosed().subscribe(i => {

      if (i) {
        this._itemService.add({ ...i, createdDate: moment().format("YYYY-MM-DD"), expiryDate: i.expiryDate ? moment(i.expiryDate).format("YYYY-MM-DD") : "" });
      }
    });

  }

  editItem(item: Item) {
    this._dialogService.openEditItemDialog(item).afterClosed().subscribe(i => {
      if (i) {
        this._itemService.update({ ...i, expiryDate: i.expiryDate ? moment(i.expiryDate).format("YYYY-MM-DD") : "" });
      }
    });

  }

  removeItem(key: string) {
    this._dialogService.openMessageDialog("Element löschen", "Soll das Element wirklich gelöscht werden?").afterClosed().subscribe(result => {
      if (result === true) {
        this._itemService.remove(key);
      }
    });

  
  }
}
