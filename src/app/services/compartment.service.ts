import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from './message.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Compartment } from '../models/compartment';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartmentService {


  private compartments: Observable<Compartment[]>;

  private _compartmentRef: AngularFireList<Compartment>;

  constructor(
    db: AngularFireDatabase
  ) {
    this._compartmentRef = db.list<Compartment>('compartments', ref => ref.orderByChild('name'));
    // Use snapshotChanges().map() to store the key
    this.compartments = this._compartmentRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  get() {
    return this.compartments;
  }

  add(item: Compartment) {
    this._compartmentRef.push(item);
  }


  remove(key: string) {
    this._compartmentRef.remove(key)
  }

  update(item: Compartment) {
    this._compartmentRef.update(item.key, { ...item, key: null, selected: null });
  }
}
