import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  url: string = environment.baseUrl;
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  formIsInvalid: boolean = true;
  isRegistrationValid: boolean = false;
  user: User = new User();
  router: Router = new Router();

  constructor(private http: HttpClient) {}

  sendUserData() {
    this.user.email = this.email;
    this.user.password = this.password;
    this.http.post<any>(this.url + '/register', this.user).subscribe((res) => {
      this.isRegistrationValid = true;
      this.router.navigate(['login']).catch((error) => console.error(error));
    });
  }
}
