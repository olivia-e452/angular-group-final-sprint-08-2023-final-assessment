import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AnnouncementModalComponent } from './components/announcement-modal/announcement-modal.component';

const routes: Routes = [
 // { path: "", component: LoginComponent },
  { path: "", component: CompanyComponent },
  { path: "announcements", component: AnnouncementsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent,
    AnnouncementsComponent,
    AnnouncementModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
