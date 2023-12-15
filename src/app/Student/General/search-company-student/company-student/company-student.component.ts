import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyStudentPopupComponent } from './company-student-popup/company-student-popup.component';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';
import { CompanyStudentService } from './company-student.service';

interface NeedStudent {
  number_student_train: string;
}

interface Company {
  selected: boolean;
  company_id: string;
  company_name: string;
  company_building: string;
  students: Student[]; // Add this line
}

interface Student {
  student_code: string;
  student_name: string;
  student_lastname: string;
}


interface CompanyInformation {
selected: any;
  company: Company;
  students: Student[];
  need_student: NeedStudent[];
}

interface CompanyResponse {
  success: boolean;
  data: CompanyInformation[];
}

@Component({
  selector: 'app-company-student',
  templateUrl: './company-student.component.html',
  styleUrls: ['./company-student.component.css']
})
export class CompanyStudentComponent implements OnInit {
  need_student: { [key: string]: NeedStudent[] } = {};
  CompanyInformation: CompanyInformation[] = [];
  student: { [key: string]: Student[] } = {};
  username: any;

  selectedOption5: any;
  selectedOption6: any;
  hasSelectedCompany: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedOption5 = params['year'];
      this.selectedOption6 = params['type_code'];
    });
    this.fetchData();
  }
  fetchData() {
    if (this.selectedOption5 && this.selectedOption6) {
      this.http.get<CompanyResponse>(`http://localhost/PJ/Backend/Officer/Company/get-company-information.php?year=${this.selectedOption5}&type_code=${this.selectedOption6}`)
        .subscribe(
          (response: any) => {
            console.log('Backend Response:', response);

            if (response && response.success && response.data) {
              this.CompanyInformation = response.data;
              this.CompanyInformation.forEach(company => {
                this.need_student[company.company.company_id] = company.need_student;
                this.student[company.company.company_id] = company.students;
              });
            } else {
              console.error('Invalid response from the server.');
            }
          },
          (error) => {
            console.error('HTTP Error:', error);
          }
        );
    }
  }

  selectCompany(selectedCompany: Company) {
    if (selectedCompany && selectedCompany.company_id) {
      // Check if the user has already selected a company
      if (this.hasSelectedCompany) {
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
          this.hasSelectedCompany = true;
          console.log('Company selected successfully.');
        } else {
          console.log('No data to save or action was canceled.');
        }
      });
    } else {
      console.error('Invalid company data or missing company_id.');
      // Additional error handling if necessary
    }
  }


  private insertCompanyID(newCompanyID: string) {
    const insertUrl = 'http://localhost/PJ/Backend/Student/Company/select-company.php';

    this.http.post<CompanyResponse>(insertUrl, {
      username: this.username,
      company_id: newCompanyID
    }).subscribe(
      (response) => {
        console.log('Company ID updated successfully:', response);
        if (response && response.success)
          this.router.navigate(['/select-company']);
          localStorage.setItem('selectedCompanyID', newCompanyID);
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