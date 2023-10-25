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

  constructor() { }

  showModal: boolean = false;

  async ngOnInit(): Promise<void> {
    this.teamData = await fetchFromAPI("GET", "company/6/teams");
    console.log(this.teamData);
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
