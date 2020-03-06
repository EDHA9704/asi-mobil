import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialoglogin',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.scss'],
})
export class DialogloginComponent implements OnInit {
  public tipo:any;
  public titulo:any;
  public msj:any;
  constructor(private dialogRef: MatDialogRef<DialogloginComponent>,
    @Inject(MAT_DIALOG_DATA) data,private _router:Router) { 
     
      this.tipo = data.tipo;
      console.log(this.tipo)
      this.titulo = data.titulo;
      this.msj = data.msj;
    }

  ngOnInit() {}

  register(){
    this.dialogRef.close();
    this._router.navigate(['registro']); 
  }
  login(){
    this.dialogRef.close();
    this._router.navigate(['login']); 
  }
  dismiss(){
    this.dialogRef.close();
  }
}
