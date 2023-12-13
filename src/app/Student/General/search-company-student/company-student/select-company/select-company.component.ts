import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CompanyStudentService } from '../company-student.service';

interface NeedStudent {
  number_student_train: string;
}

interface Company {
  company_id: string;
  company_name: string;
  company_building: string;
  number_student_train: string;
  student_code: string;
  student_name: string;
  student_lastname: string;
}

interface Student {
  student_code: string;
  student_name: string;
  student_lastname: string;
}

interface CompanyResponse {
  company: Company[];
  student: Student[];
  need_student: { [key: string]: NeedStudent[] };
}

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit {
  CompanyInformation: Company[] = [];
  need_student: { [key: string]: NeedStudent[] } = {};
  username: string = '';
  student: Student[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private companyStudentService: CompanyStudentService
  ) { }

  ngOnInit(): void {
    this.username = this.companyStudentService.getUsername();
    console.log('Username from service:', this.username);

    const apiUrl = `http://localhost/PJ/Backend/Student/Company/company-student-detail.php?username=${this.username}`;

    this.http.get<CompanyResponse>(apiUrl).subscribe(
      (companyInformation) => {
        console.log(companyInformation);
        if (companyInformation && companyInformation.company) {
          this.CompanyInformation = companyInformation.company;
          this.student = companyInformation.student;
          this.need_student = companyInformation.need_student;
        } else {
          console.error('No company information found.');
        }
      },
      (error) => {
        console.error('Error fetching company information:', error);
      }
    );
  }
}
