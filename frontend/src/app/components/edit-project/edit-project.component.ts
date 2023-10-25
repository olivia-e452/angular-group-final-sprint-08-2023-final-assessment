import { Component, Input, Output, EventEmitter } from '@angular/core';
import fetchFromAPI from 'src/services/api';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

  @Input() project: any;
  @Input() team: any;
  @Input() isNew: Boolean = false;
  @Output() modalClosed = new EventEmitter<String>();
  selectedStatus : boolean = true;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

  async handleSubmit() {
    if (this.project.name === "" || this.project.description ==="") {
      alert("Project name and description cannot be blank.");
      return;
    }
    if (this.project === null) {
        this.project = {
        "id": this.project.id,
        "name": this.project.name,
        "description": this.project.description,
        "team": this.team,
        "active": this.selectedStatus
      }
    }
    if(this.isNew){
      await this.userService.createNewProject(this.project);
      this.closeModal("NEW");
    } else{
      await this.userService.editProject(this.project);
      this.closeModal("EDIT");
    }
    console.log("submit");
  }

  closeModal(closeType : String): void {
    console.log("close");
    this.modalClosed.emit(closeType);
  }

  setProjectStatus(selectedStatus : any) {
    this.selectedStatus = (selectedStatus === "No" ? false : true);
  }
}
