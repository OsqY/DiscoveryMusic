import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlbumResponse, Comment, UserComment } from './AlbumResponse';
import { ActivatedRoute } from '@angular/router';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { AuthService } from '../identity/service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommentFormComponent, FormsModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  public result!: AlbumResponse;
  id: string = '';
  isSignedIn: boolean = false;
  public userComment!: UserComment;
  isEdit: boolean = false;
  content: string = '';
  rating: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getParam();
    this.getAlbum(this.id);

    this.authService.onStateChanged().forEach((state: boolean) => {
      this.isSignedIn = state;
      if (state) {
        this.getCommentFromUser();
      }
    });
  }

  getAlbum(id: string) {
    this.http.get<AlbumResponse>(`/api/Album/GetAlbum/${id}`).subscribe({
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

  getCommentFromUser() {
    this.http
      .get<Comment>(`/api/Comment/GetCommentFromAlbumId/${this.id}`, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe({
        next: (result) => {
          if (result.status === 200) {
            this.userComment = result.body!;
          }
          this.isEdit = true;
        },
        error: (error) => console.error(error),
      });
  }

  handleDelete(commentId: string) {
    this.http.delete(`/api/Comment/DeleteComment/${commentId}`).subscribe({
      next: (result) => {},
      error: (error) => console.error(error),
    });
  }
}
