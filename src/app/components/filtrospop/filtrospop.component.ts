import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';
import {MatRadioChange,MatRadioButton} from '@angular/material'

@Component({
  selector: 'app-filtrospop',
  templateUrl: './filtrospop.component.html',
  styleUrls: ['./filtrospop.component.scss'],
})
export class FiltrospopComponent implements OnInit {
  @Output()
  change: EventEmitter<MatRadioChange> 
  public op;
  public selecFiltroAr:any;

  public aespecie = ["Canino","Felino"]
  public asexo = ["Macho","Hembra"]
  public atam = ["Grande","Mediano","Pequeño"]
  public aedad = ["Adulto","Joven","Cachorro"]
  public asector = ["Norte","Centro","Sur"]
  public anotificacion = ["Emergencia","Adopción","Donación"]

  public aasingr = ["Asignadas","Reportadas"];
  public atipo = ["Mal estado de salud","Accidente","Preñada","Con cachorros","Maltrato","Abandono","Perdida/o"];
  especie = new FormControl('',[]);
  sexo = new FormControl('',[]);
  raza = new FormControl('', []);
  edad = new FormControl('', []);
  tamanio = new FormControl('',[]);
  sector = new FormControl('',[Validators.required]);
  nivelEmergencia = new FormControl('',[]);
  tipoEmergencia = new FormControl('',[]);
  asingRepor = new FormControl('',[]);
  tipoNotiDonacion = new FormControl('',[]);

  constructor(public popoverController: PopoverController,navParams: NavParams) {
    this.op = navParams.get('op');
    this.selecFiltroAr = navParams.get('filtro');
    if(this.selecFiltroAr != undefined && this.selecFiltroAr != ""){
      this.llenarFil()
    }
   }

  ngOnInit() {}

 async filtrar(){

    if(this.op == 'msc'){
      var filtros = {
        especie:"",
        sexo:"",
        tamanio:"",
        edad:""
       
      }
      filtros.especie = this.especie.value
      filtros.sexo = this.sexo.value
      filtros.tamanio = this.tamanio.value
      filtros.edad = this.edad.value
    
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
        asingRepor:"",
        tipoEmergencia:""
      }
      filtros3.asingRepor = this.asingRepor.value
      filtros3.tipoEmergencia = this.tipoEmergencia.value

  
      return filtros3;
    }
    if(this.op == 'noti'){
      var filtros4 = {
        tipoNotiDonacion:""
      }
      filtros4.tipoNotiDonacion = this.tipoNotiDonacion.value
      return filtros4;
    }
  }
  async myDismiss(result) {

    if(result == 'filtro'){
      var res;
      res = await  this.filtrar()
      result = res;
      await this.popoverController.dismiss(result);
    }else if(result == 'trash'){
      this.especie.setValue("")
      this.sexo.setValue("")
      this.tamanio.setValue("")
      this.edad.setValue("")
      this.raza.setValue("")
      this.sector.setValue("")
      this.tipoEmergencia.setValue("")
      this.asingRepor.setValue("")
      await this.popoverController.dismiss(result);
    }else{
      await this.popoverController.dismiss(result);
    }
    

  }
 async onChangeEspecie(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.especie.setValue(mrChange.value)
    this.myDismiss('filtro') 
  } 
async onChangeSexo(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.sexo.setValue(mrChange.value)
    this.myDismiss('filtro') 
  } 
async onChangeTam(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.tamanio.setValue(mrChange.value)
    this.myDismiss('filtro') 
  } 
async onChangeEdad(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.edad.setValue(mrChange.value)
    this.myDismiss('filtro') 
  }
async onChangeSector(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.sector.setValue(mrChange.value)
    this.myDismiss('filtro') 
  }
  async onChangeAsingRepor(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.asingRepor.setValue(mrChange.value)
    this.myDismiss('filtro') 
  }
  async onChangeTipoEmergencia(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.tipoEmergencia.setValue(mrChange.value)
    this.myDismiss('filtro') 
  }
  async onChangeNoti(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.tipoNotiDonacion.setValue(mrChange.value)
    this.myDismiss('filtro') 
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
      if(this.selecFiltroAr.asingRepor != ""){
        this.asingRepor.setValue(this.selecFiltroAr.asingRepor)
  
      }
      if(this.selecFiltroAr.tipoEmergencia != ""){
        this.tipoEmergencia.setValue(this.selecFiltroAr.tipoEmergencia)
  
      }

    }
    if(this.op == 'noti'){
      if(this.selecFiltroAr.tipoNotiDonacion != ""){
        this.tipoNotiDonacion.setValue(this.selecFiltroAr.tipoNotiDonacion)
  
      }
      

    }
  }

}
