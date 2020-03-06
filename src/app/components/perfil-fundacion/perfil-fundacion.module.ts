import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilFundacionPage } from './perfil-fundacion.page';
import {MatTabsModule, MatTabGroup} from '@angular/material/tabs';
import { MatExpansionModule} from '@angular/material'

const routes: Routes = [
  {
    path: '',
    component: PerfilFundacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatExpansionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilFundacionPage]
})
export class PerfilFundacionPageModule {}
