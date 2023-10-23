import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';

const routes: Routes = [
 // { path: "", component: LoginComponent },
  { path: "", component: CompanyComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
