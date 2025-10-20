import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { AdminDashboardComponent } from './dashboard/admin/admin';

import { AppointmentComponent } from './management/appointment/appointment';
import { DoctorComponent } from './management/doctor/doctor';
import { PatientsComponent } from './management/patient/patient';
import { Doctor } from './dashboard/doctor/doctor';
import { Patient } from './dashboard/patient/patient';


export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'dashboard/admin', component: AdminDashboardComponent },
   { path: 'dashboard/patient', component: Patient  },
   { path: 'dashboard/doctor', component: Doctor},  
   {path: 'management/patient', component: PatientsComponent},
   {path: 'management/doctor', component: DoctorComponent},
   { path: 'management/appointment', component: AppointmentComponent },

];
