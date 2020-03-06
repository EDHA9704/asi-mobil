import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistroProcesoPage } from './registro-proceso.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroProcesoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistroProcesoPage]
})
export class RegistroProcesoPageModule {}
