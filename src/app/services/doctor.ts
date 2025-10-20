import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'https://db-json-hospital.onrender.com/doctors';

  constructor(private http: HttpClient) {}


  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  addDoctor(doctor: any): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

 
  getDoctorById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

 
  updateDoctor(id: string, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

 
  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
