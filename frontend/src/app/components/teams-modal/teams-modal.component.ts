import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-teams-modal',
  templateUrl: './teams-modal.component.html',
  styleUrls: ['./teams-modal.component.css']
})
export class TeamsModalComponent {

  members: string[] = ['Chris P.', 'Will M.', 'Helena M.', 'Will2', 'asdx'];
  selectedMembers: string[] = [];

  @Output() close = new EventEmitter<void>();
  @Input() showModal: boolean = false;

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
    if ((event.target as HTMLElement).classList.contains('modal-container')) {
        this.onClose();
    }
}

removeMember(member: string): void {
  const index = this.selectedMembers.indexOf(member);
  if (index > -1) {
      this.selectedMembers.splice(index, 1);
  }
}


}
