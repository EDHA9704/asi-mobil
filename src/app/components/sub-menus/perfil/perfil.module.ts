import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule,  MatInputModule,  MatFormFieldModule,MatIconModule,
  MatSnackBarModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,MatDatepickerModule,MatNativeDateModule,  MatInputModule,  MatFormFieldModule,MatIconModule,MatSnackBarModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
