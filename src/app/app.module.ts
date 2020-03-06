import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MatExpansionModule,MatCardModule,MatOptionModule,MatSelectModule,
  MatCheckboxModule,MatButtonModule, MatStepperModule,  MatInputModule,  
  MatFormFieldModule,MatIconModule,MatRadioModule,MatSnackBarModule, MatCheckbox } from '@angular/material'
  import {MatBadgeModule} from '@angular/material/badge';
  import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  Facebook,
  FacebookLoginResponse
}
  from '@ionic-native/facebook/ngx';
  import {OneSignal} from '@ionic-native/onesignal/ngx'

  import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
  import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


import { File } from '@ionic-native/file';
import {MenuComponent} from './components/menu/menu.component'
import {FiltrosComponent} from './components/filtros/filtros.component'
import {FiltrospopComponent} from './components/filtrospop/filtrospop.component'

import {FormFundacionComponent} from './components/form-fundacion/form-fundacion.component'
import {FormEmergenciaComponent} from './components/form-emergencia/form-emergencia.component'

import {SlidesFundacionComponent} from './components/slides-fundacion/slides-fundacion.component';
import { HammertimeDirective } from './directives/hammertime.directive'
import * as Hammer from 'hammerjs'
import { IonicStorageModule } from '@ionic/storage';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { IonRefreshNativeModule } from 'ion-refresh-native';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { MatDialogModule } from  "@angular/material";
import { DialogloginComponent } from  "./components/dialoglogin/dialoglogin.component";
import { DialogMailComponent} from  "./components/dialog-mail/dialog-mail.component";
import {ProcesoAdopcionPage} from './components/proceso-adopcion/proceso-adopcion.page'
import {PopUpLocationComponent} from './components/pop-up-location/pop-up-location.component';

export class CustomHammerConfig extends HammerGestureConfig{
  overrides ={
    'swipe':{
      direction: Hammer.DIRECTION_UP
    }
  }
}
@NgModule({
  declarations: [AppComponent,ProcesoAdopcionPage,PopUpLocationComponent,DialogloginComponent,DialogMailComponent,FiltrospopComponent,MenuComponent,FiltrosComponent,FormFundacionComponent,SlidesFundacionComponent, 
    HammertimeDirective,FormEmergenciaComponent],
  entryComponents: [MenuComponent,ProcesoAdopcionPage,PopUpLocationComponent,DialogloginComponent,DialogMailComponent,FiltrospopComponent,FiltrosComponent,FormFundacionComponent,SlidesFundacionComponent,FormEmergenciaComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(),AppRoutingModule,
    FormsModule,
    IonRefreshNativeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MomentModule,
    MatMenuModule,
    MatExpansionModule,
    NgxIonicImageViewerModule,
    IonicHeaderParallaxModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule,MatOptionModule,MatSelectModule,MatButtonModule,MatCheckboxModule,MatInputModule,MatSnackBarModule,MatTabsModule,MatStepperModule,MatFormFieldModule,MatIconModule,MatRadioModule],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    OneSignal,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    Facebook,
    NativeStorage,
    Camera,
    FileTransfer,
    FileTransferObject,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
