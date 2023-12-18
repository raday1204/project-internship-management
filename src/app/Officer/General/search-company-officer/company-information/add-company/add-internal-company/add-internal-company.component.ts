import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { DialogComponent } from './Dialog-Add-Internal/dialog/dialog.component';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-add-internal-company',
  templateUrl: './add-internal-company.component.html',
  styleUrls: ['./add-internal-company.component.css'],
})
export class AddInternalCompanyComponent implements OnInit {
  company: any = {
    company_id: '',
    company_name: '',
    company_building: '',
    company_job: ''
  };
  need_student: any = {
    number_student_train: '',
    date_addtraining: ''
  };
  CompanyInformation: any = {};
  internalCompanyForm: FormGroup;
  selectedOption4: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private DataStorageService: DataStorageService
  ) {
    this.internalCompanyForm = this.fb.group({
      company_building: ['', Validators.required],
      company_job: ['', Validators.required],
      number_student_train: ['', Validators.required],
      date_addtraining: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.company.company_id = params['company_id'];
  
      this.fetchCompanyData(this.company.company_id)
        .subscribe(() => {
          // Once the company data is fetched, populate the form
          this.populateFormWithData();
        });
    });
  
    this.getOptions();
  }
  
  
  populateFormWithData() {
    // Populate the form fields with existing company data
    this.internalCompanyForm.patchValue({
      company_building: this.CompanyInformation.company_building,
      company_job: this.CompanyInformation.company_job,
      // Populate other fields if available in CompanyInformation
    });
  }

  fetchCompanyData(companyId: string) {
    console.log('Fetching data for company ID:', companyId);
    // Fetch existing company data using companyId
    return this.http.get(`http://localhost/PJ/Backend/Officer/Company/get-company-officer.php?company_id=${companyId}`);
  }

  openAddInternalPopup(): void {
    this.DataStorageService.getCompanyInformation().subscribe((companyData: any) => {
      if (this.internalCompanyForm.valid && companyData) {
        const formattedDate = this.internalCompanyForm.value.date_addtraining ?
          formatDate(this.internalCompanyForm.value.date_addtraining, 'yyyy-MM-dd', 'en-US') : '';

        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            company: {
              company_id: companyData.company_id,
              company_name: companyData.company_name,
              send_name: companyData.send_name,
              send_coordinator: companyData.send_coordinator,
              send_position: companyData.send_position,
              send_tel: companyData.send_tel,
              send_email: companyData.send_email,
              send_mobile: companyData.send_mobile,
              company_building: this.internalCompanyForm.value.company_building,
              company_job: this.internalCompanyForm.value.company_job,
            },
            need_student: {
              number_student_train: this.internalCompanyForm.value.number_student_train,
              date_addtraining: formattedDate,
            }
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if (result && result.saveData) {
            this.saveInternal();
          }
        });
      }
    });
  }

  saveInternal(): void {
    // Step 1: Update company data
    const formDataCompany = new FormData();
    formDataCompany.append('company_id', this.company.company_id); // Use this.company instead of this.companyForm.value
    formDataCompany.append('company_building', this.internalCompanyForm.value.company_building);
    formDataCompany.append('company_job', this.internalCompanyForm.value.company_job);

    this.http.post('http://localhost/PJ/Backend/Officer/Company/update-company.php', formDataCompany)
      .subscribe((companyResponse: any) => {
        if (companyResponse.success) {
          console.log(companyResponse.message);

          // Step 2: Insert need_student data
          const formattedDate = this.internalCompanyForm.value.date_addtraining ?
            formatDate(this.internalCompanyForm.value.date_addtraining, 'yyyy-MM-dd', 'en-US') : '';

          const formDataNeedStudent = new FormData();
          formDataNeedStudent.append('company_id', this.company.company_id);
          formDataNeedStudent.append('number_student_train', this.internalCompanyForm.value.number_student_train);
          formDataNeedStudent.append('date_addtraining', formattedDate);

          this.http.post('http://localhost/PJ/Backend/Officer/Company/add-internal-company.php', formDataNeedStudent)
            .subscribe((needStudentResponse: any) => {
              if (needStudentResponse.success) {
                console.log(needStudentResponse.message);
                this.router.navigate(['/company-information']);
              } else {
                console.error(needStudentResponse.message);
                // Handle error in inserting need_student data
              }
            }, (needStudentError: any) => {
              console.error('HTTP Error (Inserting Need Student):', needStudentError);
              // Handle HTTP error in inserting need_student data
            });
        } else {
          console.error(companyResponse.message);
          // Handle error in updating company data
        }
      }, (companyError: any) => {
        console.error('HTTP Error (Updating Company):', companyError);
        // Handle HTTP error in updating company data
      });
  }

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/Company/get-company-officer.php').subscribe((data: any) => {
      this.selectedOption4 = data.map((item: { company_building: any; }) => item.company_building);
    });
  }

  openDatePicker() {
    // You can perform any additional logic here if needed
  }
}
