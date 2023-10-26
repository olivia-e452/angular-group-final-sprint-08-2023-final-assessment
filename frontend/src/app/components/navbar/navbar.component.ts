import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  showAdminMsg = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //if(localStorage.getItem('ROLE') == 'ADMIN') this.showAdminMsg = true
  }

  public logout() {
    this.authService.logout()
  }

}
