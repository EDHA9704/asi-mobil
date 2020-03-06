import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() reloadNotificacion: EventEmitter<boolean> = new EventEmitter();
  public dp = true;
  constructor() { }
  obtUser() {
    console.log("NRTRO SERVICE CHAN")
    this.change.emit(this.dp);
  }
  reloadNT(){
    this.reloadNotificacion.emit(this.dp);
  }

}
