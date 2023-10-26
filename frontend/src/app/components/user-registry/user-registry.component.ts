import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

type User = {
  name: string
  email: string;
  active: boolean;
  admin: boolean;
  status: string;
}
type Company = {
  id: number;
  name: string;
  description: string;
  teams: Team[];
  users: User[];
};

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
  users: User[] = [
    
  ];
  showModal: boolean = false;
  constructor (private userService : UserService) {

  }

  

  ngOnInit() {
    const a = { name: 'User1', email: 'user1@example.com',  active: true, admin: false, status: 'JOINED' }
    const b = { name: 'User2', email: 'user2@example.com', active: false, admin: true, status: 'Inactive' }
    this.users.push(a)
    this.users.push(b)
    const t = this.userService.getCompany
    console.log(t)
   



  }

  



  getUsers() {
    //send a getAllUsers to the backend. 
    //assuming it returns a list, add each user to the users array. This will be called on initialization. 
  }
  

  openModal() {
    this.showModal = true;
  }

  CloseModal() {
    this.showModal = false
  }

  
}
