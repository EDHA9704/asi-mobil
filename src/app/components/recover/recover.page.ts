import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioFundacion } from 'src/app/models/usuarioFundacion';
import { Codigo } from 'src/app/models/codigo';
import { MatStepper, MatDialog } from '@angular/material';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioRecover } from 'src/app/models/usuarioRecover';
import { Mail } from 'src/app/models/mail copy';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {DialogloginComponent} from '../dialoglogin/dialoglogin.component'

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public threeFormGroup: FormGroup;
  public mail:Mail;
  public vall;
  public vallE;

  public vall2;
  public vallE2;
  public vall3;
  public vallE3;

  public mensaje;
  public mensaje2;

  public user:UsuarioRecover;
  public codi:Codigo;
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  totalStepsCount: number;
  public isLinear;
  constructor(private _formBuilder: FormBuilder, private _usuarioService:UsuarioService,
    public toastController: ToastController,private _router:Router,public dialog: MatDialog) {
    this.isLinear = true;
    this.vall = null;
    this.vallE = null;
    this.vall2 = null;
    this.vallE2 = null;

    this.vall3 = null;
    this.vallE3 = null;

    this.user = new UsuarioRecover("","","","")
    this.codi = new Codigo("","","","","","")
   }

  ngOnInit() {
    this.forms()
  }
  ionViewDidEnter() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  
  forms(){
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      codigo: ['', [Validators.required,Validators.pattern('[0-9]{4}')]]
    });
    this.threeFormGroup = this._formBuilder.group({
      password: ['', [Validators.required,Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]]
    });
  }
  validarCorreo(stepper: MatStepper){
    this.user = new UsuarioRecover("","","","")
      var usuario = this.firstFormGroup.value;
      this._usuarioService.obtUsuarioCorreo(usuario).subscribe(
        response=>{
          console.log(response)
          if(response.usuario && response.n == '1' && response.usuario.tipo && response.usuario.tipo == 'nr'){
  
            this.user._id = response.usuario._id;
            this.user.correo = response.usuario.correo;
            this.user.fullname = response.usuario.nombres +' '+response.usuario.apellidos;
            
            this.enviarCodigoRecover(stepper);
          }else{
            this.openDialog()
          }
          
        },
        error =>{
          this.openDialog()
          var errorMessage = <any>error;
          console.log(error)
          if(error.error.n == '2' ){
            this.vall = false;
            //this.mensaje = 'No existe una cuenta asociada al correo electrónico.'
          }else{
            this.vall = false;
           // this.mensaje = 'Algo salió mal, intentalo mas tarde...'
          
          }
  
        }
      )
      
  
     }
     openDialog(): void {
      var titulo = 'No se encuentra la cuenta'
      var msj = 'Los datos ingresados no coincide con ningún contacto existente. Si no tienes cuenta en ASI, puedes crear una ahora.'
      const dialogRef = this.dialog.open(DialogloginComponent, {
        width: '330px',
        data: {tipo:'lg',titulo: titulo, msj:msj}
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       
      });
    }
  
  enviarCodigoRecover(stepper: MatStepper){
    this.mail = new Mail("","","","")
    this.mail.asunto = "VMB";
    this.mail.usuario = this.user.fullname
    this.mail.correo = this.user.correo

    this._usuarioService.enviarCodigo(this.mail).subscribe(
      res=>{
        console.log(res)
        if(res.n == '3'){
          this.vall = true;
          this.codi = res.codigo;
            setTimeout(() => {           // or do some API calls/ Async events
              stepper.next();
              this.vallE = true;
             }, 1);
         
         }else if(res.n == '1'){
         console.log('llena campos')
           
         }else{
          console.log('intentalo de nuevo')
         }
       
  
  
      },
      error=>{
        var errorMessage = <any>error;
  
        console.log(<any>error)
          this.vall = false;
          this.mensaje = 'Algo salió mal, intentalo mas tarde...'
        
  
      }
    )
  }
  

  validarCodigo(stepper: MatStepper){
    var codiV = this.secondFormGroup.value;
   
    this._usuarioService.verificarCodigo(this.user.correo,codiV.codigo,'recover').subscribe(
      response=>{
        console.log(response)
        this.vall2 = true;
        this.eliminarCodigo(stepper)
        this.presentToast('Código correcto')
          setTimeout(() => {           // or do some API calls/ Async events
            stepper.next();
            this.vallE2 = true;
           }, 1);
      },
      error=>{
        console.log(<any>error)
        this.presentToast('Código incorrecto')
        this.vall2 = false;
      }
    )
  }
  eliminarCodigo(stepper: MatStepper){
   
    this._usuarioService.eliminarCodigo(this.codi._id).subscribe(
      response=>{
        if(response.n == '1'){
          
  
        }
      },
      error=>{
        var errorMessage = <any>error;
  
        console.log(<any>error)
        this.vall2 = false;
        this.mensaje2 = 'Algo salió mal, intentalo mas tarde...'
      }
    )
  }

  eliminarCodigoPrev(stepper: MatStepper){
    this._usuarioService.eliminarCodigo(this.codi._id).subscribe(
      response=>{
        if(response.n == '1'){
          
          this.vallE = null;
          this.vall2 = null;
          this.vallE2 = null;
          this.vall = null;
          //this.vallE = null;
          this.vall3 = null;
          this.vallE3 = null;
          this.codi = null;
          this.user = null;
        
          setTimeout(() => {           // or do some API calls/ Async events
            stepper.selectedIndex = 0;
           }, 2);
         
  
  
        }
      },
      error=>{
        var errorMessage = <any>error;
  
        console.log(<any>error)
        this.vall2 = false;
        this.mensaje2 = 'Algo salió mal, intentalo mas tarde...'
      }
    )
  }
  eliminarCodigoPrev2(stepper: MatStepper){
    this._usuarioService.eliminarCodigo(this.codi._id).subscribe(
      response=>{
        if(response.n == '1'){
          
          this.vallE = null;
          this.vall2 = null;
          this.vallE2 = null;
          this.vall = null;
          //this.vallE = null;
          this.vall3 = null;
          this.vallE3 = null;
          this.codi = null;
          this.user = null;
          setTimeout(() => {           // or do some API calls/ Async events
            this._router.navigate(['login']);
           }, 2);
         
  
  
        }
      },
      error=>{
        var errorMessage = <any>error;
  
        console.log(<any>error)
        this.vall2 = false;
        this.mensaje2 = 'Algo salió mal, intentalo mas tarde...'
      }
    )
  }
  
  cambiarPassword(){
    var pss =  this.threeFormGroup.value;
    this.user.password = pss.password; 
  
    this._usuarioService.cambiarPss(this.user,this.user._id).subscribe(
      response =>{
  
        if(response.usuario && response.n == '1'){
          this.presentToast('Contraseña actualizada')
          this._router.navigate(['login']);
  
        }
        
      },
      error=>{
        console.log(<any>error)
        this.presentToast('No se pudo actualizar la contraseña')
      }
    )
  }
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'top'
    });
    toast.present();
    
  }
}
