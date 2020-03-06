import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dialog-mail',
  templateUrl: './dialog-mail.component.html',
  styleUrls: ['./dialog-mail.component.scss'],
})
export class DialogMailComponent implements OnInit {
  codigo = new FormControl('', [Validators.required,Validators.pattern('^([0-9]){0,4}$')]);
  public correo:any
  constructor(private dialogRef: MatDialogRef<DialogMailComponent>,@Inject(MAT_DIALOG_DATA) data,
  private _usuarioService:UsuarioService) {
    this.correo = data.correo
   }

  ngOnInit() {}
  getErrorMessage(op) {
    if(op == 'co'){
      return this.codigo.hasError('required') ? 'Código requerido' :
            this.codigo.hasError('pattern') ? 'Código no válido':
            
          '';
    }
 

  }
  validarCodigo(){
    this._usuarioService.verificarCodigo(this.correo,this.codigo.value,'newUser').subscribe(
      response=>{
        console.log(response)
        this.dialogRef.close('ok');
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  enviar(){
    this.dialogRef.close(this.codigo.value);
  }
}
