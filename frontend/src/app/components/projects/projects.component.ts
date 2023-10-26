import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit{
  showEdit: boolean = false;
  showNew: boolean = false;
  reloadProjects : boolean = false;
  projects: Project[] = [];
  selectedProject: Project | null = null;
  teamId: number = -1;
  team: Team = {
    id: -1,
    name: '',
    description: '',
    users: []
  }
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService){
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.paramMap.get('teamid'));
    if (this.teamId != null)
    {
      this.fetchTeam();
      this.fetchProjects();
    }
  }

  getTeam(): Team {
    return this.team;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  fetchTeam(): void {
    this.userService.getTeamById(this.teamId).then((result) => {
      this.team = result;
    });
  }

  fetchProjects(): void {
    console.log("getting projects");
    this.reloadProjects = true;
    this.userService.getProjectsByTeam(this.teamId).then((result) => {
      this.projects = result;
      this.reloadProjects = false;
    });
  }

  getSelectedProject(): Project {
    if (this.selectedProject !== null) {
      return this.selectedProject;
    }
    let newProject : Project = {
      "name": "",
      "description": "",
      "active": true,
      "team": this.team,
    }
    return newProject;
  }

  modalClosed(closeType : String) {
    console.log(closeType);
    this.showEdit = false;
    if (closeType !== "NONE") {
      this.fetchProjects();
    }
  }

  toggleEdit(project: Project | null) {
    if (project === null) {
      return;
    }
    this.selectedProject = project;
    this.showEdit = !this.showEdit;
    this.showNew = false;
  }
  toggleNew(){
    this.selectedProject = {
      id: -1,
      name: '',
      active: true,
      description: '',
      team: this.team
    }
    this.showNew = true;
    this.showEdit = true;
  }
}
