import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PopmenuComponent } from '../../components/popmenu/popmenu.component';

import { ProjectsPage } from './projects.page';
import { DbService } from 'src/app/services/db.service';
import { ProjectService } from 'src/app/services/project.service';

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
  providers: [
    DbService,
    ProjectService,
  ],
  declarations: [ProjectsPage, PopmenuComponent],
})
export class ProjectsPageModule {}
