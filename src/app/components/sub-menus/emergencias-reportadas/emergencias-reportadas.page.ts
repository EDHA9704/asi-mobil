import { Component, OnInit } from '@angular/core';
import {EmergenciaService} from '../../../services/emergencia.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'app-emergencias-reportadas',
  templateUrl: './emergencias-reportadas.page.html',
  styleUrls: ['./emergencias-reportadas.page.scss'],
  providers:[EmergenciaService]
})
export class EmergenciasReportadasPage implements OnInit {
  public usuario;
  public emergencias;
  public carga;
  public total;
  public itemsPerPage;
  public pages;
  public page;
  public status;
  public statusLength;
  public url;
  constructor(private storage: Storage,private _emergenciaService:EmergenciaService,public toastController: ToastController) { 
    this.carga = true;
    this.page = 1;
    this.url = GLOBAL.url;

  }


  async ngOnInit() {
    await this.obtenerStorageUser();
    this.obtEmergencias(this.page);
  }
  doRefresh(event) {
 
    setTimeout(() => {
      this.page = 1;
      this.obtEmergencias(this.page)
      event.target.complete();

    }, 500);
  }
  loadData(event) {
   
    setTimeout(() => {

      if(this.emergencias.length != this.total){
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
    if(this.emergencias.length == this.total){
      this.noMore = true;
    }else{
      this.page += 1;
    }

    this.obtEmergencias(this.page,true)
  }
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    
  }
  obtEmergencias(page,adding=false){
    this._emergenciaService.obtEmergenciasRP(this.usuario.id,page).subscribe(
      response=>{
        
        if(response.emergencias && response.n == '1'){
        
          this.carga = false;
          this.status = false;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
     
         if(!adding){

          this.emergencias = response.emergencias
          console.log(this.emergencias)
       
         }else{
           var arrayA = this.emergencias;
           var arrayB = response.emergencias;
           
           this.emergencias = arrayA.concat(arrayB)
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
  async obtenerStorageUser(){
    await this.storage.get('usuario').then((val) => {
       this.usuario=val;
       console.log(this.usuario)
     });
   }
}
