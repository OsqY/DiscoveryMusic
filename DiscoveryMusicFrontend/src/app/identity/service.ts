import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { Role, UserInfo } from './dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private _roleChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);

  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  public onRoleChanged() {
    return this._roleChanged.asObservable();
  }

  public signIn(email: string, password: string) {
    return this.http
      .post(
        '/login?useCookies=true',
        {
          email: email,
          password: password,
        },
        {
          observe: 'response',
          responseType: 'text',
        },
      )
      .pipe<boolean>(
        map((res: HttpResponse<string>) => {
          this._authStateChanged.next(res.ok);
          return res.ok;
        }),
      );
  }

  public register(email: string, password: string) {
    return this.http
      .post(
        '/register',
        {
          email: email,
          password: password,
        },
        {
          observe: 'response',
          responseType: 'text',
        },
      )
      .pipe<boolean>(
        map((res: HttpResponse<string>) => {
          if (res.ok) {
            this._authStateChanged.next(false);
          }
          return res.ok;
        }),
      );
  }

  public signOut() {
    return this.http
      .post(
        '/logout',
        {},
        {
          withCredentials: true,
          observe: 'response',
          responseType: 'text',
        },
      )
      .pipe<boolean>(
        map((res: HttpResponse<string>) => {
          if (res.ok) {
            this._authStateChanged.next(false);
          }
          return res.ok;
        }),
      );
  }

  public user() {
    return this.http
      .get<UserInfo>('/manage/info', {
        withCredentials: true,
      })
      .pipe(
        catchError((_: HttpErrorResponse, __: Observable<UserInfo>) => {
          return of({} as UserInfo);
        }),
      );
  }

  public isSignedIn(): Observable<boolean> {
    return this.user().pipe(
      map((userInfo) => {
        const isLoggedIn = !!userInfo && !!userInfo.email;
        this._authStateChanged.next(isLoggedIn);
        return isLoggedIn;
      }),
      catchError(() => {
        this._authStateChanged.next(false);
        return of(false);
      }),
    );
  }

  public role() {
    return this.http.get<Role>('/api/User/GetRole', {
      withCredentials: true,
      observe: 'response',
    });
  }

  public isAdmin(): Observable<boolean> {
    return this.role().pipe(
      map((response) => {
        const role = response.body;
        if (role?.role === 'Admin') {
          console.log('aaa');
          this._roleChanged.next(true);
          return true;
        }
        this._roleChanged.next(false);
        return false;
      }),
      catchError(() => {
        this._roleChanged.next(false);
        return of(false);
      }),
    );
  }
}
