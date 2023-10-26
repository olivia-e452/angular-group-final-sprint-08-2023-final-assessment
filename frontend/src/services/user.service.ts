import { Injectable } from '@angular/core';
import fetchFromAPI from './api';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

const dummyUser: User = {
  id: 1,
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

  admin: true,
  active: false,
  status: '',
  companies: [
      {
          id: 1,
          name: "Tech Corp",
          description: "A leading tech company.",
          teams: [
              { id: 1, name: "Engineering", description: "Builds the main products.", users: [] },
              { id: 2, name: "Design", description: "Designs interfaces and experiences.", users: [] }
          ],
          users: [] 
      },
      {
          id: 2,
          name: "Health Inc",
          description: "Revolutionizing health solutions.",
          teams: [
              { id: 3, name: "Research", description: "Discovers new health solutions.", users: [] },
              { id: 4, name: "Support", description: "Assists customers with their issues.", users: [] }
          ],
          users: []
      },
      {
          id: 3,
          name: "EcoSolutions",
          description: "Environmentally friendly products.",
          teams: [
              { id: 5, name: "Product", description: "Designs eco-friendly products.", users: [] },
              { id: 6, name: "Marketing", description: "Promotes the products.", users: [] }
          ],
          users: []
      }
  ],
  teams: [
      { id: 1, name: "Engineering", description: "Builds the main products.", users: [] },
      { id: 3, name: "Research", description: "Discovers new health solutions.", users: [] },
      { id: 5, name: "Product", description: "Designs eco-friendly products.", users: [] }
  ]
}
const dummyCompany: Company = {
  id: 6,
  name: "EcoSolutions",
  description: "Environmentally friendly products.",
  teams: [
      { id: 5, name: "Product", description: "Designs eco-friendly products.", users: [] },
      { id: 6, name: "Marketing", description: "Promotes the products.", users: [] }
  ],
  users: []
}

const DUMMY_ANNOUNCEMENTS: DisplayAnnouncement[] = [
  {
    "id": 201,
    "date": "2023-10-24T09:15:30Z",
    "title": "New Features Rollout",
    "message": "We are excited to announce the rollout of several new features starting tomorrow. Check the updates section for more details.",
    "author": {
      "id": 2,
      "profile": {
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice.smith@example.com",
        "phone": "234-567-8901"
      },
      "credentials": {
        "username": "",
        "password": ""
      },
      "admin": true,
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
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob.johnson@example.com",
        "phone": "345-678-9012"
      },
      "credentials": {
        "username": "",
        "password": ""
      },
      "admin": false,
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
        "firstName": "Carol",
        "lastName": "White",
        "email": "carol.white@example.com",
        "phone": "456-789-0123"
      },
      "credentials": {
        "username": "",
        "password": ""
      },
      "admin": false,
      "active": true,
      "status": "ACTIVE"
    }
  },
  {
    "id": 201,
    "date": "2023-10-24T09:15:30Z",
    "title": "New Features Rollout",
    "message": "We are excited to announce the rollout of several new features starting tomorrow. Check the updates section for more details.",
    "author": {
      "id": 2,
      "profile": {
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice.smith@example.com",
        "phone": "234-567-8901"
      },
      "credentials": {
        "username": "",
        "password": ""
      },
      "admin": true,
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
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob.johnson@example.com",
        "phone": "345-678-9012"
      },
      "credentials": {
        "username": "",
        "password": ""
      },
      "admin": false,
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
        "firstName": "Carol",
        "lastName": "White",
        "email": "carol.white@example.com",
        "phone": "456-789-0123"
      },
      "credentials": {
        "username": "",
        "password": ""
      },
      "admin": false,
      "active": true,
      "status": "ACTIVE"
    }
  },
];


@Injectable({
  providedIn: 'root'
})

export class UserService {


  user: User = dummyUser;
  company: Company | undefined = dummyCompany;
  companyID : number = 0;
  username : String = "";
  password : String = "";
  admin : boolean = false;
  
  team: Team | undefined;
  project: Project | undefined;

  constructor(private errorService: ErrorService, private cookieService: CookieService) {}

  setUser(user: any, username : String, password : String){
    this.user = user;
    this.company = user['companies'][0];
    this.companyID = user['companies'][0]['id'];
    this.username = username;
    this.password = password;
    this.admin = user['admin'];

    this.cookieService.set("companyId", this.companyID.toString());
    this.cookieService.set("username", username.toString());
  }

  getUser() {
    return this.user;
  }

  setCompany(companyId: number) {
    //this.company = this.user.companies?.find(company => company.id === companyId);
    this.companyID = companyId;
    this.cookieService.set("companyId", this.companyID.toString());
  }

  getCompany() {
    return this.company;
  }

  async getSortedAnnouncements(): Promise<DisplayAnnouncement[]> {
    // const endpoint = `company/${this.company!.id}/announcements`;
    const endpoint = `company/${this.companyID}/announcements`;
    const response: DisplayAnnouncement[] = await fetchFromAPI("GET", endpoint);
    return response.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });;
  }
  
  async createNewAnnouncement(announcementToCreate: Announcement) {
    // const response: Announcement = await fetchFromAPI('POST', `company/${this.company?.id}/announcements`, announcementToCreate)
    announcementToCreate.author = this.user;
    const response: DisplayAnnouncement = await fetchFromAPI('POST', 'announcements/add', announcementToCreate)
    console.log(`Announcement created with id: ${response.id}`) 
  }

  async patchAnnouncement(id: number, announcementToUpdate: NewAnnouncement) {
    console.log(this.user)
    const response: DisplayAnnouncement = await fetchFromAPI('PATCH', `announcements/update/${id}`, announcementToUpdate)
    console.log('id', id)
    console.log("old", announcementToUpdate)
    console.log("updated", response)
    // console.log(`Announcement updated with id: ${response.id}`)
  }


  getProjectsByTeam = async(id : number) => {
    const endpoint = `company/${this.company?.id}/teams/${id}/projects/team`;
    const response = await fetchFromAPI('GET', endpoint);
    return response;
  }

  async createNewProject(projectToCreate: Project) {
    const endpoint = `company/${this.company?.id}/teams/${projectToCreate.team.id}/projects`;
    const response = await fetchFromAPI('POST', endpoint, projectToCreate);
    return response;
  }

  async editProject(editedProject: Project) {
    const endpoint = `company/${this.company?.id}/teams/${editedProject.team.id}/projects/${editedProject.id}`;
    const response = await fetchFromAPI('PATCH', endpoint, editedProject);
    return response;
  }

  getTeamById = async(id : number) => {
      const endpoint = `teams/${id}`;
      const response = await fetchFromAPI('GET', endpoint);
      return response;
  }


  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 403) {
      // Handle rate limit exceeded error
      const customError = {
        error: 'API rate limit exceeded',
        tips: 'Please try again later.',
      };
      this.errorService.setError(customError);
    } else if (error.status === 404) {
      // Handle not found error
      const customError = {
        error: 'Not found',
        tips: 'The user was not found.',
      };
      this.errorService.setError(customError);
    } else {
      // Handle other HTTP errors
      const customError = {
        error: 'An error occurred',
        tips: 'Please try again later.',
      };
      this.errorService.setError(customError);
    }
  }
}