import { Injectable } from '@angular/core';
import fetchFromAPI from './api';

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

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User = dummyUser;
  company: Company | undefined;
  companyID : number = 0;
  
  team: Team | undefined;
  project: Project | undefined;

  constructor() { }

  setUser(user: any){
    this.user = user;
    this.company = user['companies'][0];
    this.setCompany(user['companies'][0]['id']);
  }

  getUser() {
    return this.user;
  }

  setCompany(companyId: number) {
    //this.company = this.user.companies?.find(company => company.id === companyId);
    this.companyID = companyId;
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

  getProjects = async() => {
    let projects : Project[] = [];
    //if (this.user.teams !== undefined) {
    //  for (let i = 0; i < this.user.teams.length; i++) {
    //     const endpoint = `company/${this.company?.id}/teams/${this.user.teams[i]}/projects/team`;
        const endpoint = `company/${this.companyID}/teams/11/projects/team`;
        const response = await fetchFromAPI('GET', endpoint);
        projects.push.apply(projects, response);
    // }
    //}
    return projects;
  }

  async createNewProject(projectToCreate: Project) {
    //const endpoint = `company/${this.company?.id}/teams/${projectToCreate.team.id}/projects`;
    const endpoint = `company/${this.companyID}/teams/11/projects`;
    const response = await fetchFromAPI('POST', endpoint, projectToCreate);
    return response;
  }

  async editProject(editedProject: Project) {
    //const endpoint = `company/${this.company?.id}/teams/${editedProject.team.id}/projects/${editedProject.id}`;
    const endpoint = `company/${this.companyID}/teams/11/projects/${editedProject.id}`;
    const response = await fetchFromAPI('PATCH', endpoint, editedProject);
    return response;
  }

  getTeamById = async(id : number) => {
      const endpoint = `teams/${id}`;
      const response = await fetchFromAPI('GET', endpoint);
      return response;
  }

  
}