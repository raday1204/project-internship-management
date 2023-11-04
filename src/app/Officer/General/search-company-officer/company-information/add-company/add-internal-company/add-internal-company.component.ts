import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-internal-company',
  templateUrl: './add-internal-company.component.html',
  styleUrls: ['./add-internal-company.component.css']
})
export class AddInternalCompanyComponent {
  company: any = {};
  need_student: any = {};
  company_id = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  saveInternal() {
    const formData = {
      company_building: this.company.company_building,
      company_job: this.company.company_job,
      date_addtraining: this.need_student.date_addtraining,
      number_student_train: this.need_student.number_student_train,
    };

    this.http.post('http://localhost/PJ/Backend/Officer/add-internal-company.php', formData)
      .subscribe((response: any) => {
        if (response.success) {
          console.log(response.message);
          // Handle successful save
        } else {
          console.error(response.message);
          // Handle error
        }
      }, (error) => {
        console.error('HTTP Error:', error);
        // Handle HTTP error
      });
  }
}