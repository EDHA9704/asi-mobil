import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilEmergenciaPage } from './perfil-emergencia.page';
import {MatTabsModule, MatTabGroup} from '@angular/material/tabs';
import { MomentModule } from 'ngx-moment';
import {MatExpansionModule} from '@angular/material';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';


const routes: Routes = [
  {
    path: '',
    component: PerfilEmergenciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatExpansionModule,
    MomentModule,
    NgxIonicImageViewerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilEmergenciaPage]
})
export class PerfilEmergenciaPageModule {}
