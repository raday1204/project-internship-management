import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './Dialog-Add-Internal/dialog/dialog.component';


@Component({
  selector: 'app-add-internal-company',
  templateUrl: './add-internal-company.component.html',
  styleUrls: ['./add-internal-company.component.css']
})
export class AddInternalCompanyComponent implements OnInit {
  company: any = {
    company_id: null,
    company_name: '', // or provide a default value
  };
  need_student: any = {};
  selectedOption1: any;
  selectedOption2: any;
  selectedOption4: any;
  CompanyInformation: any = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const companyId = params['companyId'];
      if (companyId) {
        // You can use the companyId to fetch and display the relevant company information
        console.log('Company ID:', companyId);
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
        this.fetchCompanyData();
      });
    });
    this.getOptions();
  }

  fetchCompanyData() {
    // Fetch existing company data using company_id
    this.http.get(`http://localhost/PJ/Backend/Officer/get-company-officer.php?company_id=${this.company.company_id}`)
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

  saveInternal() {
    // Step 1: Update company data
    const formDataCompany = {
      company_id: this.company.company_id,
      company_building: this.company.company_building,
      company_job: this.company.company_job
      // Include other relevant fields for updating the company data
    };
  
    this.http.put('http://localhost/PJ/Backend/Officer/update-company.php', formDataCompany)
      .subscribe((companyResponse: any) => {
        if (companyResponse.success) {
          console.log(companyResponse.message);
  
          // Step 2: Insert need_student data
          const formDataNeedStudent = {
            company_id: this.company.company_id,
            date_addtraining: this.need_student.date_addtraining,
            number_student_train: this.need_student.number_student_train
          };
  
          this.http.post('http://localhost/PJ/Backend/Officer/add-internal-company.php', formDataNeedStudent)
            .subscribe((needStudentResponse: any) => {
              if (needStudentResponse.success) {
                console.log(needStudentResponse.message);
  
                const queryParams = {
                  CompanyInformation: JSON.stringify({
                    company: formDataCompany,
                    need_student: formDataNeedStudent
                  })
                };
                this.openAddInternalPopup(queryParams);
  
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
  
  openAddInternalPopup(queryParams: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: queryParams, // Pass the queryParams to the dialog component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Additional logic after the dialog is closed, if needed
  
      // Navigate back to company-information with the updated data
      this.router.navigate(['/company-information'], { queryParams: queryParams });
    });
  }
  
  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/get-company-officer.php').subscribe((data: any) => {
      this.selectedOption4 = data.map((item: { company_building: any; }) => item.company_building);
    });
  }

  submitForm() {
    const formData = new FormData();
    formData.append('year', this.selectedOption1);
    formData.append('type_code', this.selectedOption2);
  
    this.http.post('http://localhost/PJ/Backend/Officer/company-officer.php', formData)
      .subscribe((response: any) => {
        console.log('Backend Response:', response);
        if (Array.isArray(response) && response.length > 0) {
          // Assuming the response contains necessary data
          const queryParams = {
            CompanyInformation: JSON.stringify(response)
          };
  
          this.router.navigate(['/company-information'], { queryParams: queryParams });
        } else {
          console.error('Invalid response from server.');
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }  
}
