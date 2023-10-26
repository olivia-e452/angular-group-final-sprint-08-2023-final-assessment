import { Component } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { AuthService } from 'src/services/auth.service';
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

    editingAnnouncement: DisplayAnnouncement | null = null;

  
    constructor(private userService: UserService, private authService: AuthService) { }
  
    async ngOnInit(): Promise<void> {
      if (this.userService.username === "") {
        await this.authService.cookieCall();
      }

      this.user = this.userService.getUser();
      this.announcementsToDisplay = await this.userService.getSortedAnnouncements()
    }
  
    openModal(): void {
      this.modalOpen = true;
    }

    openModalForEdit(announcement: DisplayAnnouncement): void {
      console.log(announcement)
      this.editingAnnouncement = announcement;
      this.openModal();
  }
    
    //reload announcements after new one was posted
    async modalWasClosed(): Promise<void> {
      this.modalOpen = false;
      this.announcementsToDisplay = await this.userService.getSortedAnnouncements()
    }

}
