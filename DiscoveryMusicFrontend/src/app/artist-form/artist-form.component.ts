import { Component, OnInit } from '@angular/core';
import { ArtistToEdit } from './Artist';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './artist-form.component.html',
  styleUrl: './artist-form.component.scss',
})
export class ArtistFormComponent implements OnInit {
  artistToEdit!: ArtistToEdit;
  artistId: string = '';
  name: string = '';
  debut: string = '';
  albumId: number = 0;
  success: boolean = false;
  isEdit: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getParam();
  }

  getParam() {
    this.route.paramMap.subscribe((params) => {
      this.artistId = params.get('id') ?? '';
      if (this.artistId !== '') {
        this.getArtist(this.artistId);
      }
    });
  }

  getArtist(artistId: string) {
    this.http
      .get<ArtistToEdit>(`/api/Artist/GetArtistInfo/${artistId}`, {
        observe: 'response',
      })
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.artistToEdit = result.body!;
            this.handleEdit();
          }
        },
        error: (error) => console.error(error),
      });
  }

  handleEdit() {
    this.isEdit = true;
    this.name = this.artistToEdit.name;
    this.debut = this.artistToEdit.debut;
  }

  sendData() {
    this.http
      .post(
        '/api/Artist/CreateArtist',
        { name: this.name, debut: this.debut },
        { observe: 'response' },
      )
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.success = true;
          }
          this.success = false;
        },
        error: (error) => {
          this.success = false;
        },
      });
  }

  updateArtist() {
    this.http
      .put(
        `/api/Artist/UpdateArtist/${this.artistId}`,
        { name: this.name, debut: this.debut },
        { observe: 'response' },
      )
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.success = true;
          }
          this.success = false;
        },
        error: (error) => (this.success = false),
      });
  }
}
