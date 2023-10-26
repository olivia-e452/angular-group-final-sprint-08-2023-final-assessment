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
  noUser = false;
  user!: User

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private errorService: ErrorService) {
  }

  async login(username: string, password: string) {
    const payload = { "username": username, "password": password }
    await fetchFromAPI('POST', `users/login`, payload).then((result)=> {
      if(result == undefined){
        this.noUser = true;
      }      
      else{
        this.noUser = false;
        this.user = result
      }
    })
    if(this.noUser) return of({ login_status: false, role: '' });
    localStorage.setItem('LOGIN_STATE', 'true')
    this.isLogin = true
    this.userService.setUser(this.user);
    if (this.userService.getUser().admin) {
      localStorage.setItem('ROLE', 'ADMIN')
      this.roleAs = 'ADMIN'
    }
    else {
      localStorage.setItem('ROLE', 'WORKER')
      this.roleAs = 'WORKER'
    }
    return of({ login_status: this.isLogin, role: this.roleAs });
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('LOGIN_STATE', 'false');
    localStorage.setItem('ROLE', '');
    this.router.navigateByUrl(''); 
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
}
