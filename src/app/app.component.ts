import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx'
import { AlertController } from '@ionic/angular';
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
    public alertCtrl: AlertController
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
    console.log("ENTRO")
    this.oneSignal.startInit('039f7bfd-cb61-429d-a8b7-5b5cfd4033a8','826654211773')
    
    this.oneSignal.addEmailSubscriptionObserver().subscribe(data =>{
      console.log(data)
    })
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      console.log("HOLA MEN")

     // let additionalData = data.notification.payload.additionalData;
      /*this.showAlert('Notificacion opened','you already read this before',additionalData.task)*/
  
    })
    this.oneSignal.handleNotificationReceived().subscribe(data=>{
      console.log("HOLA NOTI")
      /*let msg = data.payload.body
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;*/
      //this.showAlert(title,msg,additionalData.task)
    })
  
    this.oneSignal.endInit();
 
    this.oneSignal.provideUserConsent(true);
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
