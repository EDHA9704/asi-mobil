import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import {GLOBAL} from '../../../services/global';
import { Storage } from '@ionic/storage';
import {Usuario} from '../../../models/usuario'
import {Usuario2} from '../../../models/usuario'
import { MatSnackBar, MatDialog } from '@angular/material';
import { Mail } from 'src/app/models/mail copy';
declare var $:any;
import { DialogMailComponent} from  "../../dialog-mail/dialog-mail.component";
import { ChangesService } from 'src/app/services/changes.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  providers:[UsuarioService]
})
export class PerfilPage implements OnInit {
  nombres = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]*$'),Validators.maxLength(50),Validators.minLength(4)]);
  apellidos = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]*$'),Validators.maxLength(50),Validators.minLength(4)]);
  nacimiento = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required,Validators.pattern('^([0-9]){0,10}$')]);
  celular = new FormControl('', [Validators.required,Validators.pattern('^([0-9]){0,10}$')]);
  correo = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}'),Validators.maxLength(100),Validators.minLength(5)]);
  direccion = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 , . \\- # \\n]*$'),Validators.maxLength(50),Validators.minLength(10)]);
  password = new FormControl('',[Validators.pattern('^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,30}$'),Validators.minLength(8),Validators.maxLength(20)]);
  image:any=''
  public mail:Mail;
  foto = new FormControl('',[Validators.required]);
  public id;
  public url;
  public usuario:any;
  public usuarioAcc:any;
  public disabledPass = true;
  hide2 = true;
  getErrorMessage(op) {
    if(op == 'nm'){
      return this.nombres.hasError('required') ? 'Nombres requeridos' :
            this.nombres.hasError('pattern') ? 'No se admite caracteres especiales':
            this.nombres.hasError('minlength') ? 'Nombre muy corto':
            this.nombres.hasError('maxlength') ? 'Exceso de caracteres':
          '';
    }
    if(op == 'apel'){
      return this.apellidos.hasError('required') ? 'Apellidos requeridos' :
               this.apellidos.hasError('pattern') ? 'No se admite caracteres especiales':
            this.apellidos.hasError('minlength') ? 'Apellido no válido':
            this.apellidos.hasError('maxlength') ? 'Exceso de caracteres':
          '';
    }
    if(op == 'cor'){
      return this.correo.hasError('required') ? 'Correo requerido' :
      this.correo.hasError('pattern') ? 'Correo no válido':
            this.correo.hasError('minlength') ? 'Correo no válido':
            this.correo.hasError('maxlength') ? 'Exceso de caracteres':
          '';
    }
    if(op == 'dir'){
      return this.direccion.hasError('required') ? 'Dirección requerida' :
      this.direccion.hasError('pattern') ? 'No se admite caracteres especiales':
            this.direccion.hasError('minlength') ? 'Especifica mejor tu dirección':
            this.direccion.hasError('maxlength') ? 'Exceso de caracteres':
          '';
    }
    if(op == 'fch'){
      return this.telefono.hasError('required') ? 'Fecha de nacimiento requerida' :
          '';
    }
    if(op == 'tel'){
      return this.telefono.hasError('required') ? 'Teléfono requerido' :
          '';
    }
    if(op == 'cel'){
      return this.celular.hasError('required') ? 'Celular requerido' :
          '';
    }
    if(op == 'pss'){
      return this.password.hasError('pattern') ? 'Contraseña no válida':
            this.password.hasError('minlength') ? 'Mínimo 8 caracteres':
            this.password.hasError('maxlength') ? 'Exceso de caracteres':
          '';
    }

  }

  constructor(public dialog: MatDialog,private storage: Storage,private camera: Camera,public actionSheetController: ActionSheetController,
    private _usuarioService:UsuarioService,private activeRoute:ActivatedRoute,private _snackBar: MatSnackBar,private _changesService:ChangesService) { 
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.url = GLOBAL.url;
    this.password.disable()
  }
  ionViewDidLeave(){
    this._changesService.obtUser()
  }
  async ngOnInit() {
    await this.obtenerStorageUser()
    $(document).ready(()=>{
      this.limpiarEspacios()
    });
    this.obtenerUser();

  }
  openCam(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //alert(imageData)

      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.foto.setValue("");
      this._usuarioService.updateFoto(imageData,this.id).then(
        response=>{
          this.obtenerUser()
          this._snackBar.open('Foto actualizada', 'Cerrar', {
            duration: 3000
          });
        },
        error=>{
          this._snackBar.open('Intentalo de nuevo', 'Cerrar', {
            duration: 3000
          });
        }
      )

    
    }, (err) => {
     // Handle error
     alert("error "+JSON.stringify(err))
    });

  }
  openGallery(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
    
 
        this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
        this.foto.setValue("");

        this._usuarioService.updateFoto(imageData,this.id).then(
          response=>{
            console.log(response)
            this.obtenerUser()
            this._snackBar.open('Foto actualizada', 'Cerrar', {
              duration: 3000
            });
          },
          error=>{
            console.log(<any>error)
            this._snackBar.open('Intentalo de nuevo', 'Cerrar', {
              duration: 3000
            });
          }
        )
      }, (err) => {
        alert("error "+JSON.stringify(err))
      })
}
async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Seleccionar foto',
    buttons: [ {
      text: 'Cámara',
      icon: 'camera',
      handler: () => {
        this.openCam()
      }
    }, {
      text: 'Galería',
      icon: 'image',
      handler: () => {
        this.openGallery()
      }
    }]
  });
  await actionSheet.present();
}

async obtenerUser(){
  this._usuarioService.obtUsuario(this.id).subscribe(
    response=>{
      this.usuario = response.usuario;

      console.log(this.usuario)
      this.nombres.setValue(this.usuario.nombres)
      this.apellidos.setValue(this.usuario.apellidos)
      this.telefono.setValue(this.usuario.telefono)
      this.celular.setValue(this.usuario.celular)
      this.correo.setValue(this.usuario.correo)
      this.direccion.setValue(this.usuario.direccion)

      this.nacimiento.setValue(this.usuario.fechaNacimiento)
      this.foto.setValue(this.usuario.foto)
      this.usuarioAcc.image = this.usuario.foto
      this.persistirUsuario(this.usuarioAcc)
      

    },
    error=>{
      console.log(<any>error)
    }
  )
}

async persistirUsuario(usuario){
  await this.storage.set('usuario',usuario);
}
async obtenerStorageUser(){
  await this.storage.get('usuario').then((val) => {
     this.usuarioAcc=val;
     console.log(this.usuarioAcc)
   });
 }
actualizarUsuario(){
  var usuario
  if(this.password.value != ""){
      usuario = new Usuario(this.nombres.value,this.apellidos.value,this.nacimiento.value,
      this.telefono.value,this.celular.value,this.correo.value,this.direccion.value,this.password.value)
  }else{
    usuario = new Usuario2(this.nombres.value,this.apellidos.value,this.nacimiento.value,
      this.telefono.value,this.celular.value,this.correo.value,this.direccion.value)
  }

  this._usuarioService.actualizarUsuario(this.usuario._id,usuario,this.usuarioAcc.token).subscribe(
    response=>{
      this.obtenerUser()
      this._snackBar.open('Perfil actualizado', 'Cerrar', {
        duration: 3000
      });
    },
    error=>{
      console.log(<any>error)

      if(error.error){
        if(error.error.n == '8'){
          this._snackBar.open('El correo electrónico ya esta registrado', 'Cerrar', {
            duration: 3000
          });
        }else{
          this._snackBar.open('Intentalo nuevamente', 'Cerrar', {
            duration: 3000
          });
        }
      }else{
        this._snackBar.open('Intentalo nuevamente', 'Cerrar', {
          duration: 3000
        });
      }
     
    }
  )
}
limpiarCampo(text){

  var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');

  text = textFin;

  return text;

}
limpiarEspacios(){
  $("#nombres").keyup(()=>{
    this.nombres.setValue(this.limpiarCampo(this.nombres.value));
  }); 
  
$("#apellidos").keyup(()=>{
  this.apellidos.setValue(this.limpiarCampo(this.apellidos.value));
});
$("#direccion").keyup(()=>{
  this.direccion.setValue(this.limpiarCampo(this.direccion.value));
});


}


enviarCodigo(){
  this.mail = new Mail("","","","")
  this.mail.asunto = "VMB";
  this.mail.usuario = this.usuario.nombres + ' '+this.usuario.apellidos;
  this.mail.correo = this.usuario.correo

  this._usuarioService.enviarCodigo(this.mail).subscribe(
    res=>{
       
       if(res.n == '3'){
        this.openDialog()
        this._snackBar.open('Codigo enviado', 'Cerrar', {
          duration: 3000
        });
       
       }else if(res.n == '1'){
        this._snackBar.open('LLena todos los campos', 'Cerrar', {
          duration: 3000
        });
         
       }else{
        this._snackBar.open('Intenalo de nuevo', 'Cerrar', {
          duration: 3000
        });
       }

     },
     err=>{
      this._snackBar.open('Intenalo de nuevo', 'Cerrar', {
        duration: 3000
      });
       console.log(<any>err);

     }
   )
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogMailComponent, {
    width: '330px',
    data: {correo:this.usuario.correo}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if(result == 'ok'){
      this.obtenerUser()
      this._snackBar.open('Correo verificado exitosamente', 'Cerrar', {
        duration: 3000
      });
    }
    console.log('The dialog was closed');
   
  });
}
validarCodigo(){

}

changePass(op){
  if(op == 'habilitar'){
    this.password.enable()
    this.disabledPass = false;
    $( document ).ready(()=> {
      $("#pass").focus()
  });
   
  }else if(op == 'deshabilitar'){
    this.disabledPass = true;
    this.password.disable()
    this.password.setValue('')
  }
}
}
