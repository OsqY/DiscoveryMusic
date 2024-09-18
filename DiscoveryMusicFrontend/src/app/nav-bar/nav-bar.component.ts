import { Component, OnInit } from '@angular/core';
import { AuthService } from '../identity/service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  isSignedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.onStateChanged().forEach((state: boolean) => {
      this.isSignedIn = state;
    });
    this.authService.onRoleChanged().forEach((state: boolean) => {
      this.isAdmin = state;
    });
  }

  signOut() {
    if (this.isSignedIn) {
      this.authService.signOut().forEach((response) => {
        if (response) {
          this.router.navigateByUrl('');
        }
      });
    }
  }
}
