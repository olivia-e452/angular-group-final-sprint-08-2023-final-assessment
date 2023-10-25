import { Component } from '@angular/core';
import { TeamsServiceService } from 'src/services/teams-service.service';

interface Profile {
  firstname: string,
  lastname: string,
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
  users: [User]
}


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  userData: any = {};
  teamData: Team[] | undefined;

  constructor(private teamService: TeamsServiceService) { }

  showModal: boolean = false;

  NgOnInit(): void {
    console.log('testing')
    this.teamService.getTeams(18).subscribe(data => {
      this.teamData = data;
    });
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
