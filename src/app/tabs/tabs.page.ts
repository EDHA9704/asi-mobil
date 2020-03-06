import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../services/notificacion.service';
import { Storage } from '@ionic/storage';
import { ChangesService } from '../services/changes.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  public countNotificaciones:any = 0
  public usuario:any;
  constructor(private notificacionService:NotificacionService,private menu: MenuController,private storage: Storage, private _changesService:ChangesService) {}
  ionViewWillEnter() {
    this.menu.enable(true, 'first');
  }
 async ngOnInit(){

    await this.obtenerStorageUser()
    this.menu.enable(true, 'first');
    this.estadisticasNotificaciones()
    this._changesService.reloadNotificacion.subscribe(isOpen => {
      console.log("reload")
    this.estadisticasNotificaciones()
    })
  }

  estadisticasNotificaciones(){
    this.notificacionService.statsNotificaciones(this.usuario.id,this.usuario.rol,this.usuario.token).subscribe(
      res=>{
        console.log(res)
        this.countNotificaciones = res.count
      },
      err=>{
        console.log(<any>err)
      }
    )
  }
  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
      
     });
   }
}
