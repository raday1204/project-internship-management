import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent {
  company: any = {};
  need_student: any = {};
  company_id: any = {};
  CompanyInformation: any = {};
  selectedOption1: any = {};
  selectedOption2: any = {};

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.company_id = this.route.snapshot.params['company_id'];
    this.getCompanyData(this.company_id);

    this.route.queryParams.subscribe(params => {
      if (params['CompanyInformation']) {
        this.CompanyInformation = Object.values(JSON.parse(params['CompanyInformation']));
      }
    });
  }

  getCompanyData(company_id: any) {
    this.http.get(`http://localhost/PJ/Backend/Officer/company.php?company_id=${company_id}`)
      .subscribe((response: any) => {
        if (response.success) {
          this.company = response.data; // Assuming response.data contains the company details
          this.need_student = response.need_student; // Assuming response.need_student contains need_student details
        } else {
          console.error(response.message);
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }

  updateCompany() {
    const formDataCompany  = {
      company_id: this.company.company_id,
      company_name: this.company.company_name,
      send_name: this.company.send_name,
      send_coordinator: this.company.send_coordinator,
      send_position: this.company.send_position,
      send_tel: this.company.send_tel,
      send_email: this.company.send_email,
      send_mobile: this.company.send_mobile,
      company_building: this.company.company_building,
      company_job: this.company.company_job,
      number_student_train: this.need_student.number_student_train,
      date_addtraining: this.need_student.date_addtraining
    };

    this.http.post('http://localhost/PJ/Backend/Officer/edit-company.php', formDataCompany )
      .subscribe((responseCompany: any) => {
        if (responseCompany.success) {
          console.log(responseCompany.message);
          
          const formData = new FormData();
          formData.append('year', this.selectedOption1);
          formData.append('type_code', this.selectedOption2);

          this.http.post('http://localhost/PJ/Backend/Officer/company-officer.php', formData)
            .subscribe((responseForm: any) => {
              console.log('Backend Response:', responseForm);
              if (responseForm.length > 0) {
                // Update the company and need_student properties with the received data
                this.company = responseForm[0].company;
                this.need_student = responseForm[0].need_student;

                this.router.navigate(['/company-information'], { queryParams: { CompanyInformation: JSON.stringify(responseForm) } });
              }
            });
        } else {
          console.error(responseCompany.message);
        }
      }, (error) => {
        console.error('HTTP Error:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error('Backend returned code ${error.status}, body was: ', error.error);
        }
      });
  }
}

