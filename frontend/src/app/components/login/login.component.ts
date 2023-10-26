import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  acc_not_found: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public login() {
    if(this.form.invalid){
      return;
    }
    this.authService.login(
      this.form.get('username')!.value,
      this.form.get('password')!.value
    ).subscribe({
        next: (res) => {
          console.log(res)
          
        },
        error: (e) => {
          this.acc_not_found = true;
        },
        complete: ()=> console.info('complete')
      }) 
  }



}
