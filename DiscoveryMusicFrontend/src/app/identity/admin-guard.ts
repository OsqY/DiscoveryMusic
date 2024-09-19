import { Injectable } from '@angular/core';
import { AuthService } from './service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    return this.isAdmin();
  }

  isAdmin(): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      }),
    );
  }
}
