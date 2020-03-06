import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilDonacionPage } from './perfil-donacion.page';
import { MomentModule } from 'ngx-moment';
import {MatExpansionModule,MatFormFieldModule, MatFormField
} from '@angular/material';
import {MatTabsModule, MatTabGroup} from '@angular/material/tabs';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

const routes: Routes = [
  {
    path: '',
    component: PerfilDonacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule ,
    RouterModule.forChild(routes),
    MatExpansionModule,MatFormFieldModule,
    MatTabsModule,
    NgxIonicImageViewerModule 
  ],
  declarations: [PerfilDonacionPage]
})
export class PerfilDonacionPageModule {}
