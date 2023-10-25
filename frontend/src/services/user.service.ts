import { Injectable } from '@angular/core';
import fetchFromAPI from './api';

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
  status: '',
  companies: [],
  teams: []
};

const dummyUser: User = {
  id: 1,
  profile: {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      phone: "+1234567890"
  },
  isAdmin: true,
  active: true,
  status: "active",
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


@Injectable({
  providedIn: 'root'
})

export class UserService {

  // dummy user for testing
  user: User = dummyUser;
  company: Company | undefined;
  
  // sample fields, you may need something else derived from a user or other API call
  team: Team | undefined;
  project: Project | undefined;

  constructor() { }

  // for use with login
  async fetchUser(username: string) {
    this.user = await fetchFromAPI('GET', `users/${username}`);
  }

  getUser() {
    return this.user;
  }

  setCompany(companyId: number) {
    this.company = this.user.companies?.find(company => company.id === companyId);
  }

  getCompany() {
    return this.company;
  }

  // dummy announcements for testing
  async getAnnouncements(): Promise<Announcement[]> {
    // const endpoint = `company/${this.company!.id}/announcements`;
    // const response = await fetchFromAPI('GET', endpoint, 'announcements')
    // parse response and return
    return DUMMY_ANNOUNCEMENTS
  }

  async createNewAnnouncement(announcementToCreate: Announcement) {
    const response: Announcement = await fetchFromAPI('POST', `company/${this.company?.id}/announcements`, announcementToCreate)
    console.log(`Announcement created with id: ${response.id}`) 
  }
  // getters and setters for team, project, users, etc.

  // API calls, etc.


}
