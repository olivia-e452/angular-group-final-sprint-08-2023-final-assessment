import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import fetchFromAPI from 'src/services/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'user_logged_in';
  //redirectUrl: string | null = '';
  private cred_Status!: Observable<boolean | null>;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    const payload = { "username": username, "password": password }
    let headers = { 'Content-Type': 'application/json' }
    return this.http.post('http://localhost:8080/users/validate', payload, { headers })
      /*.subscribe({
        next: (res) => {
          localStorage.setItem(this.tokenKey, "login_token")
        },
        error: (e) => alert("error"),
        complete: ()=> console.info('complete')
      })*/
      .pipe(map(user => {
        localStorage.setItem(this.tokenKey, "login_token")
        //console.log(localStorage.getItem('user')); 
        return user;
      }))
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
