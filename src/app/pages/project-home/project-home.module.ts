import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectHomePageRoutingModule } from './project-home-routing.module';
import { ProjectHomePage } from './project-home.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: ProjectHomePage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectHomePageRoutingModule
  ],
  declarations: [ProjectHomePage]
})
export class ProjectHomePageModule {}
