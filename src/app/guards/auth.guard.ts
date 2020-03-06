import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad {
  public usuario;
  constructor(private storage: Storage,private _router:Router,private navCtrl: NavController){
    
  }
 async canLoad(){
   console.log("ENTRO")
   await this.obtenerStorageUser()
    if(this.usuario != null && this.usuario != "" && this.usuario != undefined){
      return true
    }else{
      this.navCtrl.navigateRoot(['inicio']); 
     
    }
    
  }

  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
}
