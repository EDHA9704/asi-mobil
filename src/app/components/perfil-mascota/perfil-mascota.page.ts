import { Component, OnInit } from '@angular/core';
import {trigger,keyframes,animate,transition} from '@angular/animations';
import { MatCardModule,MatButtonModule } from '@angular/material'
import {ActivatedRoute, Router} from '@angular/router';
import {MascotaService} from "../../services/mascota.service"
import {UsuarioService} from "../../services/usuario.service"
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {GLOBAL} from '../../services/global';
import { ModalController } from '@ionic/angular';
import { ProcesoAdopcionPage } from '../../components/proceso-adopcion/proceso-adopcion.page';

import * as $ from 'jquery'
import Swiper from 'swiper';
import * as kf from './keyframes'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx'
@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.page.html',
  styleUrls: ['./perfil-mascota.page.scss'],
  providers:[MascotaService],
  animations:[
    trigger('cardAnimator',[
     // transition('* => wobble', animate(1000,keyframes(kf.wobble))),
      transition('* => swing', animate(1000,keyframes(kf.swing))),
     // transition('* => jello', animate(1000,keyframes(kf.jello))),
     // transition('* => zoomOutRight', animate(1000,keyframes(kf.zoomOutRight))),
     // transition('* => slideOutLeft', animate(1000,keyframes(kf.slideOutLeft))),
      //transition('* => rotateOutUpRight', animate(1000,keyframes(kf.rotateOutUpRight))),
     // transition('* => fliOutY', animate(1000,keyframes(kf.fliOutY)))



    ])
  ]
})
export class PerfilMascotaPage implements OnInit {
  slidesOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;
  
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
  
           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
  
           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
  
           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
  
           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
           $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }
  
         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }
  public usuarioOb:any;
  animationState:string;
  public id;
  public mscDes;
  panelOpenState = false;
  public usuario:any;
  public mascota:any;
  public url;
  public identity;
  public idVer;
  public token;
  public validAdop;
  public validAdop2;
  public vadopcion:any;
  public prinPhoto;
  public fab;
  startAnimation(state){
    console.log(state);
    if(!this.animationState){
      this.animationState = state;
    }
  }
  resetAnimationState(state){
      this.animationState = '';
    
  }
  constructor(private photoViewer: PhotoViewer,public toastController: ToastController,
    private storage: Storage,public modalController: ModalController,
    private activeRoute:ActivatedRoute,private _mascotaService:MascotaService,
    public alertController: AlertController,private usuarioService:UsuarioService,private _router:Router) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.swiperCard();
    this.url = GLOBAL.url;
    this.mscDes = false;
   
   }
 async ionViewDidEnter(){
  await this.obtenerStorageUser()
  this.obtenerUsuario()
 }
  async ngOnInit() {
   await this.obtenerStorageUser()
   this.obtenerUsuario()
   this.swiperCard()
   this.obtenerMascota(this.id)
   $(document).ready(()=>{
    console.log( this.panelOpenState );
      });
  }

  prub(op){
    console.log(op)
    if(op == true){
      $("#mat-expansion-panel-header-1").addClass('lock')
      $("#panelTitle").addClass('lock2')
    }else{
      $("#mat-expansion-panel-header-1").removeClass('lock')
      $("#panelTitle").removeClass('lock2')
    }
  }
  viewPicture(img){
    this.photoViewer.show('http://192.168.1.7:3800/api/obtener-foto-mascota/'+img);
  }
  tabChanged(event){
  
    if(event == 1){
      this.fab = 1;

    }else if(event == 2){
      this.fab = 2;
    }else{
      this.fab = 0;
    }
  }
  logScrollEnd(){
    //console.log("okey")
  }
  logScrolling(event){
    /*console.log(event.detail.scrollTop)
    if(event.detail.scrollTop > 191){
      
     
    }else{
      $(".mat-tab-header").removeClass('topPr')
    }*/

  }

  ki(){
    //console.log($("#msc").scrollTop())
  }
  getContent() {
    return document.querySelector('ion-content');
  }
  swiperCard(){
    $(document).ready(function () {
      var swiper = new Swiper('.swiper-container', {
       effect: 'cube',
       grabCursor: true,
       cubeEffect: {
         shadow: true,
         slideShadows: true,
         shadowOffset: 20,
         shadowScale: 0.94,
       },
       pagination: {
         el: '.swiper-pagination',
         type: 'progressbar',
       },
     });
   });
  }
  obtenerMascota(id){
    this._mascotaService.obtMascota(id).subscribe(
      response=>{
        console.log(response);
        this.mascota = response.mascota;
        this.prinPhoto = this.mascota.fotos.filter(ft => ft.estado == 'activo')
        
        this.comprobarAdopcion(this.usuario.id)
        this.swiperCard()
      },
      error=>{
        console.log(error)

      }
    )
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    var op = ev.detail.value;
    if(op == "desc"){
      $(".mascota-desc").fadeIn('slow')
      $(".mascota-options").fadeOut('fast')
      $(".mascota-vacunas").fadeOut('fast')

     

    }else if(op == "info"){
      $("#desc").removeClass('segment-button-checked')
      $(".mascota-desc").fadeOut('fast')
      $(".mascota-options").fadeIn('slow')
      $(".mascota-options").addClass('visib')
      $(".mascota-vacunas").fadeOut('fast')
    }else{
      $("#desc").removeClass('segment-button-checked')

      $(".mascota-desc").fadeOut('fast')
      $(".mascota-options").fadeOut('fast')
      $(".mascota-vacunas").fadeIn('slow')
      $(".mascota-vacunas").addClass('visib')

    }
  }
  async presentModal(id) {
    if(this.usuarioOb.telefono != "" && this.usuarioOb.telefono != null && this.usuarioOb.celular != "" && this.usuarioOb.celular != ""
    && this.usuarioOb.correoVerificado == true){
      const modal = await this.modalController.create({
        component: ProcesoAdopcionPage,
        componentProps: {
          'id': id,
        }
      });
      modal.onDidDismiss().then((detail) => {
        if (detail !== null) {
          if(detail.data == 'ok'){
            this.comprobarAdopcion(this.usuario.id)
            this.obtenerMascota(this.id)
            this.validAdop = false; 
            
          }
        }
     });
      return await modal.present();
    }else{
      this.presentAlert()
    }
   
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Perfil',
      message: 'Para adoptar es necesario que actualices tus datos personales',
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

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'top'
    });
    toast.present();
    
  }
  comprobarAdopcion(id){
    this._mascotaService.comprobarAdopcion(id,this.id).subscribe(
      response=>{
        if(response.n == '1'){
          
          this.validAdop = false;
   
          this.vadopcion = response.adopcion;
        }else if(response.n == '2'){
          this.validAdop = true;
        }
      },
      error=>{
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

   mostrarDesc(op){
     if(op == 'vs'){
      $("#descHead").addClass('visibleDesc');
      this.mscDes = true;
     }else{
      $("#descHead").removeClass('visibleDesc');
      this.mscDes = false;
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
