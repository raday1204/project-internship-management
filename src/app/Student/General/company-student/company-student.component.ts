import { Component } from '@angular/core';
import { CompanyStudentService } from './company-student.service';

@Component({
  selector: 'app-company-student',
  templateUrl: './company-student.component.html',
  styleUrls: ['./company-student.component.css']
})
export class CompanyStudentComponent {
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
  
  selectedItem: any;
  items: any[] = [];

  constructor(private companyStudentService: CompanyStudentService) { 
    this.selectedItem = 'default value';
  }

  ngOnInit(): void {
    this.companyStudentService.getCompanyInformation().subscribe(data => {
      this.CompanyInformation = data[0]; // Assuming data is an array of objects
    });
    this.items = [/* ... */];
  }
  submitSelectedItem() {
    console.log("Submit button clicked!");
  }

  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);
}
}