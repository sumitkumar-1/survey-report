import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'projects', loadChildren: './pages/projects/projects.module#ProjectsPageModule' },
  { path: 'project-info', loadChildren: './pages/modal/project-info/project-info.module#ProjectInfoPageModule' },
  { path: 'create-project', loadChildren: './pages/create-project/create-project.module#CreateProjectPageModule' },
  // { path: 'project-home', loadChildren: './pages/project-home/project-home.module#ProjectHomePageModule' }
  { path: 'project-home', loadChildren: () => import('./pages/project-home/project-home.module').then(m => m.ProjectHomePageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
