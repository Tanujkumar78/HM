import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.getUsers().subscribe(users => {
      const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        if (user.role === 'admin') this.router.navigate(['dashboard/admin']);
        else if (user.role === 'doctor') this.router.navigate(['/dashboard/doctor']);
        else this.router.navigate(['/dashboard/patient']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
  go_to_register_page(){
    this.router.navigate(['/auth/register']);
  }
}
