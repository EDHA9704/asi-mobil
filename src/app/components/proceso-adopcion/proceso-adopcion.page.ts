import { Component, OnInit,Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {MascotaService} from "../../services/mascota.service"
import { ModalController } from '@ionic/angular';
import {Adopcion} from '../../models/adopcion'
import {GLOBAL} from '../../services/global';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatCardModule,MatButtonModule, MatStepperModule, MatFormFieldModule ,MatFormFieldControl} from '@angular/material'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Storage } from '@ionic/storage';

import {PopUpLocationComponent} from '../pop-up-location/pop-up-location.component'
declare var $:any;
@Component({
  selector: 'app-proceso-adopcion',
  templateUrl: './proceso-adopcion.page.html',
  styleUrls: ['./proceso-adopcion.page.scss'],
  providers:[{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ProcesoAdopcionPage implements OnInit {
  @Input() id: string;
  isLinear = true;
  firstFrGroup: FormGroup;
  secondFrmGroup: FormGroup;
  trFrmGroup: FormGroup;
  frFrmGroup: FormGroup;
  fvFrmGroup: FormGroup;
  public usuario:any;
  public mascota:any;
  public adopcion:Adopcion;
  public url;
  public edads = ['18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50']
  direccionSelected:any=''
  constructor(private _route:ActivatedRoute,
    private _router:Router,private storage: Storage,public alertController: AlertController,public toastController: ToastController,public loadingController: LoadingController,private nativeStorage: NativeStorage,private _formBuilder: FormBuilder,navParams: NavParams,private _mascotaService:MascotaService,public modalController: ModalController) { 
    this.id = navParams.get('id');
    this.obtenerMascota(this.id);
    this.url = GLOBAL.url;
    this.adopcion = new Adopcion("","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","")
    
  }

  async ngOnInit() {
    this.firstFrGroup = this._formBuilder.group({
      cedula: ['', [Validators.required,Validators.pattern('^([0-9]){0,10}$')]],
      instruccion: ['', [Validators.required]],
      ocupacion : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(5),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
      direccion : ['', []],
      inmueble : ['', [Validators.required]],

    });
    this.secondFrmGroup = this._formBuilder.group({
      deseoAdoptar: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(30),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
      cambiarDomicilio: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(10),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
      cargoGastos : ['', [Validators.required,Validators.maxLength(100),Validators.minLength(10),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
      dineroMensualMS : ['', [Validators.required]]
    });
    this.trFrmGroup = this._formBuilder.group({
      cerramiento: ['', [Validators.required]],
      salirViaje: ['', [Validators.required]],
      tiempoSolo : ['', [Validators.required]],
      comidaMS: ['', [Validators.required]],
      enfermaMS: ['', [Validators.required]],
      dormirMS : ['', [Validators.required,Validators.maxLength(100),Validators.minLength(10),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]]
    });
    this.frFrmGroup = this._formBuilder.group({
      numMascotas: ['', [Validators.required]],
      estadoMascotas: ['', [Validators.required]],
      numPersonas : ['', [Validators.required]],
      familiarEmbarazo: ['', [Validators.required]],
      familiarAlergico: ['', [Validators.required]],
    });
    this.fvFrmGroup = this._formBuilder.group({
      compartidaFamilia: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(10),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
      nombresRP: ['', [Validators.required,Validators.maxLength(50),Validators.minLength(5),Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$')]],
      telefonoRP : ['', [Validators.required,Validators.pattern('^([0-9]){0,10}$')]],
      visitarDomicilio: ['', [Validators.required]],
      
    });
    await this.obtenerStorageUser();
    $(document).ready(()=>{
      this.validarEspacios()
            
        });
   
  }
  get f() { return this.firstFrGroup.controls; }
  get f2() { return this.secondFrmGroup.controls; }
  get f3() { return this.trFrmGroup.controls; }
  get f4() { return this.frFrmGroup.controls; }
  get f5() { return this.fvFrmGroup.controls; }

  validarEspacios(){

    $("#cedula").keyup(()=>{ 
      this.firstFrGroup.controls['cedula'].setValue(this.limpiarCampo(this.firstFrGroup.value.cedula));
  }); 
  $("#ocupacion").keyup(()=>{
    this.firstFrGroup.controls['ocupacion'].setValue(this.limpiarCampo(this.firstFrGroup.value.ocupacion));
  }); 
 
  $("#cambiarDomicilio").keyup(()=>{
    this.secondFrmGroup.controls['cambiarDomicilio'].setValue(this.limpiarCampo(this.secondFrmGroup.value.cambiarDomicilio));
  });
  
  $("#deseoAdoptar").keyup(()=>{
    this.secondFrmGroup.controls['deseoAdoptar'].setValue(this.limpiarCampo(this.secondFrmGroup.value.deseoAdoptar));
    
 }); 
 $("#cargoGastos").keyup(()=>{
  this.secondFrmGroup.controls['cargoGastos'].setValue(this.limpiarCampo(this.secondFrmGroup.value.cargoGastos));

});
$("#dormirMS").keyup(()=>{
  this.trFrmGroup.controls['dormirMS'].setValue(this.limpiarCampo(this.trFrmGroup.value.dormirMS));
});
$("#compartidaFamilia").keyup(()=>{
  this.fvFrmGroup.controls['compartidaFamilia'].setValue(this.limpiarCampo(this.fvFrmGroup.value.compartidaFamilia));
});
$("#nombresRP").keyup(()=>{ 
  this.fvFrmGroup.controls['nombresRP'].setValue(this.limpiarCampo(this.fvFrmGroup.value.nombresRP));
});
$("#telefonoRP").keyup(()=>{
  this.fvFrmGroup.controls['telefonoRP'].setValue(this.limpiarCampo(this.fvFrmGroup.value.telefonoRP));
});

 
  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
  obtenerMascota(id){
    this._mascotaService.obtMascota(id).subscribe(
      response=>{
        console.log(response);
        this.mascota = response.mascota;
      },
      error=>{
        console.log(error)

      }
    )
  }
  closeModal(){
    this.modalController.dismiss()
  }
  async myDismiss(result) {

    await this.modalController.dismiss(result);
  } 
  prueba(){
    this._router.navigate(['perfil-mascota',this.mascota._id]);       

  }
  async registrarAdopcion(fid,mid){
    const loading = await this.loadingController.create({
      message: 'Postulando...'
    });
  
   
    this.presentLoading(loading)
    this.adopcion.cedula = this.firstFrGroup.get('cedula').value;
    this.adopcion.instruccion = this.firstFrGroup.get('instruccion').value;
    this.adopcion.inmueble = this.firstFrGroup.get('inmueble').value;
    this.adopcion.ocupacion = this.firstFrGroup.get('ocupacion').value;
    this.adopcion.direccion = this.firstFrGroup.get('direccion').value;
    this.adopcion.deseoAdoptar= this.secondFrmGroup.get('deseoAdoptar').value;
    this.adopcion.cambiarDomicilio = this.secondFrmGroup.get('cambiarDomicilio').value;
    this.adopcion.cargoGastos = this.secondFrmGroup.get('cargoGastos').value;
    this.adopcion.dineroMensualMS = this.secondFrmGroup.get('dineroMensualMS').value;
    this.adopcion.cerramiento = this.trFrmGroup.get('cerramiento').value;
    this.adopcion.salirViaje = this.trFrmGroup.get('salirViaje').value;
    this.adopcion.tiempoSolo = this.trFrmGroup.get('tiempoSolo').value;
    this.adopcion.comidaMS = this.trFrmGroup.get('comidaMS').value;
    this.adopcion.enfermaMS = this.trFrmGroup.get('enfermaMS').value;
    this.adopcion.dormirMS = this.trFrmGroup.get('dormirMS').value;
    this.adopcion.numMascotas = this.frFrmGroup.get('numMascotas').value;
    this.adopcion.estadoMascotas = this.frFrmGroup.get('estadoMascotas').value;
    this.adopcion.numPersonas = this.frFrmGroup.get('numPersonas').value;
    this.adopcion.familiarEmbarazo = this.frFrmGroup.get('familiarEmbarazo').value;
    this.adopcion.familiarAlergico = this.frFrmGroup.get('familiarAlergico').value;
    this.adopcion.compartidaFamilia = this.fvFrmGroup.get('compartidaFamilia').value;
    this.adopcion.nombresRP = this.fvFrmGroup.get('nombresRP').value;
    this.adopcion.telefonoRP = this.fvFrmGroup.get('telefonoRP').value;
    this.adopcion.visitarDomicilio = this.fvFrmGroup.get('visitarDomicilio').value;



    this._mascotaService.registroAdopcion(fid,mid,this.usuario.rol,this.adopcion,this.usuario.token).subscribe(
      response=>{
        console.log(response)
        loading.dismiss();   
        
        var msj = "Te has postulado correctamente al proceso de adopción para: "+this.mascota.nombre+". Se te notificará cuando la respectiva fundación revise tu postulación."
        this.presentAlert("Proceso de adopción",msj)
        this.myDismiss('ok');
      },
      error=>{
        loading.dismiss();   
        console.log(<any>error)
      }
    )
  }
  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'top'
    });
    toast.present();
    
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  async presentAlert(head,text) {
    const alert = await this.alertController.create({
      header: head,
      
      message: text,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentMapModal() {

      const modal = await this.modalController.create({
        component: PopUpLocationComponent,
        componentProps: {
          'tipo': 'adopcion',
        }
      });
      modal.onDidDismiss().then((detail) => {
        console.log(detail)

        this.direccionSelected = detail.data
        this.firstFrGroup.controls['direccion'].setValue(this.direccionSelected)
     });
      return await modal.present();
    
   
  }
}
