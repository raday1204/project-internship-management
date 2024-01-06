import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent  {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  username: string = '';

  onSubmit() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/login-student.php', {
      username: this.username,
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          localStorage.setItem('loggedInUsername', res.loggedInUsername);
          this.router.navigate(['/home-student']);
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