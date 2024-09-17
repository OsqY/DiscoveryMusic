import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';

export const routes: Routes = [
  {
    path: 'new',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
