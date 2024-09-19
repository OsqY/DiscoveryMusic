import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Album, Artist, Artists, Song } from './Album';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlbumResponse } from '../album/AlbumResponse';

@Component({
  selector: 'app-album-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './album-form.component.html',
  styleUrl: './album-form.component.scss',
})
export class AlbumFormComponent implements OnInit {
  albumToEdit!: Album;
  isEdit: boolean = false;
  name: string = '';
  releaseDate: string = '';
  artistId: string = '';
  songs: Song[] = [];
  artists: Artist[] = [];
  success: boolean = false;
  albumId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getArtists();
    this.getParam();
  }

  handleEdit() {
    this.isEdit = true;
    this.name = this.albumToEdit.name;
    this.releaseDate = this.albumToEdit.releaseDate;
    this.artistId = this.albumToEdit.artistId.toString();
    this.songs = [...this.albumToEdit.songs];
  }

  getAlbum(id: string) {
    this.http.get<AlbumResponse>(`/api/Album/GetAlbum/${id}`).subscribe({
      next: (result) => {
        this.albumToEdit = result.album;
        this.handleEdit();
      },
      error: (error) => console.error(error),
    });
  }

  getParam() {
    this.route.paramMap.subscribe((params) => {
      this.albumId = params.get('id') ?? '';
      this.getAlbum(this.albumId);
    });
  }

  sendData() {
    const formattedReleaseDate = new Date(this.releaseDate).toISOString();
    const formattedSongs = this.songs.map((song) => ({
      ...song,
      releaseDate: new Date(song.releaseDate).toISOString(),
    }));
    this.http
      .post(
        '/api/Album/Post',
        {
          name: this.name,
          releaseDate: formattedReleaseDate,
          artistId: this.artistId,
          songs: formattedSongs,
        },
        { observe: 'response', withCredentials: true },
      )
      .subscribe({
        next: (result) => {
          this.success = result.ok;
        },
        error: (error) => {
          this.success = false;
        },
      });
  }

  updateAlbum() {
    const formattedReleaseDate = new Date(this.releaseDate).toISOString();
    const formattedSongs = this.songs.map((song) => ({
      ...song,
      releaseDate: new Date(song.releaseDate).toISOString(),
    }));
    this.http
      .put(
        `/api/Album/UpdateAlbum/${this.albumId}`,
        {
          name: this.name,
          releaseDate: formattedReleaseDate,
          artistId: this.artistId,
          songs: formattedSongs,
        },
        { observe: 'response' },
      )
      .subscribe({
        next: (result) => {
          this.success = result.ok;
        },
        error: (error) => {
          this.success = false;
        },
      });
  }

  getArtists() {
    this.http.get<Artists>('/api/Artist/GetArtists?pageSize=300').subscribe({
      next: (artists) => {
        this.artists = artists.data.$values;
      },
      error: (error) => console.error(error),
    });
  }

  addSong() {
    this.songs.push({
      name: '',
      releaseDate: '',
      albumId: this.albumToEdit?.id || 0,
    });
  }

  removeSong(index: number) {
    this.songs.splice(index, 1);
  }
}
