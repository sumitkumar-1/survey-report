import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectOverviewPage } from './project-overview.page';
import { Base64 } from '@ionic-native/base64/ngx';

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
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Base64
  ],
  declarations: [ProjectOverviewPage, PopoverComponent],
  entryComponents: [PopoverComponent]
})
export class ProjectOverviewPageModule {}
