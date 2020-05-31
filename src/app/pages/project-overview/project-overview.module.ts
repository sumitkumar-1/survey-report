import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectOverviewPage } from './project-overview.page';
import { ExcelService } from 'src/app/services/excel.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectOverviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  // providers: [
  //   File,
  //   ExcelService
  // ],
  declarations: [ProjectOverviewPage, PopoverComponent],
  entryComponents: [PopoverComponent]
})
export class ProjectOverviewPageModule {}
