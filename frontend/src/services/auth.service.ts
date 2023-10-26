import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  redirectUrl: string | null = '';
  credentials!: Credentials;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const payload = { "username": username, "password": password }
    console.log(payload)
    this.http.post('http://localhost:8080/users/validate', payload).subscribe(
      () => {
        localStorage.setItem(this.tokenKey, "login_token")
        this.router.navigate([this.redirectUrl])
      });
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
