import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioLogin} from '../../models/UsuarioLogin';
import {UsuarioAdoptante} from '../../models/usuarioAdoptante';

import {UsuarioService} from '../../services/usuario.service';
import {GLOBAL} from '../../services/global';
import { ToastController, Platform, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogloginComponent} from '../dialoglogin/dialoglogin.component'
import {
  Facebook,
  FacebookLoginResponse
}

  from '@ionic-native/facebook/ngx';
  import { AlertController } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[UsuarioService,Facebook]
})
export class LoginPage implements OnInit {
  public usuarioLogin:UsuarioLogin;
  public usuarioLogin2:UsuarioLogin;

  public usuarioAdoptante:UsuarioAdoptante;
  public usuarioAdoptante2:UsuarioAdoptante;

  public status:string;
  public identity;
  public token;
  public proLogin;
  public url:string;
  public mensaje;
  public deviceID
  public stUser = {
    type:"",
    id:"",
    token:"",
    rol:"",
    correo:"",
    image:""
  }
  constructor(public dialog: MatDialog,private platform: Platform,public alertCtrl: AlertController,private oneSignal:OneSignal,private nativeStorage: NativeStorage,private storage: Storage,
		public loadingController: LoadingController,private fb: Facebook,private _route:ActivatedRoute,private _notificacionService:NotificacionService,
    private _router:Router, private _usuarioService:UsuarioService,public toastController: ToastController,
    public alertController: AlertController,private navCtrl: NavController) {
      this.proLogin = false;
      this.usuarioLogin = new UsuarioLogin("","","","" );
      this.usuarioLogin2 = new UsuarioLogin("","","","" );

      this.usuarioAdoptante= new UsuarioAdoptante("","","","","",null,"" );
      this.usuarioAdoptante2= new UsuarioAdoptante("","","","","",null,"" );

      this.identity = this._usuarioService.obtIdentity();
      this.url = GLOBAL.url;
      this.mensaje = "inicio"
     }

  ngOnInit() {
    /*if(this.identity != null){
      this._router.navigate(['tabs']);
    }*/
  }
  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'top'
    });
    toast.present();
    
  }
  async presentAlertConfirm(user) {
    const alert = await this.alertController.create({
      header: 'Confirmar cuenta',
      message: 'Hola'+'<strong>'+user.name+'</strong>'+' tu cuenta de facebook no coinciden con nuestros registros. Deseas crear una cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.presentToast('proceso de registro')
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlert(er,msj) {
    const alert = await this.alertController.create({
      header: er,
      subHeader: 'Subtitle',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }
async login(){
  const loading = await this.loadingController.create({
    message: 'Verificando...'
  });
  this.presentLoading(loading);
    
    this._usuarioService.login(this.usuarioLogin).subscribe(
      
      response=>{
       console.log(response)
        if(response.usuario && response.n == '3'){
       
        this.usuarioAdoptante2._id = response.usuario._id;
       // this.presentToast(this.usuarioAdoptante2._id)

         this.usuarioAdoptante2.nombres = response.usuario.nombres;
         this.usuarioAdoptante2.apellidos = response.usuario.apellidos;
         this.usuarioAdoptante2.correo = response.usuario.correo;
         this.usuarioAdoptante2.edad = response.usuario.edad;
         this.usuarioAdoptante2.foto = response.usuario.foto;
          this._usuarioService.login(this.usuarioLogin, 'true').subscribe(
                      
            response=>{
              this.token = response.token;
              console.log(this.token)
              if(this.token.length <= 0 ){
                this.presentToast('Intentalo de nuevo')
              }else{
                this.stUser.id = this.usuarioAdoptante2._id
                this.stUser.type = 'nr',
                this.stUser.rol = response.usuario.rol
                this.stUser.correo= this.usuarioAdoptante2.correo,
                this.stUser.image= this.usuarioAdoptante2.foto
                this.stUser.token = this.token;
                //PERSISTIR usuario
                this.persistirUsuario(this.stUser,loading)
                
                
              }
            }, error =>{
              console.log(<any>error)
              loading.dismiss();
              var errorMessage = <any>error;
              this.presentToast('Inténtalo nuevamente.');
          
            })

           
        }else if(response.n == '2'){
          loading.dismiss();

          this.openDialog()
          
        }
      }, 
      error =>{
        console.log(<any>error)
        loading.dismiss();
        var errorMessage = <any>error;
        this.mensaje = error.message
        if(error.error.n == '0' || error.error.n == '1' ){
          this.openDialog()
        }else{
          this.presentToast('Inténtalo nuevamente')
        }
      }
    )
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
      user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
      var us = new UsuarioLogin("","","","")
      us.correo = user.email;
      this._usuarioService.validUser(us).subscribe(
        response=>{
          console.log("ENTRO DO FACE")
          console.log(response)
         
          if(response.n == '1'){ //no registrado -- dialog no existe cuenta
            console.log("ENTRO DIALOG")
            loading.dismiss();
            this.openDialog()
            
          }else if(response.n == '2' && response.usuario.tipo == 'fb'){//si el usuario ya existe
            console.log("EXISTE")
            var idus = response.usuario._id;
                  //CONSEGUIR EL TOKEN
                  this.usuarioLogin2.correo = user.email
                  console.log(user)
                  this._usuarioService.loginFB(this.usuarioLogin2, 'true').subscribe(
                      
                    response=>{
                      console.log("ENTRO token")
                      this.token = response.token;
                      
                      if(this.token.length <= 0 ){
                        this.presentToast('No se pudo guardar el token')
                      }else{
                        console.log("ENTRO proceso a persistir")
                        this.stUser.id = idus
                        this.stUser.type = 'fb',
                        this.stUser.rol = response.usuario.rol
                        this.stUser.correo= user.email,
                        this.stUser.image= user.picture
                        this.stUser.token = this.token;
                        //PERSISTIR usuario
                        this.persistirUsuario(this.stUser,loading)
                        
                        
                      }
                    }, error =>{
                      console.log("Error login")
                      loading.dismiss();
                      var errorMessage = <any>error;
                      console.log(<any>error)
                      this.presentToast('Inténtalo nuevamente.');
                  
                    })

          }else{
            loading.dismiss();
            this.openDialog()
          }
        },
        error=>{
          console.log("Error validar usuario")
          this.mensaje = error.message
          
          loading.dismiss();
          this.presentToast('Intentalo nuevamente')
          console.log(<any>error)
        }
      )

    });

  }, error =>{
    console.log("Error facebook")
    console.log(<any>error)
    loading.dismiss();
    this.presentToast('ERROR, inténtalo nuevamente')
  });
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

async presentLoading(loading) {
  return await loading.present();
}

async registrarUsuario(usuarioAdoptante){
  const loading = await this.loadingController.create({
    message: 'Creando tu cuenta...'
  });

 
  this.presentLoading(loading)
 
  this._usuarioService.registro(usuarioAdoptante).subscribe(
    response=>{
      if(response.n == '1'){
        this.usuarioLogin2.correo = usuarioAdoptante.correo;
      this.usuarioLogin2.password = usuarioAdoptante.password;

        this._usuarioService.loginFB(this.usuarioLogin2,"true").subscribe(
          response=>{
                this.token = response.token;
    
              if(this.token.length <= 0 ){
                this.presentToast('No se pudo guardar el token')
              }else{
                this.stUser.id = response.usuario.id
                this.stUser.type = 'fb',
                this.stUser.rol = response.usuario.rol
                this.stUser.correo= usuarioAdoptante.correo,
                this.stUser.image= usuarioAdoptante.foto
                this.stUser.token = this.token;
                //PERSISTIR usuario
                this.persistirUsuario(this.stUser,loading)
              
                
              }
          },
          error=>{
            loading.dismiss();
            this.presentToast('Error token, inténtalo nuevamente')
          }
        )
      }

    },
    error=>{
      loading.dismiss();
      this.presentToast('Error al registrar, inténtalo nuevamente')
    }
  )
}

async persistirUsuario(usuario,loading){
console.log("entrooooo")
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

async showAlert(title,msg,task){
  const alert = await this.alertCtrl.create({
    header:title,
    subHeader:msg,
    buttons:[
      {
        text:`Action: ${task}`,
        handler:()=>{

        }
      }
    ]
  })
}
recover(){
  this._router.navigate(['recover']);
}
}
