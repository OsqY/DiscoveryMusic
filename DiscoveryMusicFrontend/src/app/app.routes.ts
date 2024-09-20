import { mapToCanActivate, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';
import { AlbumFormComponent } from './album-form/album-form.component';
import { AdminGuard } from './identity/admin-guard';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { SongFormComponent } from './song-form/song-form.component';
import { ArtistsComponent } from './artists/artists.component';

export const routes: Routes = [
  {
    path: 'create-album',
    component: AlbumFormComponent,
    canActivate: mapToCanActivate([AdminGuard]),
  },
  {
    path: 'edit-album/:id',
    component: AlbumFormComponent,
    canActivate: mapToCanActivate([AdminGuard]),
  },
  {
    path: 'create-artist',
    component: ArtistFormComponent,
    canActivate: mapToCanActivate([AdminGuard]),
  },
  {
    path: 'edit-artist/:id',
    component: ArtistFormComponent,
    canActivate: mapToCanActivate([AdminGuard]),
  },
  {
    path: 'create-song',
    component: SongFormComponent,
    canActivate: mapToCanActivate([AdminGuard]),
  },
  {
    path: 'edit-song/:id',
    component: SongFormComponent,
    canActivate: mapToCanActivate([AdminGuard]),
  },
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
    path: 'artists',
    component: ArtistsComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
