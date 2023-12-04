import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];

      if (!this.username) {
        this.route.queryParams.subscribe(queryParams => {
          this.username = queryParams['username'];
        });
      }

      if (this.username) {
        this.http.get(`http://localhost/PJ/Backend/Student/profile-student.php?username=${this.username}`)
          .subscribe(
            (response: any) => {
              if (!response.error) {
                this.studentData = response;
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