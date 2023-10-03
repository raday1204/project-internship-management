import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditProfileService } from './edit-profile/edit-profile.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  studentData: any = {};
  company: any = {};



  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const studentId = params['id']; 
      this.getStudentData(studentId);
    });
  }

  getStudentData(studentId: string) {
    this.http.get(`http://localhost:80/PJ/Backend/Student/profile-student.php?student_id=${studentId}`)
      .subscribe((data: any) => {
        if (data) {
          this.studentData = data;
        } else {
          console.error('No data found');
        }
      });
  }
}
