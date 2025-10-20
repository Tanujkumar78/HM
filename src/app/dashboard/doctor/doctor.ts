import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment';
import { DoctorService } from '../../services/doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doctor.html',
  styleUrls: ['./doctor.css'],
})
export class Doctor implements OnInit {
  doctor: any = {};
  appointments: any[] = [];
  totalAppointments: number = 0;
  completedAppointments: number = 0;

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  if (!loggedInUser || loggedInUser.role.toLowerCase() !== 'doctor') {
  alert('Unauthorized access! Please log in as a doctor.');
  this.router.navigate(['/auth/login']);
  return;
}


    this.doctor = loggedInUser;

    this.loadAppointments();
  }

  
  loadAppointments() {
    console.log(this.doctor);
    
    this.appointmentService.getAppointmentById(this.doctor.id,'doctorId').subscribe((data) => {
      
      this.appointments = data;
      this.totalAppointments = this.appointments.length;
      this.completedAppointments = this.appointments.filter(
        (a) => a.status === 'Completed'
      ).length;
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/auth/login']);
  }
}
