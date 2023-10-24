import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { CompanyComponent } from './components/company/company.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnnouncementModalComponent } from './components/announcement-modal/announcement-modal.component';
import { TeamsComponent } from './components/teams/teams.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: CompanyComponent },
  { path: "announcements", component: AnnouncementsComponent },
  { path: "teams", component: TeamsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent,
    AnnouncementsComponent,
    AnnouncementModalComponent,
    NavbarComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
