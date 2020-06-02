import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreAssetsPage } from './pre-assets.page';
import { PhotoService } from 'src/app/services/photo.service';

const routes: Routes = [
  {
    path: '',
    component: PreAssetsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreAssetsPage],
  providers: [PhotoService]
})
export class PreAssetsPageModule {}
