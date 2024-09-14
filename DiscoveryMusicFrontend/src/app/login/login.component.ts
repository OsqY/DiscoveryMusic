import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { User } from '../register/User';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  sendUserData() {
    this.user.email = this.email;
    this.user.password = this.password;
    this.http
      .post<any>(
        this.url + '/login?useCookies=true&useSessionCookies=true',
        this.user,
      )
      .subscribe((res) => {
        if (res.status === 200) {
          this.isRegistrationValid = true;
          console.log('OKK');
        }
      });
  }
}
