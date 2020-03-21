import { Component, OnInit, ViewChild} from '@angular/core';
import {EmergenciaService} from '../../../services/emergencia.service';
import { Storage } from '@ionic/storage';
import { ToastController, PopoverController, ModalController, AlertController } from '@ionic/angular';
import {GLOBAL} from '../../../services/global';
import {FiltrospopComponent} from '../../filtrospop/filtrospop.component'
import { IonContent } from '@ionic/angular';
import {FormEmergenciaComponent} from'../../form-emergencia/form-emergencia.component'
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ChangesService } from 'src/app/services/changes.service';
declare var $:any
@Component({
  selector: 'app-emergencias',
  templateUrl: './emergencias.page.html',
  styleUrls: ['./emergencias.page.scss'],
  providers:[EmergenciaService]
})
export class EmergenciasPage implements OnInit {
  public usuario;
  public emergencias:any;
  public carga;
  public total;
  public itemsPerPage;
  public pages;
  public page;
  public status;
  public statusLength;
  public url;
  public usuarioOb:any
  @ViewChild(IonContent,{read:IonContent,static:false}) content: IonContent;
  public selecFiltro; 
  public selecFiltroAr:any;
  public bkey;
  fullUrl:string
  constructor(public modalController: ModalController,public popoverController: PopoverController,
    private storage: Storage,private _emergenciaService:EmergenciaService,
    public toastController: ToastController,public alertController: AlertController,
    private usuarioService:UsuarioService,private _router:Router,private _changesService:ChangesService) { 
    this.carga = true;
    this.page = 1;
    this.url = GLOBAL.url;
    this.selecFiltro = false;
  }


  async ionViewDidEnter(){
    await this.obtenerStorageUser();
    this.obtenerUsuario()
    this.obtEmergencias(this.page);
  }
  async ngOnInit() {
    this.fullUrl = this._router.url.toString()
    $("#headerM").removeClass('ocultar')
    $("#headerM").addClass('mostrar')
    this._changesService.change.subscribe(isOpen => {
      console.log("NRTRO PAGE EMER SUSBS")

      this.obtenerStorageUser();
      this.obtenerUsuario()
    })
    await this.obtenerStorageUser();
    this.obtenerUsuario()
    this.obtEmergencias(this.page);
  }
  doRefresh(event) {
    this.obtenerUsuario()
    setTimeout(() => {
      this.page = 1;
      this.obtEmergencias(this.page)
      event.target.complete();

    }, 500);
  }
  doRefresh2(event) {
    this.obtenerUsuario()
    setTimeout(() => {
      this.page = 1;
      this.filtrarEmergencias(this.selecFiltroAr,this.page)
      event.target.complete();

    }, 500);
  }
  logScrolling(event){
    if(event.detail.scrollTop > 50){

     // previous = event.detail.scrollTop;
      if(event.detail.deltaY > 0){
        $("#headerM").addClass('ocultar')
        $("#headerM").removeClass('mostrar')
      }else if(event.detail.deltaY < 0){
        $("#headerM").removeClass('ocultar')
        $("#headerM").addClass('mostrar')
      }
     
    }else if(event.detail.scrollTop < 50){
      $("#headerM").removeClass('ocultar')
      $("#headerM").addClass('mostrar')
    }
  /*  this.tp = event.detail.deltaY;
    this.sc = event.detail.scrollTop;
    if(this.tp > 0 && this.sc > 20){
      $("#headerM").addClass("MOVERHE")
      $("#divNotificacion").addClass("contentN")

    }
    if(this.tp <= 0 && this.sc > 21){
      $("#headerM").removeClass("MOVERHE");
      $("#headerM").addClass("headerFix")
      
    }
    if(this.tp <= 0 && this.sc <= 20){
      $("#headerM").removeClass("MOVERHE");
      $("#headerM").removeClass("headerFix")
      $("#divNotificacion").removeClass("contentN")
      
    }*/
   
  }
  loadData(event) {
   
    setTimeout(() => {

      if(this.emergencias.length != this.total){
        this.viewMore()
      }else{
        this.statusLength = true;
      }
      
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      /*if (data.length == 1000) {
        event.target.disabled = true;
      }*/
    }, 500);
  }
  loadData2(event) {
    this.status = false;

    setTimeout(() => {

      if(this.emergencias.length != this.total){
        this.viewMore2()
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
  public noMore = false;
  viewMore(){
    if(this.emergencias.length == this.total){
      this.noMore = true;
    }else{
      this.page += 1;
    }

    this.obtEmergencias(this.page,true)
  }
  public noMore2 = false;
    viewMore2(){
      if(this.emergencias.length == this.total){
        this.noMore2 = true;
      }else{
        this.page += 1;
      }
  
      this.filtrarEmergencias(this.selecFiltroAr,this.page,true)
    }
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    
  }
  obtEmergencias(page,adding=false){
    this._emergenciaService.obtEmergenciasAS(this.usuario.id,page).subscribe(
      response=>{
        
        if(response.emergencias && response.n == '1'){
         
          this.carga = false;
          this.status = false;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
     
         if(!adding){

          this.emergencias = response.emergencias

          console.log(this.emergencias)
       
         }else{
           var arrayA = this.emergencias;
           var arrayB = response.emergencias;
    
           this.emergencias = arrayA.concat(arrayB)
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
          this.status = true;
         }else{
           this.presentToast('Intentalo nuevamente')
 
         }
      }
    )
  }
  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
   ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  filtrarEmergencias(filtro,page,adding=false){
    this._emergenciaService.filtroEmergenciasMB(filtro,page,this.usuario.token).subscribe(
      response=>{
        console.log(response)
  
        this.total = response.total;
        this.pages = response.pages;
        this.itemsPerPage = response.itemsPerPage;
      
       if(!adding){
  
        this.emergencias = response.emergencias;
        
       }else{
         var arrayA = this.emergencias;
         var arrayB = response.emergencias;
         this.emergencias = arrayA.concat(arrayB)
       }
        this.carga = false;
       
      },
      error=>{
        this.carga = false;
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage != null && error.error.n == '2'){
        //this.statusMsc = true;
        this.emergencias = []
        this.total = 0;
        }else if(errorMessage != null && error.error.n == '3'){
          this.presentToast('Intentalo nuevamente')
  
        }else{
          this.presentToast('Intentalo nuevamente')
  
        }
  
      }
    )
  }
  
   async presentPopover(ev: any,op) {
    this.selecFiltro = false;
    this.bkey = false;
    this.carga = true;
    const popover = await this.popoverController.create({
      component: FiltrospopComponent,
      event: ev, 
      translucent: true,
      mode:'ios',
      cssClass:'popov',
      componentProps: {
        'op': op,
        'filtro':this.selecFiltroAr
        
      }
    });
  
    popover.onWillDismiss().then((detail) => {
     console.log(detail)
      if(detail.data != null && detail.data != undefined){
        if(detail.data == 'trash'){
          this.page = 1;
          this.selecFiltro = false;
          this.carga = false;
          this.selecFiltroAr = undefined;
          this.obtEmergencias(this.page);
          this.ScrollToTop();
        }else{
          this.selecFiltroAr = "";
          this.selecFiltroAr = detail.data;
          this.selecFiltro = true;
          this.page = 1;
          this.filtrarEmergencias(this.selecFiltroAr,this.page)
        }
       
        
      }else{
        console.log(this.selecFiltroAr)
        if(this.selecFiltroAr == null || this.selecFiltroAr == undefined || this.selecFiltroAr == ""){
          this.page = 1;
          this.selecFiltro = false;
          this.carga = false;
          this.selecFiltroAr = undefined;
          this.obtEmergencias(this.page);
          this.ScrollToTop();
        }else if(this.selecFiltroAr != null && this.selecFiltroAr != undefined && this.selecFiltroAr != ""){
          this.selecFiltro = true;
          this.page = 1;
          this.filtrarEmergencias(this.selecFiltroAr,this.page)
        }
      }
      
    });
    return await popover.present();
  }
  perfilEmergencia(em){
    if( this.fullUrl == undefined || this.fullUrl == null  || this.fullUrl == ""){
      this.fullUrl = '/tabs/tab1'
    }
    if(em.responsable == this.usuario.id){
      this._router.navigate(['perfil-emergencia',em._id,'EMR'], { queryParams: { returnUrl: this.fullUrl }});  
    }else{
      this._router.navigate(['perfil-emergencia',em._id,'EMA'], { queryParams: { returnUrl: this.fullUrl }});  
    }
  
    
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Perfil',
      message: 'Para publicar una emergencia es necesario que actualices tus datos personales',
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
  async presentModal() { 
    if(this.usuarioOb.telefono != "" && this.usuarioOb.telefono != null && this.usuarioOb.celular != "" && this.usuarioOb.celular != ""
    && this.usuarioOb.correoVerificado == true){
    const modal = await this.modalController.create({
      component: FormEmergenciaComponent,
      componentProps: {
        
      }
    });
    modal.onDidDismiss().then((detail) => {
      if (detail !== null) {
          if(detail.data == 'ok'){
            this.obtEmergencias(1)
          }
      }
   });
    return await modal.present();
  }else{
        this.presentAlert()

  }
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
