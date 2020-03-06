import { Component, OnInit } from '@angular/core';
import {UsuarioAdoptante} from '../../models/usuarioAdoptante';
import {UsuarioLogin} from 'src/app/models/UsuarioLogin';
import {UsuarioService} from '../../services/usuario.service';
import {GLOBAL} from '../../services/global';
import * as $ from 'jquery'
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastController, Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';
import {DialogloginComponent} from '../dialoglogin/dialoglogin.component'

import {
  Facebook,
  FacebookLoginResponse
}from '@ionic-native/facebook/ngx';
  import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  providers:[UsuarioService]
})
export class RegistroPage implements OnInit {
  public usuarioAdoptante:UsuarioAdoptante;
  public usuarioAdoptante2:UsuarioAdoptante;

  public usuarioLogin:UsuarioLogin;
  public proFR;
  public proRegistro;

  public status;
  public identity;
  public token;
  public deviceID
  public url:string;
  public mensaje;
   slideOpts = {
    lock: false,
 
  };
  public stUser = {
    type:"",
    id:"",
    token:"",
    rol:"",
    correo:"",
    image:""
  }
  constructor(public dialog: MatDialog,private nativeStorage: NativeStorage,private fb: Facebook,private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService,
    public toastController: ToastController,private oneSignal:OneSignal,public loadingController: LoadingController,
    private storage: Storage,private platform: Platform,private _notificacionService:NotificacionService,private navCtrl: NavController) {
    this.proFR = false;
    this.proRegistro = false;
    this.usuarioAdoptante = new UsuarioAdoptante("","","","","",null,"" );
    this.usuarioAdoptante2 = new UsuarioAdoptante("","","","","",null,"" );

    this.usuarioLogin = new UsuarioLogin("","","","" );

    this.url = GLOBAL.url;
    this.status = false;
   }

  ngOnInit() {
    /*if(this.identity != null){
      this._router.navigate(['tabs']);
    }*/
    this.prob()
  
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'top'
    });
    toast.present();
    
  }
  async presentLoading(loading) {
    return await loading.present();
  }
 
  async registroProcess(){

    const loading = await this.loadingController.create({
      message: 'Verificando...'
    });
   
    this.presentLoading(loading)
   
    this._usuarioService.validUser(this.usuarioAdoptante).subscribe(
      response=>{
       
        if(response.n == '1'){
          loading.dismiss();
          
          this._router.navigate(['registro-proceso',this.usuarioAdoptante.correo,this.usuarioAdoptante.password]);
        }else if(response.n == '2'){
          this.status = true;
          loading.dismiss();
        }
      },
      error=>{
        this.mensaje = error.message
        
        loading.dismiss();
        this.presentToast('Intentalo nuevamente')
        console.log(<any>error)
      }
    )
   
  }


  prob(){

    $("#correo").keyup(()=>{
      this.status = false;
  
  }); 
  }


  async doFbLogin(){
    const loading = await this.loadingController.create({
      message: 'Verificando...'
    });
    this.presentLoading(loading);
    let permissions = new Array<string>();
  
    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];
    this.fb.login(permissions)
    .then(response =>{
      let userId = response.authResponse.userID;
  
      //Getting name and gender properties
      this.fb.api("/me?fields=name,email", permissions)
      .then(user =>{
        console.log("entro login facebook")
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        var us = new UsuarioLogin("","","","")
        us.correo = user.email;
        this._usuarioService.validUser(us).subscribe(
          response=>{
            console.log("entro valid user")
            if(response.n == '1'){ //no registrado -- empieza proceso automatico de registro
              loading.dismiss();
              console.log("usuario no registrado")
              //.usuarioAdoptante2._id = response.usuario._id;
              this.usuarioAdoptante2.nombres = user.name;
              this.usuarioAdoptante2.apellidos = "";
              this.usuarioAdoptante2.correo = user.email;
              this.usuarioAdoptante2.password = "FBA";
              this.usuarioAdoptante2.foto = user.picture;
              this.registrarUsuario(this.usuarioAdoptante2);
              
            }else if(response.n == '2'){
              console.log("registrado proceso login")
              loading.dismiss();
              this.openDialog()
                    /*//existe usuario, proceso de login
                    this.usuarioLogin.correo = user.email
                    this._usuarioService.loginFB(this.usuarioLogin, 'true').subscribe(
                        
                      response=>{
                        console.log("Entro login FB API")
                        var idus = response.usuario._id;
                        this.token = response.token;
                        console.log(this.token)
                        if(this.token.length <= 0 ){
                          this.presentToast('No se pudo guardar el token')
                        }else{
                          


                          this.stUser.id = idus
                          this.stUser.type = 'fb',
                          this.stUser.rol = response.usuario.rol
                          this.stUser.correo= user.email,
                          this.stUser.image= user.picture
                          this.stUser.token = this.token;

                          this.persistirUsuario(this.stUser,loading)
                        }
                      }, error =>{
                        loading.dismiss();
                        var errorMessage = <any>error;
                        
                        console.log("ERROR TOKEN")
                        console.log(<any>error)
                        this.presentToast('Error token, inténtalo nuevamente.');
                    
                      })*/
  
            }
          },
          error=>{
            this.mensaje = error.message
            console.log("error valid usaurioa")
            loading.dismiss();
            this.presentToast('Intentalo nuevamente')
            console.log(<any>error)
          }
        )
  
      });
  
    }, error =>{
      console.log("error facebook lg")
      console.log(<any>error)
      loading.dismiss();
      this.presentToast('ERROR, inténtalo nuevamente')
    });
  }
  async registrarUsuario(usuarioAdoptante){
    const loading = await this.loadingController.create({
      message: 'Creando tu cuenta...'
    });
  
   
    this.presentLoading(loading)
   
    this._usuarioService.registro(usuarioAdoptante).subscribe(
      response=>{
        if(response.n == '1'){
          console.log("PROCESO REGISTRO EXITOO")
          this.usuarioLogin.correo = usuarioAdoptante.correo;
        this.usuarioLogin.password = usuarioAdoptante.password;
  
          this._usuarioService.loginFB(this.usuarioLogin,"true").subscribe(
            response=>{
              console.log("LOGIN EXITOO")
      this.token = response.token;
      console.log(this.token)
      if(this.token.length <= 0 ){
        this.presentToast('No se pudo guardar el token')
      }else{
        console.log("ENNTRO PERS")
        this.stUser.id = response.usuario._id
        this.stUser.type = 'fb',
        this.stUser.rol = response.usuario.rol
        this.stUser.correo= usuarioAdoptante.correo,
        this.stUser.image= usuarioAdoptante.foto
        this.stUser.token = this.token;
        this.persistirUsuario(this.stUser,loading)
        
      }
            },
            error=>{
              console.log("ERROR LOGIN REG FB")
              console.log(<any>error)
              loading.dismiss();
              this.presentToast('Error token, inténtalo nuevamente')
            }
          )
        }
  
      },
      error=>{
        console.log("ERROR registro ss")
              console.log(<any>error)
        loading.dismiss();
        this.presentToast('Error al registrar, inténtalo nuevamente')
      }
    )
  }
  async persistirUsuario(usuario,loading){

    await this.storage.set('usuario',usuario);
    if(this.platform.is('cordova')){
     this.setupPush(usuario.id);
   
   }
    loading.dismiss();   
    this.navCtrl.navigateRoot(['tabs']); 
  }
   setupPush(id){ 
    console.log("ENTRO")
    
    this.getOneSignalIDSubscriptor(id)
  
  }
  // Función para Obtener ID de Suscriptor de Onesignal
async getOneSignalIDSubscriptor(id) {
  console.log("ENTRO ID")
  //Pedir acceso a notificaciones, en caso de no tenerlas
  this.oneSignal.provideUserConsent(true);
  this.deviceID = await this.oneSignal.getIds();
  var device = { 
    usuario:id,
    onesgId:this.deviceID.userId
  }
  await this.storage.set('idsignal',this.deviceID.userId);
  this._notificacionService.nuevaOneSignal(device).subscribe(
    response=>{
      console.log(response)
    },
    error=>{
      console.log(<any>error)
    }
  )
  console.log(this.deviceID)
}

openDialog(): void {
  var titulo = 'Cuenta existente'
  var msj = 'La cuenta ya esta registrada. Por favor inicia sesión.'
  const dialogRef = this.dialog.open(DialogloginComponent, {
    width: '330px',
    data: {tipo:'lg',titulo: titulo, msj:msj}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
   
  });
}

}
