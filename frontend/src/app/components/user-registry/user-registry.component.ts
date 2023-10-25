import { Component } from '@angular/core';

interface User {
  name: string
  email: string;
  active: boolean;
  admin: boolean;
  status: string;
}

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent {
  users: User[] = [
    
  ];
  showModal: boolean = false;

  

  ngOnInit() {
    const a = { name: 'User1', email: 'user1@example.com',  active: true, admin: false, status: 'JOINED' }
    const b = { name: 'User2', email: 'user2@example.com', active: false, admin: true, status: 'Inactive' }
    this.users.push(a)
    this.users.push(b)
  }

  



  getUsers() {
    //send a getAllUsers to the backend. 
    //assuming it returns a list, add each user to the users array. This will be called on initialization. 
  }
  

  toggleModal() {
    console.log("hi")
    this.showModal = true
  }

  onCloseModal() {
    this.showModal = false
  }

  
}
