import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors({ passwordMatch: true });
    return { passwordMatch: true };
  } else {
    return null;
  }
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  @Input() showModal: boolean = false;
  

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  register: FormGroup;
  firstName: string = "hi";
  selectedRole: string = 'Pick a role';
  adminRole: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.register = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      adminRole: ['', Validators.required]
    }, {
      validator: passwordMatchValidator
    });
  }

  onRoleChange(event: Event) {
    this.selectedRole = (event.target as HTMLSelectElement).value;
  }

  onSubmit() {
    console.log(this.register.get('adminRole')?.value)
    if (this.register.valid) {
      const password = this.register.get('password')?.value;
      const confirmPassword = this.register.get('confirmPassword')?.value;
      console.log("hit")
      if (password === confirmPassword) {
        // Passwords match, proceed with form submission
        
        alert('Form submitted successfully!');
        this.onClose();
        //send a post request for the user. 
      } else {
        alert('Passwords do not match. Please try again.');
      }
    }
  }
}

