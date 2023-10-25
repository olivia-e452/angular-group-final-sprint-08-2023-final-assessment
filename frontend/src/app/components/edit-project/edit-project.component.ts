import { Component, Input, Output, EventEmitter } from '@angular/core';
import fetchFromAPI from 'src/services/api';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

  @Input() project: any;
  @Input() team: any;
  @Input() isNew: Boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    if(this.isNew){
      //post this project
    } else{
      //patch this project
    }
    console.log("submit");
    this.closeModal();
  }

  closeModal(): void {
    console.log("close");
    this.modalClosed.emit();
  }
}
