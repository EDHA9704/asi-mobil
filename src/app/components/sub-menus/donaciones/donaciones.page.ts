import { Component, OnInit } from '@angular/core';
import { DonacionService } from 'src/app/services/donacion.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.page.html',
  styleUrls: ['./donaciones.page.scss'],
  providers:[DonacionService]
})
export class DonacionesPage implements OnInit {
  public donaciones:any;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public statusLength;
  public usuario:any;
  public carga;
  public status;
  public url;
  constructor(private _donacionService:DonacionService,private storage: Storage,public toastController: ToastController) { 
    this.page = 1;
    this.carga = false;
    this.url = GLOBAL.url;
  }

 async ngOnInit() {
  await this.obtenerStorageUser()
  this.obtenerDonaciones(this.page)
  }

  doRefresh(event) {
    this.donaciones=[]
    setTimeout(() => {
      this.page = 1;
      this.obtenerDonaciones(this.page)
      event.target.complete();

    }, 500);
  }
  loadData(event) {
   
    setTimeout(() => {

      if(this.donaciones.length != this.total){
        this.viewMore()
        this.statusLength = false;
      }else{
        this.statusLength = true;
      }
      
      event.target.complete();

    }, 500);
  }
  public noMore = false;
  viewMore(){
    if(this.donaciones.length == this.total){
      this.noMore = true;
    }else{
      this.page += 1;
    }

    this.obtenerDonaciones(this.page,true)
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
 obtenerDonaciones(page,adding=false){
    this._donacionService.obtDonacionAS(this.usuario.id,page).subscribe(
      response=>{
        console.log(response)
        if(response.n == '1'){
        
          this.carga = false;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
     
         if(!adding){

          this.donaciones = response.donaciones;
          let arrayTem = [];
          response.donaciones.forEach(e => {
            var estadoV = e.voluntarios.filter(vol => vol.voluntario == this.usuario.id );
            arrayTem.push({donacion:e,estadoVl:estadoV[0].estado})
            
          });
          this.donaciones = arrayTem
          console.log(this.donaciones)
          
         }else{
          var arrayA = this.donaciones;
          var arrayB = []
          response.donaciones.forEach(e => {
           var estadoV = e.voluntarios.filter(vol => vol.voluntario == this.usuario.id );
           arrayB.push({donacion:e,estadoVl:estadoV[0].estado})
           
         });
         
          
          this.donaciones = arrayA.concat(arrayB)
         
           
         }

        }else{
          
          this.presentToast('Intentalo nuevamente')

        }
      },
      error=>{
        console.log(<any>error)
        this.donaciones = []
        this.carga = false;
        var errorMessage = <any>error;
       
  
        if(errorMessage != null && error.error.n == '2'){
          this.status = true;
         }else{
           this.presentToast('Intentalo nuevamente')
 
         }
          
      }
    )
  }
}
