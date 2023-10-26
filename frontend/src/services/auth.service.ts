import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import fetchFromAPI from 'src/services/api';
import { UserService } from './user.service';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  roleAs!: string | null;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private errorService: ErrorService) {
  }

  login(username: string, password: string) {
    this.settingUser(username, password)
    if(this.errorService.getError() != undefined){
      return of({ login_status: false, role: '' });
    }
    localStorage.setItem('LOGIN_STATE', 'true')
    this.isLogin = true
    if (this.userService.getUser().isAdmin) {
      localStorage.setItem('ROLE', 'ADMIN')
      this.roleAs = 'ADMIN'
    }
    else {
      localStorage.setItem('ROLE', 'WORKER')
      this.roleAs = 'WORKER'
    }
    return of({ login_status: this.isLogin, role: this.roleAs });
  }

  async settingUser(username: string, password: string) {
    const payload = { "username": username, "password": password }
    //this.userService.setUser(await fetchFromAPI('POST', `users/login`, payload));
    try {
      await fetchFromAPI('POST', `users/login`, payload)
    } catch (error) {
      console.log("fdsjskajhgfasjkdhgjkh")
      if (error instanceof HttpErrorResponse) {
        this.handleHttpError(error);
      }
    } finally {
      console.log('We do cleanup here');
    }
  }


  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('LOGIN_STATE', 'false');
    localStorage.setItem('ROLE', '');
    return of({ success: this.isLogin, role: '' });
  }

  public isLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('LOGIN_STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 403) {
      // Handle rate limit exceeded error
      const customError = {
        error: 'API rate limit exceeded',
        tips: 'Please try again later.',
      };
      this.errorService.setError(customError);
    } else if (error.status === 404) {
      // Handle not found error
      const customError = {
        error: 'Not found',
        tips: 'The user was not found.',
      };
      this.errorService.setError(customError);
    } else {
      // Handle other HTTP errors
      const customError = {
        error: 'An error occurred',
        tips: 'Please try again later.',
      };
      this.errorService.setError(customError);
    }
  }
}
