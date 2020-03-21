import { Component, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal:OneSignal,
    public alertCtrl: AlertController,
    private _router:Router,public zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.platform.is('cordova')){
        this.setupPush(); 
      
      }
      
    });
  }
  setupPush(){ 
    $( document ).ready(()=> {
      console.log("ENTRO")
    this.oneSignal.startInit('039f7bfd-cb61-429d-a8b7-5b5cfd4033a8','826654211773')
    this.oneSignal.provideUserConsent(true);
    this.oneSignal.addEmailSubscriptionObserver().subscribe(data =>{
      console.log(data)
    })
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)
    
    this.oneSignal.handleNotificationReceived().subscribe(data=>{
      console.log("HOLA NOTI")
      /*let msg = data.payload.body
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;*/
      //this.showAlert(title,msg,additionalData.task)
    })

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      console.log("HOLA MEN")

      let additionalData = data.notification.payload.additionalData;
      console.log(additionalData)
      
      if(additionalData.op == 'adopcion'){
        this.zone.run(() => {
        this._router.navigate([additionalData.url,additionalData.id], { queryParams: { returnUrl: '/tabs/tab1' }});    
        })
      }else {
        this.zone.run(() => {
        this._router.navigate([additionalData.url,additionalData.id,additionalData.add], { queryParams: { returnUrl: '/tabs/tab1' }});   
      })
      }

      
      
     
      /*this.showAlert('Notificacion opened','you already read this before',additionalData.task)*/
  
    })
    this.oneSignal.endInit();
  });
   
 
    
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
 
}
