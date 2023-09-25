import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStudentService } from 'src/app/Student/login-student/login-student.service';

@Component({
  selector: 'app-search-thanks-form-officer',
  templateUrl: './search-thanks-form-officer.component.html',
  styleUrls: ['./search-thanks-form-officer.component.css']
})
export class SearchThanksFormOfficerComponent {
  selectedOption1: string = '';
  selectedOption2: string = '';
  searchTerm: string = '';

  constructor(private router: Router, private loginStudentService: LoginStudentService) {}
  
  submitForm() {
  this.router.navigate(['/thanks-form'], {
    queryParams: {
      option1: this.selectedOption1,
      option2: this.selectedOption2
    }
  });
}

search() {
  if (this.selectedOption1 && this.selectedOption2) {
    this.loginStudentService.searchData(this.selectedOption1, this.selectedOption2, this.searchTerm);
  } else {
    console.error("Selected options are undefined.");
  }
}
}

