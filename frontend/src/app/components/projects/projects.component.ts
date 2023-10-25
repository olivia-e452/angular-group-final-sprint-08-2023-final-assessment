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
  projects: Project[] = [];
  selectedProject: Project | null = null;
  teamId: string| null = '';
  team: Team | null = null;
  user: User;

  reloadProjects : boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService){
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamid');
    if (this.teamId != null){
      this.team = this.getTeam();
      this.getProjects();
    }
  }

  getTeam(): Team {
    return {
      id: 11,
      name: 'TeamName',
      description: '',
      users: [this.user]
    }
  }

  getProjects() {
    //fetchprojects
    console.log("getting projects");
    this.reloadProjects = true;
    this.userService.getProjects().then((result) => {
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
      "team": this.team === null ? {"id": -1, "name": "", "description": "", users: []} : this.team,
      "active": true,
    }
    return newProject;
  }

  modalClosed(closeType : String) {
    console.log(closeType);
    this.showEdit = false;
    if (closeType === "NONE") {
    }
    else {
      this.getProjects();
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
      team: {
        id: -1,
        name: '',
        description: '',
        users: [this.user]
      }
    }
    this.showNew = true;
    this.showEdit = true;
  }
}
