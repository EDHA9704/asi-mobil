import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  ,ReactiveFormsModule} from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {MatMenuModule,MatSidenavModule,MatRadioModule,MatExpansionModule} from '@angular/material'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatExpansionModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
