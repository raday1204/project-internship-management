import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStudentService } from 'src/app/Student/login-student/login-student.service';

@Component({
  selector: 'app-login-officer',
  templateUrl: './login-officer.component.html',
  styleUrls: ['./login-officer.component.css']
})
export class LoginOfficerComponent {
  constructor(private loginStudentService: LoginStudentService, private router: Router, private http: HttpClient) {}
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginStudentService.getData().subscribe((data: any) => {
      console.log(data); // Handle the response from the backend
    });
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'กรุณากรอกข้อมูล!';
      return; 
    }

    this.http.post<any>('http://localhost:3000/users', { username: this.username }).subscribe(
      (response) => {
        console.log('Response from server:', response);
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error:', error);
        this.errorMessage = '';
      }
    );
  }
}