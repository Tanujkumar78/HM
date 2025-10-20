import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { PatientService } from '../../services/patient';
import { DoctorService } from '../../services/doctor';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'patient';
  phone: string = '';
  age: number = 0;
  gender: string = '';
  bloodGroup: string = '';
  specialization: string = '';
  fee: number = 0;

  constructor(
    private userService: UserService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  register() {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    // 1️⃣ Add user to users.json (for login)
    this.userService.addUser(newUser).subscribe(() => {
      // 2️⃣ If patient — also add to patient management
      if (this.role === 'patient') {
        const newPatient = {
          name: this.name,
          age: this.age || 0,
          gender: this.gender || 'Unknown',
          phone: this.phone || '',
          bloodGroup: this.bloodGroup || '',
        };
        // this.patientService.addPatient(newPatient).subscribe();
      }

      // 3️⃣ If doctor — also add to doctor management
      if (this.role === 'doctor') {
        const newDoctor = {
          name: this.name,
          specialization: this.specialization || 'General',
          phone: this.phone || '',
          fee: this.fee || 0,
        };
        // this.doctorService.addDoctor(newDoctor).subscribe();
      }

      alert('Registration successful!');
      this.router.navigate(['/auth/login']);
    });
  }
  go_to_login_page(){
    this.router.navigate(['/auth/login']);
  }
}
