import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-worker-navbar',
  templateUrl: './worker-navbar.component.html',
  styleUrls: ['./worker-navbar.component.css']
})
export class WorkerNavbarComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //if(localStorage.getItem('ROLE') == 'ADMIN') this.showAdminMsg = true
  }

  public logout() {
    this.authService.logout()
  }

}
