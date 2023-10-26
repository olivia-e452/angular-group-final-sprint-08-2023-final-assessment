import { Component } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { UserService } from 'src/services/user.service';

const DEFAULT_USER: User = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  },
  credentials: {
    username: "testy",
    password: "test"
  },
  admin: false,
  active: false,
  status: ''
};


const DUMMY_USER: User = {
  "id": 1,
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890"
  },
  "credentials": {
    "username": "testy",
    "password": "test"
  },
  "admin": true,
  "active": true,
  "status": "ACTIVE"
}



@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

    user: User = DEFAULT_USER;
    announcementsToDisplay: DisplayAnnouncement[] | undefined;
    company: Company | undefined;
    modalOpen = false;
  
    constructor(private userService: UserService) { }
  
    async ngOnInit(): Promise<void> {
      this.user = this.userService.getUser();
      this.announcementsToDisplay = await this.userService.getSortedAnnouncements()
    }
  
    openModal(): void {
      this.modalOpen = true;
    }
    
    //reload announcements after new one was posted
    async modalWasClosed(): Promise<void> {
      this.modalOpen = false;
      this.announcementsToDisplay = await this.userService.getSortedAnnouncements()
    }

}
