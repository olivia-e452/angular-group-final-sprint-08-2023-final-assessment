import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teams: any[] = [];

  showModal: boolean = false;

  newTeam = {
    name: '',
    membersString: '',
    projectCount: 0,
    bgColor: '#0B2D45'
  };

  constructor() { }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetNewTeam();
  }

  addNewTeam() {
    const membersArr = this.newTeam.membersString.split(',').map(name => {
      return {
        name: name.trim(),
        initials: name.trim().split(' ').map(n => n[0]).join('')
      }
    });
    const teamToAdd = {
      ...this.newTeam,
      members: membersArr
    };
    this.teams.push(teamToAdd);
    this.closeModal();
  }

  resetNewTeam() {
    this.newTeam = {
      name: '',
      membersString: '',
      projectCount: 0,
      bgColor: '#0B2D45'
    };
  }

}
