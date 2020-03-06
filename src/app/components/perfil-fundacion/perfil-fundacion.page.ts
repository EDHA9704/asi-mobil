import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service"
import {MascotaService} from "../../services/mascota.service"
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import { ToastController, AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormFundacionComponent } from '../form-fundacion/form-fundacion.component';
import { SlidesFundacionComponent } from '../slides-fundacion/slides-fundacion.component';

import {MatSnackBar} from '@angular/material/snack-bar';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as $ from 'jquery'
import Swiper from 'swiper';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil-fundacion',
  templateUrl: './perfil-fundacion.page.html',
  styleUrls: ['./perfil-fundacion.page.scss'],
  providers:[UsuarioService,MascotaService,FormFundacionComponent,SlidesFundacionComponent,MatSnackBar]
})
export class PerfilFundacionPage implements OnInit {
  public id;
  public idU;
  step = 0;
  public usuario:any;
  public url;
  public stdM;
  public stdV;
  public fundacion:any;
  public portadasFundacion:any;
  public historias:any;
  public statusMsc;
  public mascotas:any;
  public carga;
  public total;
  public itemsPerPage;
  public page;
  public pages;
  public status;
  public bkey;
  public selecFiltro;

  public fab;
  public usuarioOb:any
  constructor(private storage: Storage,private nativeStorage: NativeStorage,private _snackBar: MatSnackBar,
    public modalController: ModalController,private _router:Router,public toastController: ToastController,
    private activeRoute:ActivatedRoute, private _usuarioService:UsuarioService,private _mascotaService:MascotaService,
    public alertController: AlertController,
    private usuarioService:UsuarioService) { 
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.url = GLOBAL.url;
    this.page = 1;
    this.fab = 1;
    this.carga = true;
    this.bkey = false;
    this.selecFiltro = false;
  }

  async ionViewDidEnter(){
    await this.obtenerStorageUser()
    this.obtenerUsuario()
  }
  async ngOnInit() {
    await this.obtenerStorageUser()
    this.obtenerUsuario()
    
    this.loadpage()


  }
  setStep(index: number) {
    this.step = index;
  }
  doRefresh(event) {

    setTimeout(() => {
      
      event.target.complete();
      this.loadpage()
    }, 500);
  }
  loadpage(){
    this.page = 1;
    this.obtFundacion();
    this.obtPortadasFundacion();
    this.obtenerHistorias()
    this.obtMascotas(this.page);
    this.swiperCard()
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
  obtFundacion(){
    this._usuarioService.obtFundacionSTD(this.id).subscribe(
      response=>{
        this.fundacion = response.fundacion;
     
        this.stdM = response.stdMascotas;
        this.stdV = response.stdVoluntarios;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  obtPortadasFundacion(){
    this._usuarioService.obtPortadasFundacion(this.id).subscribe(
      response =>{
        this.swiperCard()
        if(response.portadasFundacion){
         
          this.portadasFundacion = response.portadasFundacion;
          console.log(this.portadasFundacion)
          
        }else{
         console.log("mal")
        }
      },
      error=>{
        this.portadasFundacion = []
        console.log(<any>error);
      }
    );
  }
  obtenerHistorias(){
    
    this._usuarioService.obtHistoriasFundacion(this.id).subscribe(
      response=>{
        if(response.historias && response.n == '1'){
            this.historias = response.historias;
   
        }
      },
      error=>{
        this.historias = []
        console.log(<any>error)
      }
    )
  }
  async obtMascotas(page,adding=false){
    
    await this._mascotaService.obtMisMascotas(this.id,page).subscribe(
      response=>{
        
        if(response.mascotas && response.n == '1'){
          this.statusMsc = false;

          this.carga = false;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
         /* if(page > this.pages){
            this._router.navigate[('/login')]
          }*/
         if(!adding){

          this.mascotas = []
          //this.mascotas = response.mascotas;
          response.mascotas.forEach(ms => {
            var foto = ms.fotos.filter(ft => ft.estado == 'activo')
            this.mascotas.push({ms,foto})
          });
          
         }else{
          var arrayA = this.mascotas;
          var arrayB = [];
          response.mascotas.forEach(ms => {
           var foto = ms.fotos.filter(ft => ft.estado == 'activo')
           arrayB.push({ms,foto})
         });
          this.mascotas = arrayA.concat(arrayB)
         }
         
        }else{
          
          this.presentToast('Intentalo nuevamente')

        }
      },
      error=>{
        this.carga = false;
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage != null && error.error.n == '2'){
         this.statusMsc = true;
        }else if(errorMessage != null && error.error.n == '3'){
          this.presentToast('Intentalo nuevamente')

        }else{
          this.presentToast('Intentalo nuevamente')

        }
      }
    )

  }
  public noMore = false;
  viewMore(){
    if(this.mascotas.length == this.total){
      this.noMore = true;
    }else{
      this.page += 1;
    }

    this.obtMascotas(this.page,true)
  }
  loadData(event) {
    this.status = false;

    setTimeout(() => {

      if(this.mascotas.length != this.total){
        this.viewMore()
      }else{
        this.status = true;
      }
      
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      /*if (data.length == 1000) {
        event.target.disabled = true;
      }*/
    }, 500);
  }
  perfilMascota(id){
    this._router.navigate(['perfil-mascota',id]);       
  }


  tabChanged(event){
    console.log(event);

    if(event == 1){
      this.fab = 1;

    }else if(event == 2){
      this.fab = 2;
    }else{
      this.fab = 0;
    }
  }
  swiperCard(){
    $(document).ready(function () {
    var swiper = new Swiper('.swiper-container', {
      slideShadows: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });
  }
  async presentAlert(msj) {
    const alert = await this.alertController.create({
      header: 'Perfil',
      message: msj,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Actualizar',
          handler: () => {
            this._router.navigate(['perfil',this.usuario.id]); 
          }
        }
      ]
    });

    await alert.present();
  }
  /*--MODAL PARA DONACIONES---*/
async presentModal(op) {
  if(this.usuarioOb.telefono != "" && this.usuarioOb.telefono != null && this.usuarioOb.celular != "" && this.usuarioOb.celular != ""
    && this.usuarioOb.correoVerificado == true){
  const modal = await this.modalController.create({
    component: FormFundacionComponent,
    componentProps: {
      'op': op,
      'idf':this.id,
      'co':this.fundacion.correo
    }
  });
  modal.onDidDismiss().then((detail) => {
    if (detail !== null) {
        if(detail.data == 'sc'){
          
        }else if(detail.data == 'registro'){
          this._snackBar.open('Registro exitoso', 'cerrar', {
            duration: 3000
          });
        }else if(detail.data == 'email'){
          this._snackBar.open('Mensaje enviado', 'cerrar', {
            duration: 3000
          });
        }
    }
 });
  return await modal.present();
    }else{
      if(op == 'donar'){
        this.presentAlert('Para realizar una donación es necesario que actualices tus datos personales')
      }else{
        this.presentAlert('Para enviar un correo es necesario que actualices tus datos personales')
      }
      
    }
}
  /*--MODAL PARA ver portadas o historias---*/
  async presentModalPH(op) {
    console.log(op)
    const modal = await this.modalController.create({
      component: SlidesFundacionComponent,
      componentProps: {
        'op': op,
        'port':this.portadasFundacion,
        'hist':this.historias
      }
    });
    modal.onDidDismiss().then((detail) => {
      if (detail !== null) {
          if(detail.data == 'sc'){
            
          }else if(detail.data == 'registro'){
            
          }else if(detail.data == 'email'){
            
          }
      }
   });
    return await modal.present();
  
  }
  obtenerUsuario(){
    this.usuarioService.obtUsuario(this.usuario.id).subscribe(
      response=>{
        this.usuarioOb = response.usuario
        console.log(this.usuarioOb)
      },
      error=>{
        console.log(<any>error)
      }
    )
   }
}
