import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-officer',
  templateUrl: './login-officer.component.html',
  styleUrls: ['./login-officer.component.css']
})
export class LoginOfficerComponent {
  constructor(
    private router: Router,
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    ) { }

  username: string = '';

  onSubmit() {
    this.http.post<any>('http://localhost/PJ/Backend/Officer/login-officer.php', {
      username: this.username,
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          localStorage.setItem('loggedInUsername', res.loggedInUsername);
          this.router.navigate(['/home-officer']);
        } else {
          this.snackBar.open('Username or Password ไม่ถูกต้อง', 'Close', {
            duration: 3000,
          });
          console.error('Login failed:', res.message);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}