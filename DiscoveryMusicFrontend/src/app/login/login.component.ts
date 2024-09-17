import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../identity/service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  url: string = environment.baseUrl;
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  authFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  sendUserData() {
    this.authService
      .signIn(this.email, this.password)
      .forEach((response) => {
        if (response) {
          this.router.navigateByUrl('/');
        }
      })
      .catch((_) => {
        this.authFailed = true;
      });
  }
}
