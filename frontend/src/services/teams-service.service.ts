import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsServiceService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://localhost:8080/users/'
  private baseUrlTeams: string = 'http://localhost:8080/company/'

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  getTeams(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlTeams}/${id}/teams`);
  }
}
