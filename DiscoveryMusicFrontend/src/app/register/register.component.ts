import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../shared-module';
import { AuthService } from '../identity/service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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
      .register(this.email, this.password)
      .forEach((response) => {
        if (response) {
          this.router.navigateByUrl('login');
        }
      })
      .catch((_) => {
        this.authFailed = true;
      });
  }
}
