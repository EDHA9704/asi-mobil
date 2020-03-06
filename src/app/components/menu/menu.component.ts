import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ModalController, NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {GLOBAL} from '../../services/global';
import {FormEmergenciaComponent} from'../form-emergencia/form-emergencia.component'
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ChangesService } from 'src/app/services/changes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{
  public usuario;
  public idsignal:any;
  public url
  public usuarioOb
  constructor(public modalController: ModalController,
    private storage: Storage,private menu: MenuController,
    private _router:Router,private _route:ActivatedRoute, 
    private _notificacionService:NotificacionService,private navCtrl: NavController,
    private _changesService:ChangesService,public alertController: AlertController,private usuarioService:UsuarioService) { 
    this.url = GLOBAL.url;

  }

 async ngOnInit() {
   await this.load()
    

  }
  ionViewDidLeave(){
    this._changesService.obtUser()
  }
 async load(){
  await this.obtenerStorageUser()
  await this.obtenerStorageSignal()
  if(this.usuario){
    this.obtenerUsuario()
  }
  
 }

  cerrarMenu(){

      this.menu.close('first');
  }
 logOut(){
   console.log("ENTRO LOGOUT")
   console.log(this.idsignal)

    if(this.idsignal != null && this.idsignal != ""){
      console.log("ENTRO LOGOUT 2")

      this._notificacionService.eliminarOneSignal(this.usuario.id,this.idsignal).subscribe(
        response=>{
          console.log(response)
          this.storage.clear()
          this.menu.close('first');
          this.navCtrl.navigateRoot(['inicio']); 

        },
        error=>{
          console.log(<any>error)
        }
      )

    }else{
      console.log("ENTRO SIN SINGAL")
      this.storage.clear()
          this.menu.close('first');
          this.navCtrl.navigateRoot(['inicio']); 
          //this._router.navigate(['inicio']); 
    }

    

  }
  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
   async obtenerStorageSignal(){
    await this.storage.get('idsignal').then((val) => {
       this.idsignal=val;
       console.log(this.idsignal)
     });
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
   editPerfil(){
    this.menu.close('first');
    this._router.navigate(['perfil',this.usuario.id]); 
   }
   async presentModal() {
    this.menu.close('first');
    if(this.usuarioOb.telefono != "" && this.usuarioOb.telefono != null && this.usuarioOb.celular != "" && this.usuarioOb.celular != ""
    && this.usuarioOb.correoVerificado == true){
    const modal = await this.modalController.create({
      component: FormEmergenciaComponent,
      componentProps: {
        
      }
    });

    return await modal.present();
  }else{

  }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Perfil',
      message: 'Para publicar una emergencia es necesario que actualices tus datos personales',
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
}
