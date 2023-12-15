import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditCompanyPopupComponent } from 'src/app/Officer/General/search-company-officer/company-information/edit-company/edit-company-popup/edit-company-popup.component'
import { DataStorageService } from '../data-storage.service';

interface Company {
  company_id: string;
  company_name: string;
  company_building: string;
  send_name: string;
  send_coordinator: string;
  send_position: string;
  send_tel: string;
  send_email: string;
  send_mobile: string;
  company_job: string;
}

interface NeedStudent {
  number_student_train: string;
  date_addtraining: string;
}

interface CompanyResponse {
  success: boolean;
  data: {
    company: Company;
    need_student: NeedStudent;
  };
}

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent implements OnInit {
  companyForm: FormGroup;
  company_id: any = {};
  CompanyInformation: any = {};
  selectedOption1: any;
  selectedOption2: any;
  errorMessage: string | undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dataStorageService: DataStorageService
  ) {
    this.companyForm = this.fb.group({
      company_id: [''], 
      company_name: [''],
      company_building: [''],
      send_name: ['', Validators.required],
      send_coordinator: ['', Validators.required],
      send_position: ['', Validators.required],
      send_tel: ['', Validators.required],
      send_email: ['', Validators.required],
      send_mobile: ['', Validators.required],
      company_job: ['', Validators.required],
      number_student_train: ['', Validators.required],
      date_addtraining: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.company_id = this.route.snapshot.params['company_id'];
    console.log('Company ID:', this.company_id);
    this.getCompanyData();
  }
  
  getCompanyData(): void {
    if (this.company_id) {
      this.http.get<CompanyResponse>(`http://localhost/PJ/Backend/Officer/Company/company-detail.php?company_id=${this.company_id}`)
        .subscribe((response: CompanyResponse) => {
          if (response.success) {
            console.log('Backend Response:', response);
            this.companyForm.patchValue(response.data.company);
            this.companyForm.patchValue({
              date_addtraining: response.data.need_student ? response.data.need_student.date_addtraining : ''
            });
          } else {
            console.error('Server error:', response);
          }
        }, (error) => {
          console.error('HTTP Error:', error);
        });
    } else {
      this.errorMessage = 'No company ID provided.';
    }
  }
  

  updateCompany() {
    if (this.companyForm.valid) {
      const formattedDate = this.companyForm.value.date_addtraining ?
      formatDate(this.companyForm.value.date_addtraining, 'yyyy-MM-dd', 'en-US') : '';
    const formDataCompany = new FormData();
    formDataCompany.append('company_id',this.company_id);
    formDataCompany.append('company_name', this.companyForm.value.company_name);
    formDataCompany.append('send_name', this.companyForm.value.send_name);
    formDataCompany.append('send_coordinator', this.companyForm.value.send_coordinator);
    formDataCompany.append('send_position', this.companyForm.value.send_position);
    formDataCompany.append('send_tel', this.companyForm.value.send_tel);
    formDataCompany.append('send_email', this.companyForm.value.send_email);
    formDataCompany.append('send_mobile', this.companyForm.value.send_mobile);
    formDataCompany.append('company_building', this.companyForm.value.company_building);
    formDataCompany.append('company_job', this.companyForm.value.company_job);
    formDataCompany.append('number_student_train', this.companyForm.value.number_student_train);
    formDataCompany.append('date_addtraining', formattedDate);

    this.http.post('http://localhost/PJ/Backend/Officer/Company/edit-company.php', formDataCompany)
      .subscribe((responseCompany: any) => {
        if (responseCompany.success) {
          console.log(responseCompany.message);
          this.router.navigate(['/comapny-information']);
        } else {
          // Handle failure, show an error message
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle errors
      }
    );
}
}


  // Method to open a simple alert as a popup displaying the updated data
  openUpdatePopup(): void {
    const formattedDate = this.companyForm.value.date_addtraining ?
      formatDate(this.companyForm.value.date_addtraining, 'yyyy-MM-dd', 'en-US') : '';
    if (this.companyForm.valid) {
      const dialogRef = this.dialog.open(EditCompanyPopupComponent, {
        data: {
          company: {
            company_name: this.companyForm.value.company_name,
            send_name: this.companyForm.value.send_name,
            send_coordinator: this.companyForm.value.send_coordinator,
            send_position: this.companyForm.value.send_position,
            send_tel: this.companyForm.value.send_tel,
            send_email: this.companyForm.value.send_email,
            send_mobile: this.companyForm.value.send_mobile,
            company_building: this.companyForm.value.company_building,
            company_job: this.companyForm.value.company_job,
            number_student_train: this.companyForm.value.number_student_train,
            date_addtraining: formattedDate,
          }
          
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result && result.saveData) {
          this.updateCompany();
        }
      });
    }
  }

  openDatePicker() {
    // You can perform any additional logic here if needed
  }
}