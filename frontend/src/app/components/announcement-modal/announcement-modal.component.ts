import { Component, Input, Output, EventEmitter } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { UserService } from 'src/services/user.service';

const DEFAULT_ANNOUNCEMENT: NewAnnouncement = {   
  title: '',
  message: '',
  author: {
    id: 0, 
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    credentials: {
      username: '',
      password: ''
    },
    admin: false,
    active: false,
    status: ''
  },
  companyName: ''
};

//announcement with valid user credentials from database
const TEST_ANNOUNCEMENT: NewAnnouncement = {
    title: "",
    message: "",
    author: {
        credentials: {
          username: "cousingreg",
          password: "mosteligiblebachelor"
        },
        profile: {
          firstName: "Greg",
          lastName: "Hirsch",
          email: "ghirsch@email.com",
          phone: "000-000-0000"
        },
        admin: false,
        active: false,
        status: ''
    }
  }

@Component({
  selector: 'app-announcement-modal',
  templateUrl: './announcement-modal.component.html',
  styleUrls: ['./announcement-modal.component.css']
})
export class AnnouncementModalComponent {
  
  @Input() modalOpen: boolean = false;
  @Input() announcementToEdit: DisplayAnnouncement | null = null;

  @Output() modalClosed = new EventEmitter<void>();

  announcementToCreate: NewAnnouncement = DEFAULT_ANNOUNCEMENT;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.announcementToEdit) {
        this.announcementToCreate.title = this.announcementToEdit.title;
        this.announcementToCreate.message = this.announcementToEdit.message;
    }
}
  async handleNewAnnouncement(){
    
    // TODO: look at requestDTO to see how to send data to backend
    /*
    this.announcementToCreate.author = this.userService.getUser();
    if (this.announcementToCreate.author.isAdmin) {
      this.announcementToCreate.companyName = this.userService.getCompany()?.name;
    }
    console.log("a2c", this.announcementToCreate)
    // company set in service from previous page
    //this.userService.createNewAnnouncement(this.announcementToCreate);
    */

   //hardcoded to post announcement to database
    // const response: DisplayAnnouncement = await fetchFromAPI('POST', 'announcements/add', this.announcementToCreate)
    if (this.announcementToEdit) {
      if (this.userService.getUser().admin) {
        console.log("user is admin")
        this.announcementToCreate.companyName = this.userService.getCompany()?.name;
      }
      console.log(this.announcementToEdit.id)
      await this.userService.patchAnnouncement(this.announcementToEdit.id, this.announcementToCreate);
    } else {
      await this.userService.createNewAnnouncement(this.announcementToCreate);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.announcementToCreate.title = '';
    this.announcementToCreate.message = '';
    this.modalClosed.emit();
  }
}
