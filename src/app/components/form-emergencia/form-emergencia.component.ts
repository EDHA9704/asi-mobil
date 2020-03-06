import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Emergencia } from '../../models/emergencia';
import { EmergenciaService } from '../../services/emergencia.service';
import { Storage } from '@ionic/storage';
import {PopUpLocationComponent} from '../pop-up-location/pop-up-location.component'
import {MatSnackBar} from '@angular/material/snack-bar';
declare var $:any;

@Component({
  selector: 'app-form-emergencia',
  templateUrl: './form-emergencia.component.html',
  styleUrls: ['./form-emergencia.component.scss'],
  providers:[EmergenciaService,MatSnackBar]
})
export class FormEmergenciaComponent implements OnInit {
  anivel = ["Atención inmediata","Muy urgente","Urgente","Normal","No urgente"]
  atipo = ["Mal estado de salud","Accidente","Preñada","Con cachorros","Maltrato","Abandono","Perdida/o"];
  asexo = ["Macho","Hembra"]
  araza = ["Mestizo","American Bully","Aussiedoodle o aussiepoo","Azawakh","Boxer","Cavapoo o cavoodle", "Cavachon","Cockapoo","Chorkie","Chow Chow","Eurasier","Foxhound","Goldendoodle","Husky","Kelpie","Labrador","Morkie","Pitbull","Puggle","Rottweiler","Schnauzer","Schnoodle","Terrier","Yorkipoo"]
  atipoM = ["Canino","Felino"]
  asector = ["Norte","Centro","Sur"]
  direccionSelected:any=''
  public usuario:any;
  nivel = new FormControl('', [Validators.required]);
  tipo = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required,Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; \\-]+$'),Validators.maxLength(300),Validators.minLength(10)]);
  foto = new FormControl('',[Validators.required]);
  foto2 = new FormControl('',[Validators.required]);

  tipoMascota = new FormControl('',[Validators.required]);
  sexoMascota = new FormControl('',[Validators.required]);
  raza = new FormControl('',[Validators.required]);
  estadoMascota = new FormControl('',[Validators.required,Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; \\-]+$'),Validators.maxLength(300),Validators.minLength(10)]);
  sector = new FormControl('',[Validators.required]);
  direccion = new FormControl('', []);
  //calleP = new FormControl('', [Validators.required,Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ \\-]+$'),Validators.maxLength(50),Validators.minLength(4)]);
  //calleS = new FormControl('', [Validators.required,Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ \\-]+$'),Validators.maxLength(50),Validators.minLength(4)]);
  referencia = new FormControl('', [Validators.required,Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; \\- \\n]+$'),Validators.maxLength(300),Validators.minLength(10)]);
  extra = new FormControl('', [Validators.required,Validators.pattern('[0-9]+$'),Validators.maxLength(10),Validators.minLength(7)]);

  getErrorMessage(op) {
    if(op == 'n'){
      return this.nivel.hasError('required') ? 'Selecciona el nivel' :
          '';
    }
    if(op == 't'){
      return this.tipo.hasError('required') ? 'Selecciona el tipo' :
          '';
    }
    if(op == 'd'){
      return this.descripcion.hasError('required') ? 'Descripción requerida' :
      this.descripcion.hasError('pattern') ? 'No se permite caracteres especiales' :
      this.descripcion.hasError('maxlength') ? 'Máximo 300 caracteres':  
      this.descripcion.hasError('minlength') ? 'Descripción muy corta':  

          '';
    }
    if(op == 'tm'){
      return this.tipoMascota.hasError('required') ? 'Selecciona el tipo de mascota' :
          '';
    }
    if(op == 'sx'){
      return this.sexoMascota.hasError('required') ? 'Selecciona el sexo de la mascota' :
          '';
    }
    if(op == 'rz'){
      return this.raza.hasError('required') ? 'Selecciona la raza de la mascota' :
          '';
    }
    if(op == 'em'){
      return this.estadoMascota.hasError('required') ? 'Estado de la mascota requerido' :
      this.estadoMascota.hasError('pattern') ? 'No se permite caracteres especiales' :
      this.estadoMascota.hasError('maxlength') ? 'Máximo 300 caracteres':  
      this.estadoMascota.hasError('minlength') ? 'Estado muy corto':  

          '';
    }
    if(op == 'sc'){
      return this.sector.hasError('required') ? 'Selecciona el tipo de mascota' :
          '';
    }
    /*if(op == 'brr'){
      return this.barrio.hasError('required') ? 'Barrio requerido' :
      this.barrio.hasError('pattern') ? 'No se permite caracteres especiales' :
      this.barrio.hasError('maxlength') ? 'Máximo 50 caracteres':  
      this.barrio.hasError('minlength') ? 'No válido':  

          '';
    }
    if(op == 'cllP'){
      return this.calleP.hasError('required') ? 'Calle requerida' :
      this.calleP.hasError('pattern') ? 'No se permite caracteres especiales' :
      this.calleP.hasError('maxlength') ? 'Máximo 50 caracteres':  
      this.calleP.hasError('minlength') ? 'No válido':  

          '';
    }
    if(op == 'cllS'){
      return this.calleS.hasError('required') ? 'Calle requerida' :
      this.calleS.hasError('pattern') ? 'No se permite caracteres especiales' :
      this.calleS.hasError('maxlength') ? 'Máximo 50 caracteres':  
      this.calleS.hasError('minlength') ? 'No válido':  

          '';
    }*/
    if(op == 'rfr'){
      return this.referencia.hasError('required') ? 'Referencia requerida' :
      this.referencia.hasError('pattern') ? 'No se permite caracteres especiales' :
      this.referencia.hasError('maxlength') ? 'Máximo 300 caracteres':  
      this.referencia.hasError('minlength') ? 'Referencia muy corta':  

          '';
    }
    if(op == 'extra'){
      return this.extra.hasError('required') ? 'Número adicional requerido' :
      this.extra.hasError('pattern') ? 'Solo se permite números' :
      this.extra.hasError('maxlength') ? 'Número no válido':  
      this.extra.hasError('minlength') ? 'Número no válido':  

          '';
    }
  }

  image:any=''
  image2:any=''
  constructor(private storage: Storage,private _snackBar: MatSnackBar,private _emergenciaService:EmergenciaService, public modalController: ModalController,private camera: Camera,public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    await this.obtenerStorageUser()
    $(document).ready(()=>{
      this.validarEspacios()
            
        });
  }


  openCam(op){

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
     if(op == 'msc'){
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.foto.setValue(imageData);
     }
     if(op == 'dir'){
      this.image2=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.foto2.setValue(imageData);
     }
    
    }, (err) => {
     // Handle error
     alert("error "+JSON.stringify(err))
    });

  }
  openGallery(op){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
    
      if(op == 'msc'){
        this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
        this.foto.setValue(imageData);
      }
     
      if(op == 'dir'){
        this.image2=(<any>window).Ionic.WebView.convertFileSrc(imageData);
        this.foto2.setValue(imageData);
      }
      }, (err) => {
        alert("error "+JSON.stringify(err))
      })
}
async presentActionSheet(op) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Seleccionar foto',
    buttons: [ {
      text: 'Cámara',
      icon: 'camera',
      handler: () => {
        this.openCam(op)
      }
    }, {
      text: 'Galería',
      icon: 'image',
      handler: () => {
        this.openGallery(op)
      }
    }]
  });
  await actionSheet.present();
}
async myDismiss(result) {
  await this.modalController.dismiss(result);
 
}
async registrarEmergencia(){

  if( this.tipo.valid && this.descripcion.valid
    && this.sector.valid 
     && this.referencia.valid
    && this.direccion.valid && this.foto.value != null && this.foto.value != ""
    ){
      var emergencia  = new Emergencia(
        this.tipo.value,this.descripcion.value,
        this.sector.value,this.direccion.value,this.referencia.value,this.extra.value
      )
     // const imageForm = new FormData();
     // imageForm.append('image', this.imageObj);
    
        this._emergenciaService.nuevaEmergencia(this.foto.value,emergencia,this.usuario.rol,this.usuario.id).then(
          response=>{
            this.myDismiss('ok');
            this._snackBar.open('Emergencia enviada', 'Cerrar', {
              duration: 3000
            });
          },
          error=>{
            this._snackBar.open('Error, intentalo de nuevo', 'Cerrar', {
              duration: 3000
            });
            console.log(<any>error)
          }
         
        )
  }else{
    this._snackBar.open('LLena todos los campos', 'Cerrar', {
      duration: 3000
    });
  }
   

 
}
async obtenerStorageUser(){
  await this.storage.get('usuario').then((val) => {
     this.usuario=val;

   });
 }
limpiarCampo(text){

  var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');

  text = textFin;

  return text;

}
validarEspacios(){

  $("#descripcion").keyup(()=>{ 
    this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
}); 
/*$("#barrio").keyup(()=>{
  this.barrio.setValue(this.limpiarCampo(this.barrio.value));
}); 
$("#calleS").keyup(()=>{
  this.calleS.setValue(this.limpiarCampo(this.calleS.value));
});
$("#calleP").keyup(()=>{
  this.calleP.setValue(this.limpiarCampo(this.calleP.value));
});*/

$("#referencia").keyup(()=>{
  this.referencia.setValue(this.limpiarCampo(this.referencia.value));
  
}); 



}
async presentMapModal() {

  const modal = await this.modalController.create({
    component: PopUpLocationComponent,
    componentProps: {
      'tipo': 'emergencia',
    }
  });
  modal.onDidDismiss().then((detail) => {
    console.log(detail)

    this.direccionSelected = detail.data
    this.direccion.setValue(this.direccionSelected)
   
 });
  return await modal.present();


}
}
