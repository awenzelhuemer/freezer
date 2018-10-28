import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from './message.service';

@Injectable({
providedIn: 'root'
})
export class UpdateService{

constructor(
  swUpdate: SwUpdate
  , private _messageService: MessageService
) {
  swUpdate.available.subscribe(() => {

    this._messageService.showMessage("Update available.", "Reload?").onAction().subscribe(() => window.location.reload());
  });
  }
}
