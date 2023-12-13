import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyStudentPopupComponent } from './company-student-popup/company-student-popup.component';
import { CompanyStudentService } from './company-student.service';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

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
  selected: boolean;
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
  companyName: any = {};
  selectedOption5: any;
  selectedOption6: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    // Get the latest company information from DataStorageService
    this.dataStorageService.getCompanyInformation().subscribe(
      (companyInformation: any) => {
    if (companyInformation) {
      this.CompanyInformation = companyInformation.company;
      this.selectedOption5 = companyInformation.year;
      this.selectedOption6 = companyInformation.type_code;
      this.companyName = companyInformation.company_name;
      this.need_student = companyInformation.need_student;
    } else {
      console.error('No company information found.');
    }
  },
  (error) => {
    // Handle the error if any occurs during the subscription
    console.error('Error fetching company information:', error);
  }
);
    const apiUrl = 'http://localhost/PJ/Backend/Student/Company/company-student.php';

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
      // Check if the user has already selected a company
      if (!this.username || this.CompanyInformation.some(company => company.student_code === this.username)) {
        console.log('User has already selected a company. Skipping selection.');
        return;
      }
  
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
          // Remove the selected company from the list to disable the button
          this.CompanyInformation = this.CompanyInformation.filter(company => company.student_code !== this.username);
          console.log('Company selected successfully.');
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
    const insertUrl = 'http://localhost/PJ/Backend/Student/Company/select-company.php';
  
    this.http.post(insertUrl, { 
      username: this.username, 
      company_id: newCompanyID 
    }).subscribe(
        (response) => {
          console.log('Company ID updated successfully:', response);
          this.router.navigate(['/select-company']);
        },
        (error: HttpErrorResponse) => {
          console.error('HTTP error updating company ID:', error);
          // Handle errors
        }
      );
  }

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
          this.router.navigate(['/login-student']);
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
}