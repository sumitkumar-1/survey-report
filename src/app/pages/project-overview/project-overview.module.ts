import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectOverviewPage } from './project-overview.page';
import { File } from '@ionic-native/file/ngx';
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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    File,
    Base64
  ],
  declarations: [ProjectOverviewPage, PopoverComponent],
  entryComponents: [PopoverComponent]
})
export class ProjectOverviewPageModule {}
