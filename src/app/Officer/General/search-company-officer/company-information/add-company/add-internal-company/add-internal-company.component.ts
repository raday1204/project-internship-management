import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from './Dialog-Add-Internal/dialog/dialog.component';

@Component({
  selector: 'app-add-internal-company',
  templateUrl: './add-internal-company.component.html',
  styleUrls: ['./add-internal-company.component.css']
})
export class AddInternalCompanyComponent implements OnInit {
  company: any = {
    company_id: null,
    company_name: '',
    company_building: '',
    company_job: ''
  };
  need_student: any = {
    number_student_train: '',
    date_addtraining: ''
  };
  CompanyInformation: any = {};
  companyForm: FormGroup;
  selectedOption4: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.companyForm = this.fb.group({
      company_building: ['', Validators.required],
      company_job: ['', Validators.required],
      number_student_train: ['', Validators.required],
      date_addtraining: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const companyId = params['companyId'];
      if (companyId) {
        // You can use the companyId to fetch and display the relevant company information
        console.log('Company ID:', companyId);
        this.fetchCompanyData(companyId);
      } else if (params['CompanyInformation']) {
        this.CompanyInformation = Object.values(JSON.parse(params['CompanyInformation']));
      }
    });
  
    this.route.params.subscribe((params) => {
      this.company.company_id = params['company_id'];
  
      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams && queryParams['company_id']) {
          this.company.company_id = queryParams['company_id'];
        }
  
        if (queryParams && queryParams['company_name']) {
          this.company.company_name = queryParams['company_name'];
        }
        this.fetchCompanyData(this.company.company_id); // Corrected: Pass company ID
      });
    });
  
    this.getOptions();
  }
  
  fetchCompanyData(companyId: string) {
    // Fetch existing company data using companyId
    this.http.get(`http://localhost/PJ/Backend/Officer/Company/get-company-officer.php?company_id=${companyId}`)
      .subscribe((response: any) => {
        if (response.success) {
          // Populate form fields with existing company data
          this.company.company_building = response.company_building;
          this.company.company_job = response.company_job;
        } else {
          console.error(response.message);
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }

  openAddInternalPopup(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        company: {
          company_id: this.companyForm.value.company_id,
          company_building: this.companyForm.value.company_building,
          company_job: this.companyForm.value.company_job,
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

  saveInternal(): void {
    // Step 1: Update company data
    const formDataCompany = new FormData();
    formDataCompany.append('company_id', this.company.company_id); // Use this.company instead of this.companyForm.value
    formDataCompany.append('company_building', this.companyForm.value.company_building);
    formDataCompany.append('company_job', this.companyForm.value.company_job);
  
    this.http.post('http://localhost/PJ/Backend/Officer/Company/update-company.php', formDataCompany)
      .subscribe((companyResponse: any) => {
        if (companyResponse.success) {
          console.log(companyResponse.message);
  
          // Step 2: Insert need_student data
          const formDataNeedStudent = new FormData();
          formDataNeedStudent.append('company_id', this.companyForm.value.company_id);
          formDataNeedStudent.append('date_addtraining', this.companyForm.value.date_addtraining);
          formDataNeedStudent.append('number_student_train', this.companyForm.value.number_student_train);
  
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
  

  // openAddInternalPopup(): void {
  //   // if (this.companyForm.valid) {
  //     const dialogRef = this.dialog.open(DialogComponent, {
  //       data: {
  //         company: {
  //           company_id: this.companyForm.value.company_id,
  //           company_building: this.companyForm.value.company_building,
  //           company_job: this.companyForm.value.company_job,
  //           number_student_train: this.companyForm.value.number_student_train,
  //           date_addtraining: this.companyForm.value.date_addtraining,
  //         }
  //       }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //       if (result && result.saveData) {
  //         this.saveInternal(); // Pass the data received from the dialog
  //       }
  //     });
  //   }
  // }

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/Company/get-company-officer.php').subscribe((data: any) => {
      this.selectedOption4 = data.map((item: { company_building: any; }) => item.company_building);
    });
  }
}
