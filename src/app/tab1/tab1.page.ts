import { Component,OnInit,ViewChild, ElementRef ,Output,EventEmitter, NgZone} from '@angular/core';
import {
  Facebook,
  FacebookLoginResponse
}

  from '@ionic-native/facebook/ngx';

  import { NativeStorage } from '@ionic-native/native-storage/ngx';
  import {Router, ActivatedRoute, Params} from '@angular/router';
  import { IonInfiniteScroll, PopoverController, IonRefresher } from '@ionic/angular';
  import {MascotaService} from '../services/mascota.service'
  import { ToastController } from '@ionic/angular';
  import {GLOBAL} from '../services/global';
  import { MenuController } from '@ionic/angular';
  import { IonContent } from '@ionic/angular';
  import { ModalController } from '@ionic/angular';
  import { FiltrosComponent } from '../components/filtros/filtros.component';
  import {MatMenuTrigger} from '@angular/material';
  import {MatRadioChange,MatRadioButton} from '@angular/material'
  import {FiltrospopComponent} from '../components/filtrospop/filtrospop.component'

  import {LoadingController} from '@ionic/angular'
declare var $:any;
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers:[Facebook,MascotaService,FiltrosComponent]
})
export class Tab1Page implements OnInit {
  @ViewChild(IonContent,{read:IonContent,static:false}) content: IonContent;
  @Output()
  change: EventEmitter<MatRadioChange> 
  public aespecie: string[] = ["Canino","Felino"]
  public asexo = ["Macho","Hembra"]
  public atam = ["Grande","Mediano","Pequeño"]
  public aedad = ["Adulto","Joven","Cachorro"]
  public araza = ["Mestizo","American Bully","Aussiedoodle o aussiepoo","Azawakh","Boxer","Cavapoo o cavoodle", "Cavachon","Cockapoo","Chorkie","Chow Chow","Eurasier","Foxhound","Goldendoodle","Husky","Kelpie","Labrador","Morkie","Pitbull","Puggle","Rottweiler","Schnauzer","Schnoodle","Terrier","Yorkipoo"]
  public asector = ["Norte","Centro","Sur"]
  favoriteSeason: string;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  public nm;
  public apel;
  public im;
  public token;
  public status;
  public items =[];
  public status2;
  public carga;
  public tp;
  public sc;
  public pages;
  public itemsPerPage;
  public total;
  public mascotas=[];
  public page;
  public event:any;
  public url;
  public selecFiltro;
  public selecFiltroAr:any;
  public bkey;
  public statusMsc;
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
 
  constructor(public popoverController: PopoverController,
    public modalController: ModalController,private menu: MenuController,
    public toastController: ToastController,private _mascotaService:MascotaService, 
    private fb: Facebook,private nativeStorage: NativeStorage,
		private _route:ActivatedRoute,
    private _router:Router) {
      this.page = 1;
      this.status = false;
      this.url = GLOBAL.url;
      this.carga = true;
      this.statusMsc = false;
      this.selecFiltro = false;
      this.bkey = false;
     
    }



  doRefresh(event) {

    setTimeout(() => {
      this.page = 1;
      this.obtMascotas(this.page)
      event.target.complete();

    }, 500);
  }

  doRefresh2(event) {

    setTimeout(() => {
      this.page = 1;
      this.filtrarMascotas(this.selecFiltroAr,this.page)
      event.target.complete();

    }, 500);
  }
  doFbLogout(){
		this.fb.logout()
		.then(res =>{
			//user logged out so we will remove him from the NativeStorage
			this.nativeStorage.remove('facebook_user');
      this._router.navigate(['login']);
		}, error =>{
			console.log(error);
		});
  }
  
  ngOnInit(){
   
   
    this.nativeStorage.getItem('identity')
    .then(
    data => {
      
      this.nm = data.id;
      this.apel = data.apellidos;
      this.im = data.image;
    
    },
    error => console.log(<any>error)
  );
  this.nativeStorage.getItem('token')
  .then(
  data => {
    
    this.token = data.token;
    
  
  },
  error => console.log(<any>error)
);
this.obtMascotas(this.page)
  }
  ionViewWillEnter(){
    $("#headerM").removeClass('ocultar')
    $("#headerM").addClass('mostrar')
  }
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'top'
    });
    toast.present();
    
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
  loadData2(event) {
    this.status = false;

    setTimeout(() => {

      if(this.mascotas.length != this.total){
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
  async obtMascotas(page,adding=false){
    
    await this._mascotaService.obtMascotass(page).subscribe(
      response=>{
        
        if(response.mascotas && response.n == '1'){
          //this.fotos = response.fot;
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
         console.log(this.mascotas)
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
  public noMore2 = false;
  viewMore2(){
    if(this.mascotas.length == this.total){
      this.noMore2 = true;
    }else{
      this.page += 1;
    }

    this.filtrarMascotas(this.selecFiltroAr,this.page,true)
  }
  perfilMascota(id){
    this._router.navigate(['perfil-mascota',id]);       
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  logScrollStart(event){
  
  }
 
  logScrolling(event){

    if(event.detail.scrollTop > 50){

     // previous = event.detail.scrollTop;
      if(event.detail.deltaY > 0){
        console.log("entro delta>0 : "+event.detail.deltaY)
        $("#headerM").addClass('ocultar')
        $("#headerM").removeClass('mostrar')
      }else if(event.detail.deltaY < 0){
        console.log("entro delta<0 : "+event.detail.deltaY)
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
 
  logScrollEnd(){
  }
 
 ScrollToBottom(){
    this.content.scrollToBottom(1500);
  }
 
  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
 
  ScrollToPoint(X,Y){
    this.content.scrollToPoint(X,Y,1500);
  }
 /* toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }*/


async filtrarMascotas(filtro,page,adding=false){
  console.log("COMIENZA FILTRO")
  this._mascotaService.filtroMascotasMB(filtro,page).subscribe(
    response=>{
      this.statusMsc = false;

      this.total = response.total;
      this.pages = response.pages;
      this.itemsPerPage = response.itemsPerPage;
      console.log(response)
     if(!adding){
      this.mascotas = []
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
      this.carga = false;
     
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
eliminarFiltro(op){

  
    if(op == 'es'){
      this.selecFiltroAr.especie = ""
    }else if(op == 'sex'){
      this.selecFiltroAr.sexo = "" 
    }else if(op == 'tam'){
      this.selecFiltroAr.tamanio = ""
    }else if(op == 'raz'){
      this.selecFiltroAr.raza = ""
    }else if(op == 'edad'){
      this.selecFiltroAr.edad = ""
    }
  
    if(this.selecFiltroAr.especie == ''  && this.selecFiltroAr.sexo == '' && this.selecFiltroAr.edad == ''
    && this.selecFiltroAr.tamanio == ''
  ){
    this.page = 1;
    this.selecFiltro = false;
    this.carga = false;
    this.obtMascotas(this.page);
  }else{
    this.filtrarMascotas(this.selecFiltroAr,this.page)
  }

  
}
buscarMascotasName(name){
  this.mascotas = []
  this._mascotaService.obtMascotasByname(name).subscribe(
    response=>{
      if(response.n == '1' && response.mascotas){
        response.mascotas.forEach(ms => {
          var foto = ms.fotos.filter(ft => ft.estado == 'activo')
          this.mascotas.push({ms,foto})
        });
      }
    },
    error=>{
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
buscarKey(event){
  console.log(event)
    if(event.detail != null){
      if(event.detail.data == null){
        this.page = 1;
        this.bkey = false;
        this.obtMascotas(this.page)
      }else{
        this.bkey = true;
        this.selecFiltroAr = "";
        this.selecFiltro = false;
        
        var name = event.detail.data;
        var nameFin = nameFin + name;
        console.log(nameFin)
        this.buscarMascotasName(name);
      }
    }else{
      this.bkey = false;
      this.selecFiltroAr = "";
      this.selecFiltro = false;
      this.page = 1;
      this.obtMascotas(this.page)
     this.ScrollToTop()
    }
  
    
}
cancelBuscar(event){
  this.bkey = false;
  this.selecFiltroAr = "";
  this.selecFiltro = false;
  this.page = 1;
  this.obtMascotas(this.page)
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
   
    if(detail.data != null && detail.data != undefined){
      if(detail.data == 'trash'){
        this.page = 1;
        this.selecFiltro = false;
        this.carga = false;
        this.selecFiltroAr = undefined;
        this.obtMascotas(this.page);
        this.ScrollToTop();
      }else{
        this.selecFiltroAr = "";
        this.selecFiltroAr = detail.data;
        this.selecFiltro = true;
        this.page = 1;
        this.filtrarMascotas(this.selecFiltroAr,this.page)
      }
     
      
    }else{
      console.log(this.selecFiltroAr)
      if(this.selecFiltroAr == null || this.selecFiltroAr == undefined || this.selecFiltroAr == ""){
        this.page = 1;
        this.selecFiltro = false;
        this.carga = false;
        this.selecFiltroAr = undefined;
        this.obtMascotas(this.page);
        this.ScrollToTop();
      }else if(this.selecFiltroAr != null && this.selecFiltroAr != undefined && this.selecFiltroAr != ""){
        this.selecFiltro = true;
        this.page = 1;
        this.filtrarMascotas(this.selecFiltroAr,this.page)
      }
    }
    
  });
  return await popover.present();
}
}
