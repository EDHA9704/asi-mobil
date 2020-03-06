import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilAdopcionPage } from './perfil-adopcion.page';
import {MatTabsModule, MatTabGroup,} from '@angular/material/tabs';
import {MatExpansionModule,MatFormFieldModule, MatFormField
} from '@angular/material';
import { MomentModule } from 'ngx-moment';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

const routes: Routes = [
  {
    path: '',
    component: PerfilAdopcionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatFormFieldModule,
    MomentModule,
    MatExpansionModule,
    NgxIonicImageViewerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilAdopcionPage]
})
export class PerfilAdopcionPageModule {}
