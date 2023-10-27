import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthService) {}

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }

  isAdmin(){
    const role = localStorage.getItem('ROLE');
    if(role == 'ADMIN') return true;
    else return false;
  }
}
