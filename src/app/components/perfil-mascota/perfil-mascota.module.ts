import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule,MatButtonModule } from '@angular/material'

import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';

import { PerfilMascotaPage } from './perfil-mascota.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { MatExpansionModule } from '@angular/material'
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

import {MatTabsModule, MatTabGroup} from '@angular/material/tabs';
const routes: Routes = [
  {
    path: '',
    component: PerfilMascotaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    NgxIonicImageViewerModule,
    MatTabsModule,
    MatExpansionModule,
    MomentModule,
    IonicHeaderParallaxModule
  ],
  declarations: [PerfilMascotaPage]
})
export class PerfilMascotaPageModule {}
