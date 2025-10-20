import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminDashboardComponent {
  totalPatients = 0;
  totalDoctors = 0;
 

  constructor(private router: Router, private userService: UserService) {
    this.getUserCounts();
  }

  m() {
    this.router.navigate(['/management/patient']);
  }

  n() {
    this.router.navigate(['/management/doctor']);
  }

  o() {
    this.router.navigate(['/management/appointment']);
  }

  getUserCounts() {
    this.userService.getUsers().subscribe((data) => {
      this.totalPatients = data.filter((u: any) => u.role === 'patient').length;
      this.totalDoctors = data.filter((u: any) => u.role === 'doctor').length;
    });

    

  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/auth/login']);
  }
}
