import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyStudentPopupComponent } from './company-student-popup/company-student-popup.component';
import { CompanyStudentService } from './company-student.service';

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

interface CompanyResponse {
  company: Company[];
  need_student: { [key: string]: NeedStudent[] };
}

@Component({
  selector: 'app-company-student',
  templateUrl: './company-student.component.html',
  styleUrls: ['./company-student.component.css']
})
export class CompanyStudentComponent implements OnInit {
  CompanyInformation: Company[] = [];
  username: string = '';
  loggedInUsername: string = '';
  need_student: { [key: string]: NeedStudent[] } = {};
  company: Company[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private companyStudentService: CompanyStudentService
  ) { }

  ngOnInit(): void {
    this.username = this.companyStudentService.getUsername();
    console.log('Username from service:', this.username);
    this.getCompanyInformation();
  }

  getCompanyInformation() {
    const apiUrl = 'http://localhost/PJ/Backend/Student/company-student.php';

    this.http.get<CompanyResponse>(apiUrl).subscribe(
      (companyInformation) => {
        console.log(companyInformation);
        if (companyInformation && companyInformation.company) {
          this.CompanyInformation = companyInformation.company;
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

  selectCompany(selectedCompany: Company) {
    if (selectedCompany && selectedCompany.company_id) {
      // Open the popup with student information
      const dialogRef = this.dialog.open(CompanyStudentPopupComponent, {
        data: {
          companyInformation: selectedCompany
        }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed', result);
        if (result && result.saveData) {
          this.insertCompanyID(selectedCompany.company_id);
          this.router.navigate(['/select-company']);
        } else {
          console.log('No data to save or action was canceled.');
          // Additional logic if needed when no data is to be saved
        }
      });
    } else {
      console.error('Invalid company data or missing company_id.');
      // Additional error handling if necessary
    }
  }
  
  private insertCompanyID(newCompanyID: string) {
    const insertUrl = 'http://localhost/PJ/Backend/Student/select-company.php';
  
    this.http.post(insertUrl, { 
      username: this.username, 
      company_id: newCompanyID 
    }).subscribe(
        (response) => {
          console.log('Company ID updated successfully:', response);
        },
        (error: HttpErrorResponse) => {
          console.error('HTTP error updating company ID:', error);
          // Handle errors
        }
      );
  }
}