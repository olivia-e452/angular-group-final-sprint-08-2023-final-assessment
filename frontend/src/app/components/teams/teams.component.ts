import { Component } from '@angular/core';
import { TeamsServiceService } from 'src/services/teams-service.service';
import fetchFromAPI from 'src/services/api';
import { UserService } from 'src/services/user.service';

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
  teammates: User[]
}


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  userData: any = {};
  teamData: Team[] | undefined;

  constructor(private userService : UserService) { }

  showModal: boolean = false;

  async ngOnInit(): Promise<void> {
    await this.fetchTeams();
    console.log(this.teamData);
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
  }
}
