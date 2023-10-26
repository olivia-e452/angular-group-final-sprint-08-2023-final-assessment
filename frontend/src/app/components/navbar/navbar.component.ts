import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout()
  }

}
