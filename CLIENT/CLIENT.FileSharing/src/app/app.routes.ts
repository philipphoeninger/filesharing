import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyLinksComponent } from './pages/my-links/my-links.component';
import { SharedComponent } from './pages/shared-component/shared.component';
import { UploadsComponent } from './pages/uploads/uploads.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './identity/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'uploads',
    component: UploadsComponent,
  },
  {
    path: 'myLinks',
    component: MyLinksComponent,
  },
  {
    path: 'sharedWithMe',
    component: SharedComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];
