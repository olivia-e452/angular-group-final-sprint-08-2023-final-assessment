import { Component } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { UserService } from 'src/services/user.service';

const DEFAULT_USER: User = {
  profile: {
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  },
  credentials: {
    username: "testy",
    password: "test"
  },
  isAdmin: false,
  active: false,
  status: ''
};


const DUMMY_USER: User = {
  "id": 1,
  "profile": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890"
  },
  "credentials": {
    "username": "testy",
    "password": "test"
  },
  "isAdmin": true,
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
      // retrieve a user from somwhere, used to determine admin access & post author
      this.user = this.userService.getUser();

      //actual data from API call
      
      //this.announcementsToDisplay = await this.userService.getAnnouncements();
      this.announcementsToDisplay = await fetchFromAPI("GET", 'company/6/announcements');
      console.log(this.announcementsToDisplay);
    }
  
    openModal(): void {
      this.modalOpen = true;
    }
  
    //reload announcements after new one was posted
    async modalWasClosed(): Promise<void> {
      this.modalOpen = false;
      //this.announcementsToDisplay = await this.userService.getAnnouncements()
      this.announcementsToDisplay = await fetchFromAPI("GET", 'company/6/announcements');
    }

}
