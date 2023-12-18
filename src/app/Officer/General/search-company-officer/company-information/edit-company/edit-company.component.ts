import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditCompanyPopupComponent } from 'src/app/Officer/General/search-company-officer/company-information/edit-company/edit-company-popup/edit-company-popup.component'
import { DataStorageService } from '../data-storage.service';

interface CompanyData {
  company_id: string;
  company_name: string;
  send_name: string;
  send_coordinator: string;
  send_position: string;
  send_tel: string;
  send_email: string;
  send_mobile: string;
  company_building: string;
  company_job: string;
}

interface NeedStudentData {
  number_student_train: number;
  date_addtraining: string;
}

interface CompanyResponse {
  success: boolean;
  data: {
    company: CompanyData;
    need_student: NeedStudentData;
  };
}

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent implements OnInit {
  companyForm: FormGroup;
  companyData: CompanyData = {} as CompanyData;
  needStudentData: NeedStudentData = {} as NeedStudentData;
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
      send_name: [''],
      send_coordinator: [''],
      send_position: [''],
      send_tel: [''],
      send_email: [''],
      send_mobile: [''],
      company_job: [''],
      number_student_train: [''],
      date_addtraining: [''],
    });
  }

  ngOnInit(): void {
    const companyId = this.route.snapshot.params['company_id'];
    console.log('Invalid company ID.', companyId);
    this.getCompanyData(companyId);
  }

  getCompanyData(companyId: string): void {
    this.http.get<CompanyResponse>(`http://localhost/PJ/Backend/Officer/Company/company-detail.php?company_id=${companyId}`)
      .subscribe((response: CompanyResponse) => {
        if (response.success) {
          console.log(response.data)

          this.companyData = response.data.company;
          this.needStudentData = response.data.need_student;

          // Set initial form values
          this.companyForm.patchValue({
            company_id: this.companyData.company_id,
            company_name: this.companyData.company_name,
            company_building: this.companyData.company_building,
            send_name: this.companyData.send_name,
            send_coordinator: this.companyData.send_coordinator,
            send_position: this.companyData.send_position,
            send_tel: this.companyData.send_tel,
            send_email: this.companyData.send_email,
            send_mobile: this.companyData.send_mobile,
            company_job: this.companyData.company_job,
            number_student_train: this.needStudentData.number_student_train,
            date_addtraining: this.needStudentData.date_addtraining,
          });
        } else {
          console.error('Server error:', response);
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }


  updateCompany() {
    if (this.companyForm.valid) {
      const formattedDate = this.companyForm.value.date_addtraining
        ? formatDate(this.companyForm.value.date_addtraining, 'yyyy/MM/dd', 'en-US')
        : '';
        const formDataCompany = new FormData();
        formDataCompany.append('company_id', this.companyForm.value.company_id);
        formDataCompany.append('send_name', this.companyForm.value.send_name);
        formDataCompany.append('send_coordinator', this.companyForm.value.send_coordinator);
        formDataCompany.append('send_position', this.companyForm.value.send_position);
        formDataCompany.append('send_tel', this.companyForm.value.send_tel);
        formDataCompany.append('send_email', this.companyForm.value.send_email);
        formDataCompany.append('send_mobile', this.companyForm.value.send_mobile);
        formDataCompany.append('company_job', this.companyForm.value.company_job);
        formDataCompany.append('number_student_train', this.companyForm.value.number_student_train || '');
        formDataCompany.append('date_addtraining', formattedDate);
    
        formDataCompany.append('company_name', this.companyForm.value.company_name);
        formDataCompany.append('company_building', this.companyForm.value.company_building);
    
        const excludedFields = ['company_name', 'company_building', 'date_addtraining'];
    
        Object.keys(this.companyForm.controls).forEach((key) => {
          if (!excludedFields.includes(key)) {
            const control = this.companyForm.get(key);
            if (control) {
              formDataCompany.append(key, control.value);
            }
          }
        });

        this.http.post('http://localhost/PJ/Backend/Officer/Company/edit-company.php', formDataCompany)
        .subscribe(
          (responseCompany: any) => {
            if (responseCompany.success) {
              console.log(responseCompany.message);
              this.router.navigate(['/company-information']);
            } else {
            }
          },
          (error) => {
            console.error('Error:', error);
          }
          );
      }
    }


  // Method to open a simple alert as a popup displaying the updated data
  openUpdatePopup(): void {
    const formattedDate = this.companyForm.value.date_addtraining
      ? formatDate(this.companyForm.value.date_addtraining, 'yyyy/MM/dd', 'en-US')
      : '';

    if (this.companyForm.valid) {
      const dialogRef = this.dialog.open(EditCompanyPopupComponent, {
        data: {
          company: {
            company_id: this.companyData.company_id,
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