import { Component } from '@angular/core';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent {
  CompanyInformation = {
    company_id: '',
    company_name: '',
    company_building: '',
    number_student_train: '',
  };

  StudentProfileData = {
    student_name: '',
    student_code: ''
  };
}
