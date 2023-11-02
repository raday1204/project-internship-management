import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  username: string | undefined;
  studentData: any;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private router: Router) { }
    
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.username = params['username'];
        console.log('Extracted username:', this.username);
        console.log('URL Params:', params);
    
        if (this.username) {
          console.log('Username:', this.username);
          this.http.get(`http://localhost/PJ/Backend/Student/profile-student.php?username=${this.username}`)
            .subscribe(
              (response: any) => {
                if (!response.error) {
                  this.studentData = response;
                  if (this.studentData['username'] !== this.studentData['student_code']) {
                    this.errorMessage = 'Username does not match student_code.';
                  }
                } else {
                  this.errorMessage = response.error;
                }
              },
              (error) => {
                this.errorMessage = 'An error occurred while fetching student data.';
              }
            );
        } else {
          this.errorMessage = 'No username provided.';
        }
      });
    }    
  }    