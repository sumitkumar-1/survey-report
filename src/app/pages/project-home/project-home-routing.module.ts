import { ProjectHomePage } from './project-home.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'project-home',
    component: ProjectHomePage,
    children: [
      {
        path: 'project-overview',
        loadChildren: '../project-overview/project-overview.module#ProjectOverviewPageModule'
      },
      {
        path: 'pre-assets',
        loadChildren: '../pre-assets/pre-assets.module#PreAssetsPageModule'
      },
      {
        path: 'post-assets',
        loadChildren: '../post-assets/post-assets.module#PostAssetsPageModule'
      },
      {
        path: '',
        redirectTo: '/project-home/project-home/project-overview',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'project-home/project-overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectHomePageRoutingModule {}
