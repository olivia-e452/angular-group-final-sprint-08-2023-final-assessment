import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  onCloseModal() {
    this.closeModal.emit();
  }
  constructor() {}
  ngOnInit(): void {}
}
