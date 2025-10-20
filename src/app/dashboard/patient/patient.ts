import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css'],
})
export class Patient implements OnInit {
  patient: any = {};
  appointments: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {

  
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!loggedInUser || loggedInUser.role.toLowerCase() !== 'patient') {
      alert('Unauthorized access! Please log in as a patient.');
      this.router.navigate(['/auth/login']);
      return;
    }

    console.log('user :',loggedInUser);
    
    this.patient = loggedInUser;

    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointmentById(this.patient.id,"patientId").subscribe((data) => {
     
      this.appointments = data
      
      console.log(data)
    });
  }



  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/auth/login']);
  }
}

