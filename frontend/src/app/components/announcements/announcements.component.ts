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
    announcementsToDisplay: Announcement[] | undefined;
    company: Company | undefined;
    modalOpen = false;
  
    constructor(private userService: UserService) { }
  
    async ngOnInit(): Promise<void> {
      // retrieve a user from somwhere, used to determine admin access & post author
      // this.setDummyData()
      this.user = this.userService.getUser();
      // JSON.parse(localStorage.getItem('userData') || '{}');
      
      this.company = this.userService.getCompany();
      
      //this.announcementsToDisplay = JSON.parse(localStorage.getItem('announcements') || '[]');
      this.announcementsToDisplay = await this.userService.getAnnouncements();
      console.log(this.announcementsToDisplay)
    }

    // setDummyData(): void {
    //   localStorage.setItem('userData', JSON.stringify(DUMMY_USER));
    //   localStorage.setItem('announcements', JSON.stringify(DUMMY_ANNOUNCEMENTS));
    // }
  
    // async getAnnouncements(): Promise<void> {
    //   const endpoint = `company/${this.company!.id}/announcements`;
    //   this.announcementsToDisplay = await fetchFromAPI('GET', endpoint, 'announcements')
    // }
  
    openModal(): void {
      this.modalOpen = true;
    }
  
    async modalWasClosed(): Promise<void> {
      this.modalOpen = false;
      this.announcementsToDisplay = await this.userService.getAnnouncements()
      // this.getAnnouncements();
    }

}
