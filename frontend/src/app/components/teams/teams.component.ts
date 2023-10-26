import { Component } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';

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
  isUserAdmin: boolean = false;

  constructor(private userService : UserService, private authService: AuthService) { }

  showModal: boolean = false;

  async ngOnInit(): Promise<void> {
    if (this.userService.username === "") {
      await this.authService.cookieCall();
    }

    if (this.userService.user.admin) {
      this.isUserAdmin = true;
      await this.fetchTeams();
    }

    if (!this.userService.user.admin) {
      await this.fetchWorkerTeams();
    }
    console.log(this.teamData);
    console.log(this.teamData);
    console.log(this.userService.user);
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
    await this.fetchTeams();
    this.showModal = false;
  }

  async fetchTeams() {
    this.teamData = await fetchFromAPI("GET", "company/" + this.userService.companyID + "/teams");
    if (this.teamData !== undefined) {
      this.teamData.sort((a, b) => {
        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
      });;
    }
    if (this.teamData) {
      for (const team of this.teamData) {
        team.numberOfProjects = await this.getNumberOfProjects(this.userService.companyID, team.id);
      }
    }
  }

  async fetchWorkerTeams() {
    this.teamData = await fetchFromAPI("GET", "company/" + this.userService.companyID + "/teams");
    if (this.teamData !== undefined) {
      this.teamData = this.teamData.filter(team =>
        team.teammates.some(teammate => teammate.id === this.userService.user.id)
      );

      this.teamData.sort((a, b) => {
        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
      });;
    }
  }

}
