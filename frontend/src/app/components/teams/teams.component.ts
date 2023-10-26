import { Component } from '@angular/core';
import { TeamsServiceService } from 'src/services/teams-service.service';
import fetchFromAPI from 'src/services/api';

interface Profile {
  firstName: string,
  lastName: string,
  email:string,
  phone: string
}

interface User {
    id: number,
    profile: Profile,
    isAdmin: boolean,
    active: boolean,
    status: string
  }

interface Team {
  id: number,
  name: string,
  description: string,
  teammates: User[],
  numberOfProjects?: number
}


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  userData: any = {};
  teamData: Team[] | undefined;

  constructor() { }

  showModal: boolean = false;

  async ngOnInit(): Promise<void> {
    this.teamData = await fetchFromAPI('GET', 'company/6/teams');
    console.log(this.teamData);
    // Fetch the number of projects for each team and update teamData
    if (this.teamData) {
      for (const team of this.teamData) {
        team.numberOfProjects = await this.getNumberOfProjects(6, team.id);
      }
    }
    console.log(this.teamData);
  }
  async getNumberOfProjects(
    companyId: number,
    teamId: number
  ): Promise<number> {
    try {
      const response = await fetchFromAPI(
        'GET',
        `company/${companyId}/teams/${teamId}/projects/team`
      );
      return response.length;
    } catch (error) {
      console.error(`Error fetching projects for Team ${teamId}:`, error);
      // Return 0 projects in case of an error
    }
    return 0;
  }


  openModal() {
    this.showModal = true;
  }

  async closeModal() {
    this.teamData = await fetchFromAPI("GET", "company/6/teams");
    this.showModal = false;
  }

}
