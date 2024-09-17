import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../shared-module';
import { AuthService } from '../identity/service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent implements OnInit {
  content: string = '';
  rating: number = 0;
  albumId: string = '';
  isSignedIn: boolean = false;

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
}
