import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStudentService } from 'src/app/Student/login-student/login-student.service';

@Component({
  selector: 'app-company-form-student',
  templateUrl: './company-form-student.component.html',
  styleUrls: ['./company-form-student.component.css']
})
export class CompanyFormStudentComponent {
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  searchTerm: string = '';
  StudentProfileData = {
  student_name: '',
  student_code: ''
}

company = {
  company_name: '',
  send_coordinator: '',
  send_position: '',
  send_email: '',
  send_mobile: '',
  company_job: '',
  student_name: '',
  company_qualifications: '',
  company_period: ''
}

  constructor(private router: Router, private loginStudentService: LoginStudentService) {}

  submitForm() {
    // Send data to service or perform any other actions here
    this.router.navigate(['/company'], { 
      queryParams: { option1: this.selectedOption1, option2: this.selectedOption2 } 
    });
  }

  search() {
    this.loginStudentService['searchData'](this.selectedOption1, this.selectedOption2, this.searchTerm)
      .subscribe((results: any) => {
        // Process the search results here
        console.log(results);
      });
  }
}

