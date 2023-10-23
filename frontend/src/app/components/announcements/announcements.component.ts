import { Component } from '@angular/core';

type Announcement = {
  author: string;
  date: string;
  content: string;
}

type User = {
  name: string;
  email: string;
  password: string;
  company: string;
  admin: boolean;
}

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

    user: User | undefined;
    announcementsToDisplay: Announcement[] | undefined;
    announcementToCreate: Announcement | undefined;
    modalOpen = false;
  
    constructor() { }
  
    ngOnInit(): void {
      // retrieve a user from somwhere
      this.user = JSON.parse(localStorage.getItem('userData') || '{}');
      this.getAnnouncements();
    }
  
    getAnnouncements(): void {
      const company = localStorage.getItem('company');
      // a service like the one provided in the Spotify project woudld be nice
      // fetchFromCompany('GET', company, 'announcements')
    }
  
    handleNewAnnouncement(): void {
      const company = localStorage.getItem('company');
      // fetchFromCompany('POST', company, 'announcements', { announcement: this.announcementToCreate })
    }
  
    openModal(): void {
      this.modalOpen = true;
    }
  
    closeModal(): void {
      this.modalOpen = false;
    }

}
