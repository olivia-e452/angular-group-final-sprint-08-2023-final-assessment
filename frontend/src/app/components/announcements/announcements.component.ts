import { Component } from '@angular/core';

const DEFAULT_ANNOUNCEMENT: Announcement = {
  id: 0,  
  date: '',  
  title: '',
  message: '',
  author: {
    id: 0, 
    profile: {
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    },
    isAdmin: false,
    active: false,
    status: ''
  }
};

const DEFAULT_USER: User = {
  id: 0,
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

const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  {
    "id": 201,
    "date": "2023-10-24T09:15:30Z",
    "title": "New Features Rollout",
    "message": "We are excited to announce the rollout of several new features starting tomorrow. Check the updates section for more details.",
    "author": {
      "id": 2,
      "profile": {
        "firstname": "Alice",
        "lastname": "Smith",
        "email": "alice.smith@example.com",
        "phone": "234-567-8901"
      },
      "isAdmin": true,
      "active": true,
      "status": "ACTIVE"
    }
  },
  {
    "id": 202,
    "date": "2023-10-25T10:45:15Z",
    "title": "Server Upgrade",
    "message": "Our servers are being upgraded on the weekend. Minor interruptions might occur. We appreciate your patience.",
    "author": {
      "id": 3,
      "profile": {
        "firstname": "Bob",
        "lastname": "Johnson",
        "email": "bob.johnson@example.com",
        "phone": "345-678-9012"
      },
      "isAdmin": false,
      "active": true,
      "status": "ACTIVE"
    }
  },
  {
    "id": 203,
    "date": "2023-10-26T08:20:45Z",
    "title": "Holiday Schedule",
    "message": "Please note our support will have limited availability during the upcoming holiday. Regular hours will resume post-holiday.",
    "author": {
      "id": 4,
      "profile": {
        "firstname": "Carol",
        "lastname": "White",
        "email": "carol.white@example.com",
        "phone": "456-789-0123"
      },
      "isAdmin": false,
      "active": true,
      "status": "ACTIVE"
    }
  },
];


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

    user: User = DEFAULT_USER;
    announcementsToDisplay: Announcement[] | undefined;
    announcementToCreate: Announcement = DEFAULT_ANNOUNCEMENT
    modalOpen = false;
  
    constructor() { }
  
    ngOnInit(): void {
      // retrieve a user from somwhere, used to determine admin access & post author
      this.setDummyData()
      this.user = JSON.parse(localStorage.getItem('userData') || '{}');
      this.announcementsToDisplay = JSON.parse(localStorage.getItem('announcements') || '[]');
      this.getAnnouncements();
    }

    setDummyData(): void {
      localStorage.setItem('userData', JSON.stringify(DUMMY_USER));
      localStorage.setItem('announcements', JSON.stringify(DUMMY_ANNOUNCEMENTS));
    }
  
    async getAnnouncements(): Promise<void> {
      const company = localStorage.getItem('company');
      // this.announcementsToDisplay = await fetchFromAPI('GET', company, 'announcements')
    }
  
    handleNewAnnouncement(): void {
      
      // TODO: look at requestDTO to see how to send data to backend
      this.announcementToCreate.author = this.user;
      this.announcementToCreate.date = new Date().toString();
      console.log(this.announcementToCreate)
      
      const company = localStorage.getItem('company');
      // fetchFromAPI('POST', company, 'announcements', { announcement: this.announcementToCreate })
      
      this.closeModal();
    }
  
    openModal(): void {
      this.modalOpen = true;
    }
  
    closeModal(): void {
      this.announcementToCreate.title = '';
      this.announcementToCreate.message = '';
      this.modalOpen = false;
    }

}
