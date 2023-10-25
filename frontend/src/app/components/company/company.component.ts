import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  constructor(private userService: UserService) { }

  currentUser!: User;
  companySelected_id: number | undefined;

  ngOnInit(): void {
    this.currentUser = this.userService.getUser()
    console.log(this.currentUser.companies)
  }

  selectCompany(company: Company): void {
    this.companySelected_id = company.id;
    console.log()
    this.userService.setCompany(this.companySelected_id);
    // localStorage.setItem('company', JSON.stringify(company));
  }

  
}
