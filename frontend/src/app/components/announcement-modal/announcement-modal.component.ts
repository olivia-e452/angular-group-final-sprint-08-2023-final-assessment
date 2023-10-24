import { Component, Input, Output, EventEmitter } from '@angular/core';
import fetchFromAPI from 'src/services/api';

const DEFAULT_ANNOUNCEMENT: Announcement = {  
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

@Component({
  selector: 'app-announcement-modal',
  templateUrl: './announcement-modal.component.html',
  styleUrls: ['./announcement-modal.component.css']
})
export class AnnouncementModalComponent {
  
  @Input() user: User | undefined;
  @Input() modalOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  // @Input() postEndpoint: string = '';
  announcementToCreate: Announcement = DEFAULT_ANNOUNCEMENT;
  // thinToCreate: Thing = DEFAULT_THING;
  constructor() { }

  ngOnInit(): void {
  }

  handleNewAnnouncement(): void {
    // TODO: look at requestDTO to see how to send data to backend
    this.announcementToCreate.author = this.user!;
    this.announcementToCreate.date = new Date().toString();
    console.log("a2c", this.announcementToCreate)
    
    // available via a service
    // const company = localStorage.getItem('company');
    const companyId = 22342
    fetchFromAPI('POST', `company/${companyId}/announcements`, this.announcementToCreate)
    this.closeModal();
  }

  /* possible implementation for reuse
  
  handleNewThing(): void {
    this.thingToCreate = buildThing();
    fetchFromAPI('POST', this.postEndpoint, this.thingToCreate)
    this.closeModal()
  }
  
  */

  closeModal(): void {
    this.announcementToCreate.title = '';
    this.announcementToCreate.message = '';
    this.modalClosed.emit();
  }
}
