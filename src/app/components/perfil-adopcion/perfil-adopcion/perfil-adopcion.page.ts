import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {AdopcionService} from '../../../services/adopcion.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil-adopcion',
  templateUrl: './perfil-adopcion.page.html',
  styleUrls: ['./perfil-adopcion.page.scss'],
  providers:[AdopcionService]
})
export class PerfilAdopcionPage implements OnInit {
  public adopcion:any;
  public id;
  public url;
  public usuario:any;
  public fab;
  public image:any;
  constructor(private storage: Storage,private _adopcionService:AdopcionService,private activeRoute:ActivatedRoute,
    private _router:Router) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    this.url = GLOBAL.url;
   }

  async ngOnInit() {
    await this.obtenerStorageUser();
    this.obtenerAdopcion();
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
  obtenerAdopcion(){
    this._adopcionService.obtAdopcion(this.id,this.usuario.token).subscribe(
      response=>{
        this.adopcion = response.adopcion;
        this.image = this.adopcion.mascota.fotos.filter(photo => photo.estado == 'activo' );
        console.log(this.adopcion)
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
   perfilFundacion(id){
    this._router.navigate(['perfil-fundacion',id]);       
  }
  perfilMascota(id){
    this._router.navigate(['perfil-mascota',id]);       
  }
}
