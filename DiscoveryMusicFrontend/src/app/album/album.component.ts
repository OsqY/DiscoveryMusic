import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlbumResponse } from './AlbumResponse';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommentFormComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  public result!: AlbumResponse;
  public url: string = environment.baseUrl;
  id: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getParam();
    this.getAlbum(this.id);
  }

  getAlbum(id: string) {
    this.http
      .get<AlbumResponse>(this.url + `/api/Album/GetAlbum/${id}`)
      .subscribe({
        next: (result) => {
          this.result = result;
        },
        error: (error) => console.error(error),
      });
  }

  getParam() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
  }
}
