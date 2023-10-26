import { Injectable } from '@angular/core';
import fetchFromAPI from './api';

const DEFAULT_USER: User = {
  id: 0,
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
  isAdmin: false,
  active: false,
  status: '',
  companies: [],
  teams: []
};

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
  isAdmin: true,
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
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob.johnson@example.com",
        "phone": "345-678-9012"
      },
      "credentials": {
        "username": "",
        "password": ""
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
        "firstName": "Carol",
        "lastName": "White",
        "email": "carol.white@example.com",
        "phone": "456-789-0123"
      },
      "credentials": {
        "username": "",
        "password": ""
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
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice.smith@example.com",
        "phone": "234-567-8901"
      },
      "credentials": {
        "username": "",
        "password": ""
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
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob.johnson@example.com",
        "phone": "345-678-9012"
      },
      "credentials": {
        "username": "",
        "password": ""
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
        "firstName": "Carol",
        "lastName": "White",
        "email": "carol.white@example.com",
        "phone": "456-789-0123"
      },
      "credentials": {
        "username": "",
        "password": ""
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

  user: User = dummyUser;
  company: Company | undefined;
  
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

  async getSortedAnnouncements(): Promise<DisplayAnnouncement[]> {
    // const endpoint = `company/${this.company!.id}/announcements`;
    const endpoint = `company/6/announcements`;
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

  getProjects = async() => {
    let projects : Project[] = [];
    //if (this.user.teams !== undefined) {
    //  for (let i = 0; i < this.user.teams.length; i++) {
    //     const endpoint = `company/${this.company?.id}/teams/${this.user.teams[i]}/projects/team`;
        const endpoint = `company/6/teams/11/projects/team`;
        const response = await fetchFromAPI('GET', endpoint);
        projects.push.apply(projects, response);
    // }
    //}
    return projects;
  }

  async createNewProject(projectToCreate: Project) {
    //const endpoint = `company/${this.company?.id}/teams/${projectToCreate.team.id}/projects`;
    const endpoint = `company/6/teams/11/projects`;
    const response = await fetchFromAPI('POST', endpoint, projectToCreate);
    return response;
  }

  async editProject(editedProject: Project) {
    //const endpoint = `company/${this.company?.id}/teams/${editedProject.team.id}/projects/${editedProject.id}`;
    const endpoint = `company/6/teams/11/projects/${editedProject.id}`;
    const response = await fetchFromAPI('PATCH', endpoint, editedProject);
    return response;
  }

  getTeamById = async(id : number) => {
      const endpoint = `teams/${id}`;
      const response = await fetchFromAPI('GET', endpoint);
      return response;
  }
}