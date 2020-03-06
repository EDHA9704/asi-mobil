import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmergenciasReportadasPage } from './emergencias-reportadas.page';

const routes: Routes = [
  {
    path: '',
    component: EmergenciasReportadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmergenciasReportadasPage]
})
export class EmergenciasReportadasPageModule {}
