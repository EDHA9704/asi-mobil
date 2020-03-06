import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IniGuard implements CanLoad {
  public usuario;
  constructor(private storage: Storage,private _router:Router,private navCtrl: NavController){
    
  }
 async canLoad(){
   console.log("ENTRO ini")
   await this.obtenerStorageUser()
    if(this.usuario != null && this.usuario != "" && this.usuario != undefined){

      this.navCtrl.navigateRoot(['tabs']); 
     
    }else{
      return true
    }
    
  }

  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
}
