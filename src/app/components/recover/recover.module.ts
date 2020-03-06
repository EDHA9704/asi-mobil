import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoverPage } from './recover.page';
import { MatStepperModule,MatButtonModule, MatFormFieldModule,MatInputModule} from '@angular/material'
const routes: Routes = [
  {
    path: '',
    component: RecoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    IonicModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecoverPage]
})
export class RecoverPageModule {}
