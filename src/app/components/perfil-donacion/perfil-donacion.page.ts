import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GLOBAL} from '../../services/global';
import { Storage } from '@ionic/storage';
import { DonacionService } from 'src/app/services/donacion.service';
import { LoadingController } from '@ionic/angular';
declare var google:any;
@Component({
  selector: 'app-perfil-donacion',
  templateUrl: './perfil-donacion.page.html',
  styleUrls: ['./perfil-donacion.page.scss'],
  providers:[DonacionService]
})
export class PerfilDonacionPage implements OnInit {
  public id:any;
  public url:any;
  public usuario:any;
  public voluntarios:any = []
  public fab;
  public donacion:any;
  public voluntario:any;
  
  public tipo;
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
  constructor(private _router:Router,private storage: Storage,
    private _donacionService:DonacionService,
    private activeRoute:ActivatedRoute,private loadController:LoadingController) { 
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.url = GLOBAL.url;
    this.tipo = this.activeRoute.snapshot.paramMap.get('tipo');

  }

  async ngOnInit() {
    await this.obtenerStorageUser()
    this.obtenerDonacion()
  }
  perfilFundacion(id){
    this._router.navigate(['perfil-fundacion',id]);       
  }
  tabChanged(event){
    
    if(event == 1){
      this.fab = 1;
      if(this.tipo == 'DONA'){
        this.mp1 = true;
        this.mp2 = false
        if( this.donacion.asignar && this.donacion.asignar == true && this.contMap == 0){
          this.contMap++
            this.loadMap('1')

        }
      }
    }else if(event == 2){
      this.fab = 2;
     if(this.tipo == 'DON'){
      this.mp1 = false;
      this.mp2 = true
      if( this.donacion.asignar && this.donacion.asignar == true && this.contMap == 0){
        this.contMap++
          this.loadMap('2')
      }
     }
      
    }else{
      this.fab = 0;
    }
  }
  obtenerDonacion(){
    this._donacionService.obtDonacion(this.id).subscribe(
      response=>{
     
        this.donacion = response.donacion;
        let fecha = new Date( response.donacion.donanteR.fechaNacimiento)
        let fechaFin = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear()
        console.log(fechaFin)
        this.donacion.donanteR.fechaNacimiento = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear()
        let vl = this.donacion.voluntarios.filter(vl => vl.voluntario._id == this.usuario.id );
        this.voluntarios = this.donacion.voluntarios.filter(vl => vl.estado == 2);
        console.log(vl)
        this.voluntario = vl[0];
console.log(this.voluntario)
        console.log(this.donacion)
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
   this.donLatLng.lat = this.donacion.direccion.latLng.lat
   this.donLatLng.lng = this.donacion.direccion.latLng.lng
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
  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
   aprobarNegar(op){
    this._donacionService.aprobarNegar(this.id,this.donacion.fundacion._id,op,this.usuario.token,this.donacion).subscribe(

      response=>{
        this.obtenerDonacion();
      },
      error=>{
        console.log(<any>error)
      }
    )
   }
}
