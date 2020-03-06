import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {
  public op;
  public selecFiltroAr:any;

  public aespecie = ["Canino","Felino"]
  public asexo = ["Macho","Hembra"]
  public atam = ["Grande","Mediano","Pequeño"]
  public aedad = ["Adulto","Joven","Cachorro"]
  public araza = ["Mestizo","American Bully","Aussiedoodle o aussiepoo","Azawakh","Boxer","Cavapoo o cavoodle", "Cavachon","Cockapoo","Chorkie","Chow Chow","Eurasier","Foxhound","Goldendoodle","Husky","Kelpie","Labrador","Morkie","Pitbull","Puggle","Rottweiler","Schnauzer","Schnoodle","Terrier","Yorkipoo"]
  public asector = ["Norte","Centro","Sur"]

  public anivel = ["Atención inmediata","Muy urgente","Urgente","Normal","No urgente"];
  public atipo = ["Mal estado de salud","Accidente","Preñada","Con cachorros","Maltrato","Abandono","Perdida/o"];
  especie = new FormControl('',[]);
  sexo = new FormControl('',[]);
  raza = new FormControl('', []);
  edad = new FormControl('', []);
  tamanio = new FormControl('',[]);
  sector = new FormControl('',[Validators.required]);
  nivelEmergencia = new FormControl('',);
  tipoEmergencia = new FormControl('',);
  constructor(public modalController: ModalController,navParams: NavParams) { 
    this.op = navParams.get('op');
    this.selecFiltroAr = navParams.get('filtro');
    console.log(this.selecFiltroAr)
    if(this.selecFiltroAr != undefined && this.selecFiltroAr != ""){
      this.llenarFil()
    }
    


  }

  ngOnInit() {}
  async myDismiss(result) {

    if(result == 'filtro'){

      
      var res;
      res = await  this.filtrar()
      result = res;
      await this.modalController.dismiss(result);
    }else if(result == 'trash'){
      this.especie.setValue("")
      this.sexo.setValue("")
      this.tamanio.setValue("")
      this.edad.setValue("")
      this.raza.setValue("")
      await this.modalController.dismiss(result);
    }else{
      await this.modalController.dismiss(result);
    }
    

  }

  filtrar(){

    if(this.op == 'msc'){
      var filtros = {
        especie:"",
        sexo:"",
        tamanio:"",
        edad:"",
        raza:""
      }
      filtros.especie = this.especie.value
      filtros.sexo = this.sexo.value
      filtros.tamanio = this.tamanio.value
      filtros.edad = this.edad.value
      filtros.raza = this.raza.value
  
      return filtros;
  
  
    }
    if(this.op == 'fund'){
      var filtros2 = {
        sector:""
      }
      filtros2.sector = this.sector.value
     
  
      return filtros2;
    }
    if(this.op == 'emer'){
      var filtros3 = {
        nivelEmergencia:"",
        tipoEmergencia:""
      }
      filtros3.nivelEmergencia = this.nivelEmergencia.value
      filtros3.tipoEmergencia = this.tipoEmergencia.value

  
      return filtros3;
    }
  }

  llenarFil(){
    if(this.op == 'msc'){
      if(this.selecFiltroAr.especie != ""){
        this.especie.setValue(this.selecFiltroAr.especie)
  
      }
      if(this.selecFiltroAr.sexo != ""){
        this.sexo.setValue(this.selecFiltroAr.sexo)
  
      }
      if(this.selecFiltroAr.raza != ""){
        this.raza.setValue(this.selecFiltroAr.raza)
  
      }
      if(this.selecFiltroAr.edad != ""){
        this.edad.setValue(this.selecFiltroAr.edad)
  
      }
      if(this.selecFiltroAr.tamanio != ""){
        this.tamanio.setValue(this.selecFiltroAr.tamanio)
  
      }
    }

    if(this.op == 'fund'){
      if(this.selecFiltroAr.sector != ""){
        this.sector.setValue(this.selecFiltroAr.sector)
  
      }
     

    }
    if(this.op == 'emer'){
      if(this.selecFiltroAr.nivelEmergencia != ""){
        this.nivelEmergencia.setValue(this.selecFiltroAr.nivelEmergencia)
  
      }
      if(this.selecFiltroAr.tipoEmergencia != ""){
        this.tipoEmergencia.setValue(this.selecFiltroAr.tipoEmergencia)
  
      }

    }
  }
}
