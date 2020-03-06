import { Component, OnInit ,ViewChild} from '@angular/core';
import {NotificacionService} from '../services/notificacion.service'
import {GLOBAL} from '../services/global';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import {FiltrospopComponent} from '../components/filtrospop/filtrospop.component'
import { PopoverController, ToastController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ChangesService } from '../services/changes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[NotificacionService]
})
export class Tab3Page implements OnInit {
  public url;
  public usuario:any;
  public page
  public pages;
  public itemsPerPage;
  public total;
  public idU;
  public status;
  public carga;
  public notificaciones=[];

  @ViewChild(IonContent,{read:IonContent,static:false}) content: IonContent;
  public selecFiltro;
  public selecFiltroAr:any;
  constructor(public popoverController: PopoverController,private _notificacionService:NotificacionService,
    private nativeStorage: NativeStorage,private storage: Storage,
    public toastController: ToastController, private _changesService:ChangesService,private _router:Router) {
    this.page = 1;
    //this.status = false;
    this.carga == true;
    this.url = GLOBAL.url;
    this.selecFiltro = false;
  }
  doRefresh(event) {

    setTimeout(() => {
      this.page = 1;
      this.obtenerNotificaciones(this.page)
      event.target.complete();

    }, 500);
  }
  doRefresh2(event) {

    setTimeout(() => {
      this.page = 1;
      this.filtrarNotificaciones(this.selecFiltroAr,this.page)
      event.target.complete();

    }, 500);
  }
async ngOnInit(){ 
 
  await this.obtenerStorageUser()
  this.obtenerNotificaciones(this.page);
}
loadData(event) {
  this.status = false;

  setTimeout(() => {

    if(this.notificaciones.length != this.total){
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
loadData2(event) {
  this.status = false;

  setTimeout(() => {

    if(this.notificaciones.length != this.total){
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
async obtenerNotificaciones(page,adding=false){
  

  await this._notificacionService.obtNotificaciones(this.usuario.id,this.usuario.rol,page,this.usuario.token).subscribe(
    response=>{
      if(response.notificaciones){
        this.total = response.total;
        this.pages = response.pages;
        this.itemsPerPage = response.itemsPerPage;
        this._changesService.reloadNT()
        if(!adding){
  
          this.notificaciones = response.notificaciones;
          console.log(this.notificaciones)
          this.carga =false;
         }else{
           var arrayA = this.notificaciones;
           var arrayB = response.notificaciones;
           this.notificaciones = arrayA.concat(arrayB)
         }
      }
      
    },
    error=>{
      console.log(<any>error)
    }
  )
}
public noMore = false;
viewMore(){
  if(this.notificaciones.length == this.total){
    this.noMore = true;
  }else{
    this.page += 1;
  }

  this.obtenerNotificaciones(this.page,true)
}
public noMore2 = false;
viewMore2(){
  if(this.notificaciones.length == this.total){
    this.noMore2 = true;
  }else{
    this.page += 1;
  }

  this.filtrarNotificaciones(this.selecFiltroAr,this.page,true)
}
async obtenerStorageUser(){
 await this.storage.get('usuario').then((val) => {
    this.usuario=val;
 
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
filtrarNotificaciones(filtro,page,adding=false){
  this._notificacionService.filtroNoticacionesMB(filtro,page,this.usuario.token).subscribe(
    response=>{
      console.log(response)

      this.total = response.total;
      this.pages = response.pages;
      this.itemsPerPage = response.itemsPerPage;
    
     if(!adding){

      this.notificaciones = response.notificaciones;
      
     }else{
       var arrayA = this.notificaciones;
       var arrayB = response.notificaciones;
       this.notificaciones = arrayA.concat(arrayB)
     }
      this.carga = false;
     
    },
    error=>{
      this.carga = false;
      var errorMessage = <any>error;
      console.log(errorMessage)
      if(errorMessage != null && error.error.n == '2'){
      //this.statusMsc = true;
      this.notificaciones = []
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
   
    if(detail.data != null && detail.data != undefined){
      if(detail.data == 'trash'){
        this.page = 1;
        this.selecFiltro = false;
        this.carga = false;
        this.selecFiltroAr = undefined;
        this.obtenerNotificaciones(this.page);
        this.ScrollToTop();
      }else{
        this.selecFiltroAr = "";
        this.selecFiltroAr = detail.data;
        this.selecFiltro = true;
        this.page = 1;
        this.filtrarNotificaciones(this.selecFiltroAr,this.page)
      }
     
      
    }else{
      if(this.selecFiltroAr == null || this.selecFiltroAr == undefined || this.selecFiltroAr == ""){
        this.page = 1;
        this.selecFiltro = false;
        this.carga = false;
        this.selecFiltroAr = undefined;
        this.obtenerNotificaciones(this.page);
        this.ScrollToTop();
      }else if(this.selecFiltroAr != null && this.selecFiltroAr != undefined && this.selecFiltroAr != ""){
        this.selecFiltro = true;
        this.page = 1;
        this.filtrarNotificaciones(this.selecFiltroAr,this.page)
      }
    }
    
  });
  return await popover.present();
}
ScrollToTop(){
  this.content.scrollToTop(1500);
}

redirectPage(nt){
  if(nt.tipo == 1 || nt.tipo == 9 || nt.tipo == 10){
    this._router.navigate(['/perfil-adopcion',nt.adopcion]);        
  }else if(nt.tipo == 7 || nt.tipo == 5 || nt.tipo == 8 ){
    this._router.navigate(['/perfil-emergencia',nt.emergencia._id,'EMA']);       
  }else if(nt.tipo == 2 || nt.tipo == 16 || nt.tipo == 17 || nt.tipo == 18){
    this._router.navigate(['/perfil-emergencia',nt.emergencia._id,'EMR']); 
  }else if(nt.tipo == 3 || nt.tipo == 11 || nt.tipo == 12){
    this._router.navigate(['/perfil-donacion',nt.donacion._id,'DONR']); 
  }else if(nt.tipo == 13 || nt.tipo == 14){
    this._router.navigate(['/perfil-donacion',nt.donacion._id,'DONA']); 
  }else if(nt.tipo == 15){
    this._router.navigate(['/perfil-donacion',nt.donacion._id,'DONA']); 
  }
  this.cambiarEstado(nt._id)
}
cambiarEstado(id){
  this._notificacionService.changeEstado(id,this.usuario.token).subscribe(
    res=>{
      this._changesService.reloadNT()
      console.log(res)
      this.obtenerNotificaciones(1)
    },
    err=>{
      console.log(<any>err)
    }
  )
}

}
