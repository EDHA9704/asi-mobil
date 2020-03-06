import { Component, OnInit } from '@angular/core';
import {AdopcionService} from '../../../services/adopcion.service'
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.page.html',
  styleUrls: ['./adopciones.page.scss'],
  providers:[AdopcionService]
})
export class AdopcionesPage implements OnInit {
  public adopciones=[];
  public usuario:any;
  public url;
  public carga;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public status;
  public statusLength;
  constructor(private _adopcionService:AdopcionService,private storage: Storage,public toastController: ToastController) { 
    this.carga = true;
    this.page = 1;
    this.url = GLOBAL.url;
    this.status = false;
    this.statusLength = false;
  }

 async ngOnInit() {
  await this.obtenerStorageUser()
  this.obtenerAdopciones(this.page)
  }
  doRefresh(event) {
    this.adopciones=[]
    setTimeout(() => {
      this.page = 1;
      this.obtenerAdopciones(this.page)
      event.target.complete();

    }, 500);
  }
  loadData(event) {
   
    setTimeout(() => {

      if(this.adopciones.length != this.total){
        this.viewMore()
      }else{
        this.statusLength = true;
      }
      
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      /*if (data.length == 1000) {
        event.target.disabled = true;
      }*/
    }, 500);
  }
  public noMore = false;
  viewMore(){
    if(this.adopciones.length == this.total){
      this.noMore = true;
    }else{
      this.page += 1;
    }

    this.obtenerAdopciones(this.page,true)
  }
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    
  }
  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
 obtenerAdopciones(page,adding=false){
    this._adopcionService.obtenerAdopciones(this.usuario.id,page,this.usuario.token).subscribe(
      response=>{
        
        if(response.adopciones && response.n == '1'){
        
          this.carga = false;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
     
         if(!adding){

          
          response.adopciones.forEach(m => {
            var fto = m.mascota.fotos.filter(photo => photo.estado == 'activo' );
            this.adopciones.push({photo:fto[0].name,adopcion:m})
          });
          console.log(this.adopciones)
          
         }else{
           var arrayA = this.adopciones;
           var arrayB = [];
           response.adopciones.forEach(m => {
            var fto = m.mascota.fotos.filter(photo => photo.estado == 'activo' );
            arrayB.push({photo:fto[0].name,adopcion:m})
          });
           this.adopciones = arrayA.concat(arrayB)
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
          this.status = true;
         }else{
           this.presentToast('Intentalo nuevamente')
 
         }
          
      }
    )
  }
}
