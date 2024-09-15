import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  comment!: Comment;
  url: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  sendData(comment: Comment) {
    this.comment = comment;

    this.http
      .post<string>(this.url + '/api/Comment/CreateComment', comment, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status === 201) {
          this.router.navigateByUrl('');
        }
      });
  }
}
