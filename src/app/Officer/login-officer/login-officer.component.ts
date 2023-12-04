import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-officer',
  templateUrl: './login-officer.component.html',
  styleUrls: ['./login-officer.component.css']
})
export class LoginOfficerComponent {
  constructor(
    private router: Router,
    private http: HttpClient) { }

  username: string = '';

  onSubmit() {
    this.http.post('http://localhost/PJ/Backend/Officer/login-officer.php', {
      username: this.username,
    }).subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.success) {
          // Login was successful
          this.router.navigate(['/home-officer']);
        } else {
          // Login failed
          // console.error('Login failed:', res.message);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}