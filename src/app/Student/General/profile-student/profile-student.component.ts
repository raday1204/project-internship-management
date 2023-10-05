import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  studentData: any = {};
  company: any = {};
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const student_code = this.route.snapshot.paramMap.get('student_code'); // Change 'username' to 'student_code'
  
    this.http.get(`http://localhost:8080/PJ/Backend/Student/profile-student.php?student_code=${student_code}`)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res && res.student_code) {
            this.studentData = res;
          } else {
            this.errorMessage = 'Student not found';
          }
        },
        (error) => {
          this.errorMessage = 'Error querying the server';
        }
      );
  }
}  