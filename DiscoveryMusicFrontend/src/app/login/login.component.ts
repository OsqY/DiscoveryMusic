import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { User } from '../register/User';
import { AuthService } from '../identity/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  url: string = environment.baseUrl;
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  formIsInvalid: boolean = true;
  isRegistrationValid: boolean = false;
  user: User = new User();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  sendUserData() {
    this.user.email = this.email;
    this.user.password = this.password;
    this.authService
      .signIn(this.user.email, this.user.password)
      .forEach((response) => {
        if (response) {
          this.router.navigateByUrl('/');
        }
      });
  }
}
