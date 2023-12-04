import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditCompanyPopupComponent } from 'src/app/Officer/General/search-company-officer/company-information/edit-company/edit-company-popup/edit-company-popup.component'

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent implements OnInit {
  company: any = {};
  need_student: any = {};
  company_id: any = {};
  CompanyInformation: any = {};
  selectedOption1: any;
  selectedOption2: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.company_id = this.route.snapshot.params['company_id'];
    this.getCompanyData(this.company_id);

    this.route.queryParams.subscribe(params => {
      if (params['CompanyInformation']) {
        const parsedData = JSON.parse(params['CompanyInformation']);
        this.CompanyInformation = parsedData;
        this.selectedOption1 = parsedData.year;
        this.selectedOption2 = parsedData.type_code;
      }
    });
  }


  getCompanyData(company_id: any) {
    this.http.get(`http://localhost/PJ/Backend/Officer/Company/company.php?company_id=${company_id}`)
      .subscribe((response: any) => {
        if (response.success) {
          this.company = response.data;
          this.need_student = response.need_student;
        } else {
          console.error(response.message);
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }

  updateCompany() {
    const formDataCompany = {
      company_id: this.company ? this.company.company_id : null,
      company_name: this.company ? this.company.company_name : null,
      send_name: this.company ? this.company.send_name : null,
      send_coordinator: this.company ? this.company.send_coordinator : null,
      send_position: this.company ? this.company.send_position : null,
      send_tel: this.company ? this.company.send_tel : null,
      send_email: this.company ? this.company.send_email : null,
      send_mobile: this.company ? this.company.send_mobile : null,
      company_building: this.company ? this.company.company_building : null,
      company_job: this.company ? this.company.company_job : null,
      number_student_train: this.need_student ? this.need_student.number_student_train : null,
      date_addtraining: this.need_student ? this.need_student.date_addtraining : null,
      year: this.selectedOption1,
      type_code: this.selectedOption2
    };

    this.http.post('http://localhost/PJ/Backend/Officer/Company/edit-company.php', formDataCompany)
      .subscribe((responseCompany: any) => {
        if (responseCompany.success) {
          console.log(responseCompany.message);

          // Update this.company and this.need_student with formDataCompany
        this.company = {
          company_id: formDataCompany.company_id,
          company_name: formDataCompany.company_name,
          send_name: formDataCompany.send_name,
          send_coordinator: formDataCompany.send_coordinator,
          send_position: formDataCompany.send_position,
          send_tel: formDataCompany.send_tel,
          send_email: formDataCompany.send_email,
          send_mobile: formDataCompany.send_mobile,
          company_building: formDataCompany.company_building,
          company_job: formDataCompany.company_job,
        };

        this.need_student = {
          number_student_train: formDataCompany.number_student_train,
          date_addtraining: formDataCompany.date_addtraining,
        };

        // Use queryParams to send updated data to company-information component
        const queryParams = {
          CompanyInformation: JSON.stringify(formDataCompany)
        };
        
          // Open a popup displaying the updated data
          this.openUpdatePopup(formDataCompany, queryParams);
        } else {
          console.error(responseCompany && responseCompany.message ? responseCompany.message : 'Unknown error occurred');
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }
  
  // Method to open a simple alert as a popup displaying the updated data
  openUpdatePopup(updatedData: any, queryParams: any): void {
    const dialogRef = this.dialog.open(EditCompanyPopupComponent, {
      data: updatedData, // Pass the updated data to the dialog component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Additional logic after the dialog is closed, if needed
  
      // Navigate back to company-information with the updated data
      this.router.navigate(['/company-information'], { queryParams: queryParams });
    });
  }
}