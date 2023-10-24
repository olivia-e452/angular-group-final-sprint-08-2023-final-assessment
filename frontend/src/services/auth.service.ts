import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string | null = null;

  constructor() { }

  login(userName: string, password: string): Observable<boolean> {
    this.isLoggedIn = userName == 'fetched_username' && password == 'fetched_password';
    localStorage.setItem('LoginStatus', this.isLoggedIn ? "true" : "false");

    return of(this.isLoggedIn).pipe(
      delay(1000),
      tap(val => { 
         console.log("Is User Authentication is successful: " + val); 
      })
   );
  }

  logout(): void {
    this.isLoggedIn = false;
       localStorage.removeItem('isUserLoggedIn'); 
    }
}
