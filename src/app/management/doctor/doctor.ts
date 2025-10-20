import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  imports: [FormsModule,CommonModule],
  templateUrl: './doctor.html',
  styleUrls: ['./doctor.css'],
})
export class DoctorComponent implements OnInit {
  doctors: any[] = [];
  newDoctor: any = {
    name: '',
    specialization: '',
    phone: '',
    fee: '',
    role:'doctor',
    email:'',
    password:''
  };
  
  editingDoctor: any = null;
  editForm: any = {
    specialization: '',
    phone: '',
    fee: ''
  };
  originalValues: any = {
    specialization: '',
    phone: '',
    fee: ''
  };

  constructor(private doctorService: UserService,private router: Router) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getUsers()
     .pipe(
       map((data: any[]) => data.filter(user => user.role === 'doctor'))
     )
     .subscribe(filteredPatients => {
       this.doctors = filteredPatients;
     });
  }

  addDoctor() {
    if (
      this.newDoctor.name &&
      this.newDoctor.specialization &&
      this.newDoctor.phone &&
      this.newDoctor.fee
    ) {
       this.newDoctor.password= this.newDoctor.email.split('@')[0] ;
    
      this.doctorService.addUser(this.newDoctor).subscribe(() => {
        this.newDoctor = { name: '', specialization: '', phone: '', fee: '' };
        this.loadDoctors();
      });
    }
  }

  deleteDoctor(id: string) {
    this.doctorService.deleteUser(id).subscribe(() => {
      this.loadDoctors();
    });
  }

  editDoctor(doctor: any) {
    console.log('Editing doctor:', doctor);
    this.editingDoctor = doctor;
    this.editForm = {
      specialization: doctor.specialization,
      phone: doctor.phone,
      fee: doctor.fee
    };
    this.originalValues = {
      specialization: doctor.specialization,
      phone: doctor.phone,
      fee: doctor.fee
    };
    console.log('Edit form initialized:', this.editForm);
    console.log('Original values set:', this.originalValues);
  }

  updateDoctor() {
    console.log('Update clicked - Current form values:', this.editForm);
    console.log('Update clicked - Original values:', this.originalValues);
    
    // Check if any changes were made (convert to string for comparison)
    const hasChanges = 
      String(this.editForm.specialization).trim() !== String(this.originalValues.specialization).trim() ||
      String(this.editForm.phone).trim() !== String(this.originalValues.phone).trim() ||
      String(this.editForm.fee).trim() !== String(this.originalValues.fee).trim();

    console.log('Has changes:', hasChanges);

    if (!hasChanges) {
      alert('No changes detected. Please modify at least one field before updating.');
      console.log('No changes detected - showing alert message');
      return;
    }

    console.log('Changes detected - proceeding with update');

    if (this.editingDoctor && this.editForm.specialization && this.editForm.phone && this.editForm.fee) {
      const updatedDoctor = {
        ...this.editingDoctor,
        specialization: this.editForm.specialization,
        phone: this.editForm.phone,
        fee: this.editForm.fee
      };
      
      this.doctorService.updateUser(this.editingDoctor.id, updatedDoctor).subscribe({
        next: () => {
          this.editingDoctor = null;
          this.editForm = { specialization: '', phone: '', fee: '' };
          this.originalValues = { specialization: '', phone: '', fee: '' };
          this.loadDoctors();
        },
        error: (error) => {
          console.error('Update failed:', error);
          alert('Failed to update doctor. Please try again.');
        }
      });
    }
  }

  cancelEdit() {
    this.editingDoctor = null;
    this.editForm = { specialization: '', phone: '', fee: '' };
    this.originalValues = { specialization: '', phone: '', fee: '' };
  }

  goBack() {
     this.router.navigate(['dashboard/admin']);
  }
}
