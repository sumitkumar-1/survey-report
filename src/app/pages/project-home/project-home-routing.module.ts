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
        loadChildren: () => import('../project-overview/project-overview.module').then(m => m.ProjectOverviewPageModule)
      },
      {
        path: 'pre-assets',
        loadChildren: () => import('../pre-assets/pre-assets.module').then(m => m.PreAssetsPageModule)
      },
      {
        path: 'post-assets',
        loadChildren: () => import('../post-assets/post-assets.module').then(m => m.PostAssetsPageModule)
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
