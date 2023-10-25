import { Component, Output, EventEmitter, Input } from '@angular/core';
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

@Component({
  selector: 'app-teams-modal',
  templateUrl: './teams-modal.component.html',
  styleUrls: ['./teams-modal.component.css']
})
export class TeamsModalComponent {

  memberData: User[] | undefined;
  selectedMembers: User[] = [];

  @Output() close = new EventEmitter<void>();
  @Input() showModal: boolean = false;


  async ngOnInit(): Promise<void> {
    this.memberData = await fetchFromAPI("GET", "company/6/users");
    console.log(this.selectedMembers + 'selected members');
    console.log(JSON.stringify(this.memberData));
  }

  onClose() {
    this.close.emit();
  }

  onMemberSelect(event: any) {
    console.log("member selection triggered");
    const selectedId = Number(event.target.value);
    const selectedMember = this.memberData?.find(member => member.id === selectedId)
    if (selectedMember && this.selectedMembers.indexOf(selectedMember) === -1) {
      this.selectedMembers.push(selectedMember);
      console.log(this.selectedMembers)
    }
  }

  onOutsideClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-container')) {
        this.onClose();
    }
}

removeMember(member: User): void {
  console.log(this.selectedMembers + 'before')
  const index = this.selectedMembers.findIndex((m: User) => m.id === member.id);
  if (index > -1) {
      this.selectedMembers.splice(index, 1);
      console.log(this.selectedMembers)
  }
}

// onSubmit() : void {
//   this.teamData = await fetchFromAPI("POST", "/teams");

// }
}
