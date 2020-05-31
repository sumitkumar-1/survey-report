import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateExcelPage } from './create-excel.page';
import { File } from '@ionic-native/file/ngx';
import { ExcelService } from 'src/app/services/excel.service';

const routes: Routes = [
  {
    path: '',
    component: CreateExcelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    File,
    ExcelService
  ],
  declarations: [CreateExcelPage]
})
export class CreateExcelPageModule {}
