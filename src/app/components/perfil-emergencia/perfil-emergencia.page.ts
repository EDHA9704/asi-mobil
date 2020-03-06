import { Component, OnInit } from '@angular/core';
import {EmergenciaService} from '../../services/emergencia.service'
import {UsuarioService} from '../../services/usuario.service'
import { Storage } from '@ionic/storage';

import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';
import { LoadingController } from '@ionic/angular';
declare var google:any;

@Component({
  selector: 'app-perfil-emergencia',
  templateUrl: './perfil-emergencia.page.html',
  styleUrls: ['./perfil-emergencia.page.scss'],
  providers:[EmergenciaService,UsuarioService]
})
export class PerfilEmergenciaPage implements OnInit {
  public emergencia:any;
  public id;
  public url;
  public voluntariosAS=[]
  public voluntario:any;
  public usuario:any;
  public fab;
  public tipo:any;
  public fundacion:any;
  public voluntarios:any = []
  mp1 = false;
  mp2 = false
  map:any;
  mapHtml:any;
  contMap = 0
  markerActualUserLocation:any;
  donLatLng = {
    lat:Number,
    lng:Number
  }
  constructor(private _router:Router,private storage: Storage,private _usuarioService:UsuarioService,
    private _emergenciaService:EmergenciaService,private activeRoute:ActivatedRoute,private loadController:LoadingController) { 
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.tipo = this.activeRoute.snapshot.paramMap.get('tipo');

    this.url = GLOBAL.url;

  }

  async ngOnInit() {
    await this.obtenerStorageUser()
    this.obtenerEmergencia()
  }
  perfilFundacion(id){
    this._router.navigate(['perfil-fundacion',id]);       
  }
  obtenerEmergencia(){
    var voluntario = {
      voluntarioC:'',
      estadoD:''
    }
    this.voluntariosAS = []
    this._emergenciaService.obtEmergencia(this.id).subscribe(
      response=>{
        this.emergencia = response.emergencia;
        console.log(this.emergencia)
        if(this.emergencia.ayuda){
          let vl = this.emergencia.ayuda.voluntarios.filter(vl => vl.voluntarioId._id == this.usuario.id );
          this.voluntario = vl[0]
          let fecha = new Date( response.emergencia.responsable.fechaNacimiento)
          this.voluntarios = this.emergencia.ayuda.voluntarios.filter(vl => vl.aprobado == 2);
        this.emergencia.responsable.fechaNacimiento = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear()
          console.log(this.voluntario)
          if( this.emergencia.ayuda &&  this.emergencia.ayuda.fundacion){
            console.log(this.emergencia.ayuda.fundacion)
            this._usuarioService.obtFundacionSTD(this.emergencia.ayuda.fundacion).subscribe(
              response=>{
                this.fundacion = response.fundacion;
             
            console.log(response)
              },
              error=>{
                console.log(<any>error)
              }
            )

          }
         
          this.emergencia.ayuda.voluntarios.forEach(vol => {
           
            this._usuarioService.obtUsuario(vol.voluntarioId._id).subscribe(
              response=>{
                voluntario.voluntarioC = response.usuario;
                voluntario.estadoD = vol.aprobado
                this.voluntariosAS.push(voluntario)
                console.log(this.voluntariosAS)
              },
              error=>{
                console.log(<any>error)

              }
            )
          });

        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  tabChanged(event){
    
    if(event == 1){
      this.fab = 1;
      if(this.tipo == 'EMA'){
        this.mp1 = true;
        this.mp2 = false
        if(this.contMap == 0){
          this.contMap++
            this.loadMap('1')

        }
      }
      if(this.tipo == 'EMR' && !this.fundacion){
        this.mp1 = true;
        this.mp2 = false
        if(this.contMap == 0){
          this.contMap++
            this.loadMap('1')

        }
       }
    }else if(event == 2){
      this.fab = 2;
      if(this.tipo == 'EMR'){
        this.mp1 = false;
        this.mp2 = true
        if( this.contMap == 0){
          this.contMap++
            this.loadMap('2')
        }
       }
    }else{
      this.fab = 0;
    }
  }

  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
      
     });
   }

   aprobarNegar(op){
    this._emergenciaService.aprobarNegar(this.id,this.emergencia.ayuda.fundacion,op,this.usuario.token,this.emergencia).subscribe(

      response=>{
        this.obtenerEmergencia();
      },
      error=>{
        console.log(<any>error)
      }
    )
   }
   async loadMap(mp){
    const loading = await this.loadController.create()
    loading.present()
  // await this.currentLocationUser()

   const mapEle:HTMLElement = document.getElementById('map'+mp);
   this.mapHtml = mapEle;
   console.log("bien")
   this.donLatLng.lat = this.emergencia.direccion.latLng.lat
   this.donLatLng.lng = this.emergencia.direccion.latLng.lng
   console.log("bien2")
   console.log(this.donLatLng)
   this.map = new google.maps.Map(this.mapHtml,{
     center:this.donLatLng,
     zoom:12,
   })
   console.log("bien3")
   google.maps.event.addListenerOnce(this.map,'idle',()=>{
    loading.dismiss();
    console.log("bien4")
    this.putMarker(this.map,this.donLatLng,'Hello')
   })

  }
  putMarker(map,markerL,text){
   
      
    this.markerActualUserLocation = new google.maps.Marker({
      position:{
        lat:markerL.lat,
        lng:markerL.lng
      },
      draggable: false,
      zoom:8,
      map:map,
      title:text
    })
  
}
}
