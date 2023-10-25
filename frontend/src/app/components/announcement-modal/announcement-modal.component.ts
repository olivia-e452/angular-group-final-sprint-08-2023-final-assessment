import { Component, Input, Output, EventEmitter } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { UserService } from 'src/services/user.service';

const DEFAULT_ANNOUNCEMENT: NewAnnouncement = {   
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
  },
  companyName: ''
};

@Component({
  selector: 'app-announcement-modal',
  templateUrl: './announcement-modal.component.html',
  styleUrls: ['./announcement-modal.component.css']
})
export class AnnouncementModalComponent {
  
  @Input() modalOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  announcementToCreate: NewAnnouncement = DEFAULT_ANNOUNCEMENT;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  handleNewAnnouncement(): void {
    
    // TODO: look at requestDTO to see how to send data to backend
    
    this.announcementToCreate.author = this.userService.getUser();
    if (this.announcementToCreate.author.isAdmin) {
      this.announcementToCreate.companyName = this.userService.getCompany()?.name;
    }
    console.log("a2c", this.announcementToCreate)
    // company set in service from previous page
    this.userService.createNewAnnouncement(this.announcementToCreate);
    this.closeModal();
  }

  closeModal(): void {
    this.announcementToCreate.title = '';
    this.announcementToCreate.message = '';
    this.modalClosed.emit();
  }
}