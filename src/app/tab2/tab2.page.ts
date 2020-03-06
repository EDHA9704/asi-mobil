import { Component,OnInit,ViewChild } from '@angular/core';
import {
  Facebook,
  FacebookLoginResponse
}
  from '@ionic-native/facebook/ngx';
  import { NativeStorage } from '@ionic-native/native-storage/ngx';
  import {Router, ActivatedRoute, Params} from '@angular/router';
  import { IonInfiniteScroll, PopoverController } from '@ionic/angular';
  import {UsuarioService} from '../services/usuario.service'
  import { ToastController } from '@ionic/angular';
  import {GLOBAL} from '../services/global';
  import { IonContent } from '@ionic/angular';
  import { FiltrosComponent } from '../components/filtros/filtros.component';
  import { ModalController } from '@ionic/angular';
  import {FiltrospopComponent} from '../components/filtrospop/filtrospop.component'
  declare var $:any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers:[Facebook,UsuarioService,FiltrosComponent]
})
export class Tab2Page implements OnInit {
  @ViewChild(IonContent,{read:IonContent,static:false}) content: IonContent;
  public nm;
  public apel;
  public im;
  public token;
  public status;
  public items =[];
  public status2;

  public pages;
  public itemsPerPage;
  public total;
  public fundaciones=[];
  public page;
  public event:any;
  public url;
  public selecFiltro;
  public selecFiltroAr:any;
  public bkey;
  public statusMsc;
  public carga;
  public tp;
  public sc;
  constructor(public popoverController: PopoverController,public modalController: ModalController,public toastController: ToastController,private _usuarioService:UsuarioService, private fb: Facebook,private nativeStorage: NativeStorage,
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
        this.obtFundaciones(this.page)
        event.target.complete();
  
      }, 500);
    }
    doRefresh2(event) {

      setTimeout(() => {
        this.page = 1;
        this.filtrarFundaciones(this.selecFiltroAr,this.page)
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
      $("#headerM").removeClass('ocultar')
      $("#headerM").addClass('mostrar')
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
  this.obtFundaciones(this.page)
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
  
        if(this.fundaciones.length != this.total){
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
  
        if(this.fundaciones.length != this.total){
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
    async obtFundaciones(page,adding=false){
      let rol = 4;
      await this._usuarioService.obtUsuariosRol(page,rol).subscribe(
        response=>{
          
          if(response.usuarios && response.n == '1'){
            //this.fotos = response.fot;
            this.total = response.total;
            this.pages = response.pages;
            this.itemsPerPage = response.itemsPerPage;
            this.statusMsc = false;

          this.carga = false;
            console.log(this.total)
           /* if(page > this.pages){
              this._router.navigate[('/login')]
            }*/
           if(!adding){
  
            this.fundaciones = response.usuarios;
  
           }else{
             var arrayA = this.fundaciones;
             var arrayB = response.usuarios;
             this.fundaciones = arrayA.concat(arrayB)
           }
  
          }else{
            
            this.presentToast('Intentalo nuevamente')
  
          }
        },
        error=>{
          this.carga = false;
          var errorMessage = <any>error;
          console.log(errorMessage)
          this.presentToast('Intentalo nuevamente')
  
          if(errorMessage != null && error.error.n == '2'){
            
          }else if(errorMessage != null && error.error.n == '3'){
            
          }else{
            
          }
        }
      )
  
    }
    public noMore = false;
    viewMore(){
      if(this.fundaciones.length == this.total){
        this.noMore = true;
      }else{
        this.page += 1;
      }
  
      this.obtFundaciones(this.page,true)
    }
    public noMore2 = false;
    viewMore2(){
      if(this.fundaciones.length == this.total){
        this.noMore2 = true;
      }else{
        this.page += 1;
      }
  
      this.filtrarFundaciones(this.selecFiltroAr,this.page,true)
    }
    perfilFundacion(id){
      this._router.navigate(['perfil-fundacion',id]);       
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
            this.obtFundaciones(this.page);
            this.ScrollToTop();
          }else{
            this.selecFiltroAr = "";
            this.selecFiltroAr = detail.data;
            this.selecFiltro = true;
            this.page = 1;
            this.filtrarFundaciones(this.selecFiltroAr,this.page)
          }
         
          
        }else{
          console.log(this.selecFiltroAr)
          if(this.selecFiltroAr == null || this.selecFiltroAr == undefined || this.selecFiltroAr == ""){
            this.page = 1;
            this.selecFiltro = false;
            this.carga = false;
            this.selecFiltroAr = undefined;
            this.obtFundaciones(this.page);
            this.ScrollToTop();
          }else if(this.selecFiltroAr != null && this.selecFiltroAr != undefined && this.selecFiltroAr != ""){
            this.selecFiltro = true;
            this.page = 1;
            this.filtrarFundaciones(this.selecFiltroAr,this.page)
          }
        }
        
      });
      return await popover.present();
    }
/*--MODAL PARA FILTROS---*/
/*async presentModal(op) {
  this.selecFiltro = false;
  this.bkey = false;
  this.carga = true;
  const modal = await this.modalController.create({
    component: FiltrosComponent,
    componentProps: {
      'op': op,
      'filtro':this.selecFiltroAr
    }
  });
  modal.onDidDismiss().then((detail) => {
    if (detail !== null) {
        if(detail.data == 'trash'){
          this.page = 1;
          this.selecFiltro = false;
          this.carga = false;
          this.selecFiltroAr = undefined;
          this.obtFundaciones(this.page);
          this.ScrollToTop();
        }else if(detail.data == 'sc'){
          this.carga = false;
        }else{
          this.selecFiltroAr = "";
          this.selecFiltroAr = detail.data;
          this.selecFiltro = true;
          this.page = 1;
          console.log(this.selecFiltroAr)
          this.filtrarFundaciones(this.selecFiltroAr,this.page)
        }
    }
 });
  return await modal.present();
}*/
filtrarFundaciones(filtro,page,adding=false){
  this._usuarioService.filtroFundacionesMB(filtro,page).subscribe(
    response=>{
      console.log(response)
      this.statusMsc = false;

      this.total = response.total;
      this.pages = response.pages;
      this.itemsPerPage = response.itemsPerPage;
    
     if(!adding){

      this.fundaciones = response.fundaciones;
      
     }else{
       var arrayA = this.fundaciones;
       var arrayB = response.fundaciones;
       this.fundaciones = arrayA.concat(arrayB)
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

  
    if(op == 'sec'){
      this.selecFiltroAr.sector = ""
    }
  
    if(this.selecFiltroAr.sector == ''
  ){
    this.page = 1;
    this.selecFiltro = false;
    this.carga = false;
    this.obtFundaciones(this.page);
  }else{
    this.filtrarFundaciones(this.selecFiltroAr,this.page)
  }

  
}
buscarFundacionesName(name){

  this._usuarioService.obtFundacionesByname(name).subscribe(
    response=>{
      if(response.n == '1' && response.fundaciones){
        this.fundaciones = response.fundaciones;
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
        this.obtFundaciones(this.page)
      }else{
        this.bkey = true;
        this.selecFiltroAr = "";
        this.selecFiltro = false;
        var name = event.detail.data;
        this.buscarFundacionesName(name);
      }
    }else{
      this.bkey = false;
      this.selecFiltroAr = "";
      this.selecFiltro = false;
      this.page = 1;
      this.obtFundaciones(this.page)
      this.ScrollToTop()
    }
  
    
}
cancelBuscar(event){
  
}


ionViewWillEnter(){
 
}



    logScrollStart(event){
  
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
}
