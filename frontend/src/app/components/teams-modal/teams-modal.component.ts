import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teams-modal',
  templateUrl: './teams-modal.component.html',
  styleUrls: ['./teams-modal.component.css']
})
export class TeamsModalComponent {

  members: string[] = ['Chris P.', 'Will M.', 'Helena M.'];
  selectedMembers: string[] = [];

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onMemberSelect(event: any) {
    const selected = event.target.value;
    if (this.selectedMembers.indexOf(selected) === -1) {
      this.selectedMembers.push(selected);
    }
  }

  onOutsideClick(event: MouseEvent) {
    // Check if the click was outside the modal
    if ((event.target as HTMLElement).classList.contains('modal-container')) {
        // Logic to close the modal
        this.onClose();
    }
}

}
