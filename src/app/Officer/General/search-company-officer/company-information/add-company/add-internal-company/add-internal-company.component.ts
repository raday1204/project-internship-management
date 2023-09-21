import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-internal-company',
  templateUrl: './add-internal-company.component.html',
  styleUrls: ['./add-internal-company.component.css']
})
export class AddInternalCompanyComponent {
  company: any = {};
  need_student: any = {};

  constructor(private http: HttpClient) {}

  saveData() {
    const formData = {
      company_building: this.company.company_building,
      company_job: this.company.company_job,
      company_period: this.company.company_period,
      number_student_train: this.need_student.number_student_train,
    };

    this.http.post('http://localhost:4200/api/saveDataToMySQL', formData)
    .subscribe(
      response => {
        console.log('Success', response);
      },
      error => {
        console.error('Error', error);
      }
    );
}
}