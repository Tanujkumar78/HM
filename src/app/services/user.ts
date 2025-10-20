import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAppointments() {
     throw new Error('Method not implemented.');
  }
  getLoggedInUser(): any {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://db-json-hospital.onrender.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
