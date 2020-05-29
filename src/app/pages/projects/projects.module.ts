import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PopmenuComponent } from '../../components/popmenu/popmenu.component';

import { ProjectsPage } from './projects.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage
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
  declarations: [ProjectsPage, PopmenuComponent],
})
export class ProjectsPageModule {}
