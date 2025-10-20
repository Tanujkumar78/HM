import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PatientService } from '../../services/patient';
import { UserService } from '../../services/user';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  newPatient = {
    name: '',
    age: '',
    email:'',
    gender: '',
    phone: '',
    bloodGroup: '',
    role:'patient',
     password:''
  };

  constructor(private patientService: UserService,private router: Router) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
   this.patientService.getUsers()
  .pipe(
    map((data: any[]) => data.filter(user => user.role === 'patient'))
  )
  .subscribe(filteredPatients => {
    this.patients = filteredPatients;
    console.log('Patients:', this.patients);
  });
  }

  addPatient() {
    if (!this.newPatient.name || !this.newPatient.age || !this.newPatient.phone) {
      alert('Please fill all required fields');
       this.newPatient.password= this.newPatient.email.split('@')[0] ;
      return;
    }
    
 

    this.patientService.addUser(this.newPatient).subscribe(() => {
      this.patients.push(this.newPatient);
       
      this.newPatient = { name: '', age: '', gender: '', phone: '', bloodGroup: '', role:'patient', password:'' , email:''};
    });
  }
    goBack() {
     this.router.navigate(['dashboard/admin']);
  }
}
