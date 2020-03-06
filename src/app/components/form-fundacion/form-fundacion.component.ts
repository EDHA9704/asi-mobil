import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import {FormControl, Validators} from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import {FundacionService} from '../../services/fundacion.service'
import {Donacion} from '../../models/donacion'
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsuarioService} from "../../services/usuario.service"
import { AlertController } from '@ionic/angular';
import {Mail} from '../../models/mail';
import { Storage } from '@ionic/storage';
import {PopUpLocationComponent} from '../pop-up-location/pop-up-location.component'

declare var $:any;
@Component({
  selector: 'app-form-fundacion',
  templateUrl: './form-fundacion.component.html',
  styleUrls: ['./form-fundacion.component.scss'],
  providers:[FundacionService,UsuarioService]
})
export class FormFundacionComponent implements OnInit {
  public op = 'ec';
  direccionSelected:any=''
  public op2;
  public co;
  public idf;
  public idU;
  public rol;
  public donacion;
  public usuario:any;
  public usuarioAcc:any;
  public errorC;
  public errorP;
  public mail:Mail;

  asector = ["Norte","Centro","Sur"]
  image:any=''

  nombre = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]*$'),Validators.maxLength(20),Validators.minLength(4)]);
  cantidad = new FormControl('',[Validators.required,Validators.pattern('[0-9]+$')]);
  foto = new FormControl('',[Validators.required]);
  des = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : \\- + , . \\n]*$'),Validators.maxLength(500),Validators.minLength(5)]);
  des2 = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : \\- + , . \\n]*$'),Validators.maxLength(500),Validators.minLength(5)]);

  voluntario = new FormControl('',[Validators.required]);
  sector = new FormControl('',[Validators.required]);
  direccion = new FormControl('',[]);
  //calleP = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 , .]*$'),Validators.maxLength(20),Validators.minLength(4)]);
  //calleS = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 , .]*$'),Validators.maxLength(20),Validators.minLength(4)]);
  referencia = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 , . \\- # \\n]*$'),Validators.maxLength(50),Validators.minLength(4)]);

  asunto = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]*$'),Validators.maxLength(50),Validators.minLength(3)]);
  mensaje = new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 , . : ; \\- # \\n]*$'),Validators.maxLength(500),Validators.minLength(10)]);

  getErrorMessage() {
    return this.cantidad.hasError('required') ? 'La cantidad de dinero es requerida' :
    this.cantidad.hasError('pattern') ? 'Solo se admite números':
            '';
  }
  getErrorMessage1() {
    return this.nombre.hasError('required') ? 'El nombre es requerido' :
    this.nombre.hasError('pattern') ? 'No se admite caracteres especiales':
    this.nombre.hasError('minlength') ? 'Nombre muy corto':
    this.nombre.hasError('maxlength') ? 'Exceso de caracteres (máximo 20)':
            '';
  }
  getErrorMessage2() {
    return this.des.hasError('required') ? 'Las razones son requeridas' :
    this.des.hasError('pattern') ? 'No se admite caracteres especiales':
    this.des.hasError('minlength') ? 'Descripción demasiado corta':
    this.des.hasError('maxlength') ? 'Exceso de caracteres (máximo 500)':

            '';
  }
  getErrorMessage3() {
    return this.sector.hasError('required') ? 'Sector requerido' :
            '';
  }
 /* getErrorMessage4() {
    return this.barrio.hasError('required') ? 'Nombre del barrio requerido' :
    this.barrio.hasError('pattern') ? 'No se admite caracteres especiales':
    this.barrio.hasError('minlength') ? 'barrio no válido':
    this.barrio.hasError('maxlength') ? 'Exceso de caracteres (máximo 20)':

            '';
  }*/
 /* getErrorMessage5() {
    return this.calleP.hasError('required') ? 'Calle principal requerida' :
    this.calleP.hasError('pattern') ? 'No se admite caracteres especiales':
    this.calleP.hasError('minlength') ? 'Calle no válida':
    this.calleP.hasError('maxlength') ? 'Exceso de caracteres (máximo 20)':

    '';
  }   
    getErrorMessage6() {
      return this.calleS.hasError('required') ? 'Calle secundaria requerida' :
      this.calleS.hasError('pattern') ? 'No se admite caracteres especiales':
      this.calleS.hasError('minlength') ? 'Calle no válida':
      this.calleS.hasError('maxlength') ? 'Exceso de caracteres (máximo 20)':
  
              '';
    }*/
    getErrorMessage7() {
      return this.referencia.hasError('required') ? 'Número de casa o referencia requerida' :
      this.referencia.hasError('pattern') ? 'No se admite caracteres especiales':
      this.referencia.hasError('minlength') ? 'No válido':
      this.referencia.hasError('maxlength') ? 'Exceso de caracteres (máximo 50)':
  
              '';
    }
    getErrorMessage8() {
      return this.des2.hasError('required') ? 'Las razones son requeridas' :
      this.des2.hasError('pattern') ? 'No se admite caracteres especiales':
      this.des2.hasError('minlength') ? 'Descripción demasiado corta':
      this.des2.hasError('maxlength') ? 'Exceso de caracteres (máximo 500)':
  
              '';
    }
    getErrorMessage9() {
      return this.asunto.hasError('required') ? 'Asunto requerido' :
      this.asunto.hasError('pattern') ? 'No se admite caracteres especiales o números':
      this.asunto.hasError('minlength') ? 'Asunto muy corto':
      this.asunto.hasError('maxlength') ? 'Exceso de caracteres (máximo 50)':
  
              '';
    }
    getErrorMessage10() {
      return this.mensaje.hasError('required') ? 'Mensaje requerido' :
      this.mensaje.hasError('pattern') ? 'No se admite caracteres especiales o números':
      this.mensaje.hasError('minlength') ? 'Mensaje muy corto':
      this.mensaje.hasError('maxlength') ? 'Exceso de caracteres (máximo 500)':
  
              '';
    }
  constructor(private storage: Storage,public alertController: AlertController,private _snackBar: MatSnackBar,private _fundacionService:FundacionService, private nativeStorage: NativeStorage,
    public modalController: ModalController,navParams: NavParams,private _usuarioService:UsuarioService,
    public actionSheetController: ActionSheetController,private camera: Camera) { 
    this.op2 = navParams.get('op');
    this.co = navParams.get('co')
    this.idf = navParams.get('idf');

    
  }

  async ngOnInit() {
    console.log(this.voluntario.value)
    
    $(document).ready(()=>{
      this.limpiarEspacios()
    });
    await this.obtenerStorageUser()
    await this.obtenerUsuario(this.usuarioAcc.id)
   
  }
  tabChanged(event){
    console.log(event);

    if(event == 0){
      this.op = 'ec';
      $(document).ready(()=>{
        this.limpiarEspacios()
      });
    }else if(event == 1){
      $(document).ready(()=>{
        this.limpiarEspacios()
      });
      this.op = 'pro';
    }
  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
  limpiarEspacios(){
    $("#nombre").keyup(()=>{
      this.nombre.setValue(this.limpiarCampo(this.nombre.value));
    }); 
    
  $("#des").keyup(()=>{
    this.des.setValue(this.limpiarCampo(this.des.value));
  });
  $("#des2").keyup(()=>{
    this.des2.setValue(this.limpiarCampo(this.des2.value));
  });
 /* $("#barrio").keyup(()=>{
    this.barrio.setValue(this.limpiarCampo(this.barrio.value));
  });
  $("#calleS").keyup(()=>{
    this.calleS.setValue(this.limpiarCampo(this.calleS.value));
  });
  $("#calleP").keyup(()=>{
    this.calleP.setValue(this.limpiarCampo(this.calleP.value));
  }); */
  $("#referencia").keyup(()=>{
    this.referencia.setValue(this.limpiarCampo(this.referencia.value));
  }); 
  $("#asunto").keyup(()=>{
    this.asunto.setValue(this.limpiarCampo(this.asunto.value));
  }); 
  $("#mensaje").keyup(()=>{
    this.mensaje.setValue(this.limpiarCampo(this.mensaje.value));
  }); 


  }
  async myDismiss(result,op) {
    if(result == 'registro'){
      this.registrarDonacion(result,op)
    }else if(result == 'email'){
      this.enviarMail(result)
    }else{
      await this.modalController.dismiss(result);

    }
    //

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
         this.foto.setValue(imageData);
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
      this.foto.setValue(imageData);
      }, (err) => {
        alert("error "+JSON.stringify(err))
      })
}
  async registrarDonacion(result,op){
   console.log(this.op)
    if(this.errorP == false || this.errorC == false){
     
      this.donacion = new Donacion("","","","","","","","","","",false,"")
      if(op == 'ec'){
        this.donacion.tipo = 'Económica' 
        this.donacion.cantidad = this.cantidad.value;
        this.donacion.estado = 0
        this.donacion.descripcion = this.des.value;
  
      }
      if(op == 'pro'){
        this.donacion.tipo = 'Producto' 
        this.donacion.nombreProducto = this.nombre.value;
        this.donacion.descripcion = this.des2.value;
  
        if(this.voluntario.value == 1){
          this.donacion.estado = 3
          this.donacion.asignar = true

        }else if(this.voluntario.value == 2){
          this.donacion.estado = 0
          this.donacion.asignar = false
        }
      }
      
      this.donacion.fundacion = this.idf;
      this.donacion.sector = this.sector.value;
      this.donacion.direccion = this.direccionSelected; 
     // this.donacion.calleP = this.calleP.value;
     // this.donacion.calleS = this.calleS.value;
      this.donacion.referencia = this.referencia.value;
      this.donacion.donanteR = this.idU;

      console.log(this.donacion)
      this._fundacionService.uploadDonacion(this.foto.value,this.donacion,this.usuarioAcc.rol).then(
        response=>{
          this.modalController.dismiss(result);
          console.log(response)
        },
        error=>{
          this._snackBar.open('Error, intentalo de nuevo', 'Cerrar', {
            duration: 3000
          });
          console.log(<any>error)
        }
       
      )
    }else{
        this.presentAlert("Debes validar tu correo o actualizar tus datos antes de registrar una donación")
    }

   
  }
  enviarMail(result){
    this.mail = new Mail("","","","","","","","","","")
        this.mail.asunto = "COMB";
        this.mail.nombres = this.usuario.nombres;
        this.mail.apellidos = this.usuario.apellidos;
        this.mail.telefono = this.usuario.telefono;
        this.mail.celular = this.usuario.celular;
        this.mail.correo = this.usuario.correo;
        this.mail.correoFundacion = this.co;
        this.mail.asunto2 = this.asunto.value;

        if(this.usuario.fechaNacimiento == null){
          this.mail.fechaNacimiento = "02/04/1997"
        }else{
          var n = new Date(this.usuario.fechaNacimiento);
          var t = n.toLocaleDateString()
          this.mail.fechaNacimiento = t;
        }
        this.mail.mensaje = this.mensaje.value;
    this._usuarioService.enviarEmail(this.mail).subscribe(
      res=>{
         if(res.n == '1'){
          
           this.modalController.dismiss(result);
         }
  
       },
       err=>{
        
         console.log(<any>err);
  
       }
     )
  }
  async presentAlert(txt) {
    const alert = await this.alertController.create({
      header: 'Validar',
      message: txt,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

obtenerUsuario(id){
  $(document).ready(()=>{
    this.limpiarEspacios()
  });
    this.idU = id
 
  this._usuarioService.obtUsuario(this.idU).subscribe(
    response=>{
      console.log(response)
      if(response.n == '1'){
        $(document).ready(()=>{
          this.limpiarEspacios()
        });
        this.usuario = response.usuario;
        if(this.usuario.correoVerificado == false){
          this.errorC = true;
        }else{
          this.errorC = false;
        }
    
        if(this.usuario.telefono == null || this.usuario.telefono == undefined || this.usuario.telefono == "" || this.usuario.celular == null
        || this.usuario.celular == undefined || this.usuario.celular == ""){
          this.errorP = true;
        }
        else{
          this.errorP = false;
        }
      }
    },
    error=>{
      this.usuario = 'error';
      console.log(<any>error)
    }
  )
}
async obtenerStorageUser(){
  await this.storage.get('usuario').then((val) => {
     this.usuarioAcc=val;
  
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
    
   
 });
  return await modal.present();


}
}
