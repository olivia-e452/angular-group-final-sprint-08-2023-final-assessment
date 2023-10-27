import { ChangeDetectorRef, Component } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

// type User = {
//   name: string
//   email: string;
//   active: boolean;
//   admin: boolean;
//   status: string;
// }
/*type Company = {
  id: number;
  name: string;
  description: string;
  teams: Team[];
  users: User[];
};
*/
type UserProfile = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};



@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent {
  users: User[] = [];
  showModal: boolean = false;
  t: any
  company: any
  constructor (private userService : UserService, private cdr: ChangeDetectorRef, private authService: AuthService) {

  }

  async ngOnInit()  {
    if (this.userService.username === "") {
      await this.authService.cookieCall();
    }
    this.company = this.userService.getCompany()
    this.users = await this.userService.getUsersFromCompany(this.company.id)
    console.log(this.users)
  }

  openModal() {
    this.showModal = true;
  }
 
  async CloseModal() {
    this.showModal = false
    this.company = this.userService.getCompany()
    this.users = await this.userService.getUsersFromCompany(this.company.id)
    
  }  
}
