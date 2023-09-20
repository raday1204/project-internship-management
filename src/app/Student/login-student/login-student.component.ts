import { Component, OnInit } from '@angular/core';
import { LoginStudentService } from './login-student.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  
  constructor(private loginStudentService: LoginStudentService, private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.loginStudentService.getData().subscribe(data => {
      console.log(data); // Handle the response from the backend
    });
  
    throw new Error('Method not implemented.');
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