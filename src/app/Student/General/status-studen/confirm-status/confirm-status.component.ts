import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyStudentService } from '../../search-company-student/company-student/company-student.service';


@Component({
  selector: 'app-confirm-status',
  templateUrl: './confirm-status.component.html',
  styleUrls: ['./confirm-status.component.css']
})
export class ConfirmStatusComponent {
  username: string | undefined;
  student = {
    company_id: '',
    student_code: '',
    student_name: '',
    student_lastname: '',
  };
  company = {
    company_id: '',  // Fix the typo here
    company_name: '',
    company_building: ''
  };
  errorMessage: string | undefined;
  studentForm: FormGroup;
  companyForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private companyStudentService: CompanyStudentService
  ) {
    this.studentForm = this.fb.group({
      student_code: [''],
      student_name: [''],
      student_lastname: [''],
    });
    this.companyForm = this.fb.group({
      company_id: [''],  // Fix the typo here
      company_name: [''],
      company_building: [''],
    });
  }

  ngOnInit(): void {
    this.username = this.companyStudentService.getUsername();
    console.log('Username from service:', this.username);

    if (this.username) {
      this.http
        .get(`http://localhost/PJ/Backend/Student/Status/get-status-student.php?username=${this.username}`)
        .subscribe(
          (response: any) => {
            if (response && response.success) {
              this.studentForm.patchValue(response.data);
              this.companyForm.patchValue(response.data.company);
            } else {
              this.errorMessage = response.error || 'An error occurred while fetching student data.';
              console.error('API Error:', this.errorMessage);
            }
          },
          (error) => {
            this.errorMessage = 'An error occurred while fetching student data. Please check your internet connection or try again later.';
            console.error('HTTP Error:', error);
          }
        );
    } else {
      this.errorMessage = 'No username provided.';
    }
  }
}
