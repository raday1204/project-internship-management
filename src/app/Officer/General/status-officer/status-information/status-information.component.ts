import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StatusInformationPopupComponent } from './status-information-popup/status-information-popup.component';

interface NeedStudent {
  number_student_train: string;
}

interface Company {
  selected: boolean;
  student_code: string;
  company_id: string;
  company_name: string;
  company_building: string;
}

interface Student {
  training: any;
  company_id: string;
  student_code: string;
  student_name: string;
  student_lastname: string;
  company_status: number;
  assessment_status: number;
}

interface Training {
  student_code: string;
  company_id: string;
  company_status: number;
  assessment_status: number;
}

interface CompanyInformation {
  company: Company;
  students: Student[];
  need_student: NeedStudent[];
  training: Training[];
}

interface CompanyResponse {
  success: boolean;
  data: CompanyInformation[];
}

@Component({
  selector: 'app-status-information',
  templateUrl: './status-information.component.html',
  styleUrls: ['./status-information.component.css']
})
export class StatusInformationComponent implements OnInit {
  companyInformation: CompanyInformation[] = [];
  student: { [key: string]: Student[] } = {};
  training: { [key: string]: Training[] } = {};
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  filteredCompanyIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedOption1 = params['year'];
      this.selectedOption2 = params['type_name'];
    });
    this.fetchData();
  }

  fetchData() {
    if (this.selectedOption1 && this.selectedOption2) {
      this.http
        .get<CompanyResponse>(
          `http://localhost/PJ/Backend/Officer/Company/get-company-information.php?year=${this.selectedOption1}&type_name=${this.selectedOption2}`
        )
        .subscribe(
          (response: CompanyResponse) => {
            console.log('Backend Response:', response.data);
            if (response && response.success) {
              if (Array.isArray(response.data)) {
                this.companyInformation = response.data;
                this.companyInformation = response.data.filter(companyInfo => {
                  // Filter out companies without students
                  return companyInfo.students && companyInfo.students.length > 0;});
                this.updateLocalData();
              } else {
                console.error('Invalid data structure in the server response.');
              }
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

  updateLocalData() {
    this.companyInformation.forEach((company) => {
      this.student[company.company.company_id] = company.students;
      this.training[company.company.company_id] = company.training;
      company.students.forEach((student) => {
        student['company_status'] = student.training.length > 0 ? student.training[0]['company_status'] : null;
        student['assessment_status'] = student.training.length > 0 ? student.training[0]['assessment_status'] : null;
        // Log additional student information
        console.log(`Student ${student.student_code} information:`, student);
        console.log(`Student ${student.company_status} information:`, student.training);
      });
    });
  }
  
  
  openDialog(studentCode: string, action: string) {
    const dialogRef = this.dialog.open(StatusInformationPopupComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.handleDialogResult(studentCode, action);
      }
    });
  }

  handleDialogResult(studentCode: string, action: string) {
    switch (action) {
      case 'confirmCompany':
        this.confirmCompanyStatus(studentCode);
        break;
      case 'rejectCompany':
        this.rejectCompanyStatus(studentCode);
        break;
      case 'confirmAssessments':
        this.confirmAssessmentStatus(studentCode);
        break;
      default:
        break;
    }
  }

  confirmCompany(studentCode: string) {
    this.openDialog(studentCode, 'confirmCompany');
  }

  rejectCompany(studentCode: string) {
    this.openDialog(studentCode, 'rejectCompany');
  }

  confirmAssessments(studentCode: string) {
    this.openDialog(studentCode, 'confirmAssessments');
  }

  confirmCompanyStatus(studentCode: string) {
    const newStatus = 2;
    this.updateCompanyStatus(studentCode, newStatus);
  }

  rejectCompanyStatus(studentCode: string) {
    const newStatus = 3;
    this.updateCompanyStatus(studentCode, newStatus);
  }

  confirmAssessmentStatus(studentCode: string) {
    const newAssessmentStatus = 2;
    this.updateAssessmentStatus(studentCode, newAssessmentStatus);
  }

  updateCompanyStatus(studentCode: string, newStatus: number) {
    this.http
      .post(
        'http://localhost/PJ/Backend/Officer/Training/update-training.php',
        { studentCode, newStatus }
      )
      .subscribe(
        (response: any) => {
          if (response && response.success) {
            console.log(`Status for student ${studentCode} updated successfully.`);
            this.updateLocalData();
            window.location.reload();
          } else {
            console.error(`Failed to update status for student ${studentCode}.`);
          }
        },
        (error) => {
          console.error('HTTP Error:', error);
        }
      );
  }
  updateAssessmentStatus(studentCode: string, newAssessmentStatus: number) {
    this.http
      .post(
        'http://localhost/PJ/Backend/Officer/Training/update-training.php',
        { studentCode, newAssessmentStatus }
      )
      .subscribe(
        (response: any) => {
          if (response && response.success) {
            console.log(`Status for student ${studentCode} updated successfully.`);
            this.updateLocalData();
            window.location.reload();
          } else {
            console.error(`Failed to update status for student ${studentCode}.`);
          }
        },
        (error) => {
          console.error('HTTP Error:', error);
        }
      );
  }
}