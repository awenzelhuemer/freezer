import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private items: Observable<Item[]>;

  private _itemRef: AngularFireList<Item>;

  constructor(
    private _db: AngularFireDatabase
  ) {
    this._itemRef = _db.list<Item>('items', ref => ref.orderByChild('name'));
    // Use snapshotChanges().map() to store the key
    this.items = this._itemRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  get() {
    return this.items;
  }

  add(item: Item) {
    this._itemRef.push(item);
  }


  remove(key: string) {
    this._itemRef.remove(key)
  }

  update(item: Item) {
    this._itemRef.update(item.key, {...item, key: null});
  }
}
