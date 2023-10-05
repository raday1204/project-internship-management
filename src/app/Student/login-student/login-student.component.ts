import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  username: string = '';
  // errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient) { }

  onSubmit() {
    // console.log(this.username);
    this.http.post('http://localhost:8080/PJ/Backend/Student/login-student.php', {
      username: this.username,
    }).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res == 'login success') {
          this.router.navigate(['/home-student']);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}