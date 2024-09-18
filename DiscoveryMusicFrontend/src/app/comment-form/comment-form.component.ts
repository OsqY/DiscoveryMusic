import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../shared-module';
import { AuthService } from '../identity/service';
import { UserComment } from '../album/AlbumResponse';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent implements OnInit, OnChanges {
  @Input() userComment!: UserComment;
  content: string = '';
  rating: number = 0;
  albumId: string = '';
  isSignedIn: boolean = false;
  isEdit: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getParam();
    this.authService.onStateChanged().forEach((state: boolean) => {
      this.isSignedIn = state;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userComment'] && changes['userComment'].currentValue) {
      this.handleEdit();
    }
  }

  sendData() {
    this.http
      .post<string>(
        '/api/Comment/CreateComment',
        { content: this.content, rating: this.rating, albumId: this.albumId },
        {
          withCredentials: true,
          observe: 'response',
        },
      )
      .subscribe((response) => {
        if (response.status === 201) {
          this.router.navigateByUrl('');
        }
      });
  }

  getParam() {
    this.route.paramMap.subscribe((params) => {
      this.albumId = params.get('id') ?? '';
    });
  }

  updateRating(newRating: number) {
    this.rating = newRating;
  }

  handleEdit() {
    this.isEdit = true;
    this.content = this.userComment!.content;
    this.rating = this.userComment!.rating;
  }

  handleUpdate() {
    if (this.userComment) {
      this.updateComment(this.userComment.id.toString());
    }
  }

  updateComment(commentId: string) {
    this.http
      .put(`/api/Comment/UpdateComment/${commentId}`, {
        content: this.content,
        rating: this.rating,
      })
      .subscribe({
        next: (result) => {},
        error: (error) => console.error(error),
      });
  }
}
