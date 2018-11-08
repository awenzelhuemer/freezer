import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private _title: Title
  ) {
  }

  set(title: string) {
    this._title.setTitle(title);
  }

  get() {
    return this._title.getTitle();
  }
}
