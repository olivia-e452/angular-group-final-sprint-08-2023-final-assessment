import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import fetchFromAPI from 'src/services/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

<<<<<<< Updated upstream
  private tokenKey = 'user_logged_in';
  //redirectUrl: string | null = '';
  private cred_Status!: Observable<boolean | null>;
=======
  private tokenKey = 'token';
  private tokenExpirationKey = 'token_expiration'
  private EXPIRATION_TIME = 1000 * 60 * 60 // 1 hour

  redirectUrl: string | null = '';
  credentials!: Credentials;
>>>>>>> Stashed changes

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    const payload = { "username": username, "password": password }
<<<<<<< Updated upstream
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
=======
    let headers =  { 'Content-Type': 'application/json' }
    console.log(payload)
    this.http.post('http://localhost:8080/users/validate', payload, {headers}).subscribe(
      () => {
        const expiresAt = new Date().getTime() + this.EXPIRATION_TIME;
        localStorage.setItem(this.tokenExpirationKey, expiresAt.toString())
        localStorage.setItem(this.tokenKey, "login_token")

        this.router.navigate([this.redirectUrl])
      });
    //this.tryLogin(payload);
  }

  async tryLogin(item: any) {
    const response = fetchFromAPI("POST", 'users/validate', item);
>>>>>>> Stashed changes
  }

  logout() {
    localStorage.removeItem(this.tokenExpirationKey);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    let expiration = localStorage.getItem(this.tokenExpirationKey);
    
    if (expiration && Date.now() > parseInt(expiration)) {
      this.logout();
      return false;
    }
    
    return token != null && token.length > 0 
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
