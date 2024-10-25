import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyLinksComponent } from './pages/my-links/my-links.component';
import { SharedComponent } from './pages/shared-component/shared.component';
import { UploadsComponent } from './pages/uploads/uploads.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './identity/login/login.component';
import { RegisterComponent } from './identity/register/register.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'auth',
    component: LoginComponent,
    outlet: 'login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    outlet: 'login',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'uploads',
    component: UploadsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myLinks',
    component: MyLinksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sharedWithMe',
    component: SharedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
];
