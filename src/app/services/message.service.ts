import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _snackBar: MatSnackBar
  ) {

  }

  dismiss() {
    this._snackBar.dismiss();
  }

  showMessage(message: string, action: string = 'X', autoclose: boolean = false) {
    return this._snackBar.open(
      message
      , autoclose ? null : action
      , { duration: autoclose ? 2000 : null }
    );
  }

}
