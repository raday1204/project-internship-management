import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStudentService } from 'src/app/Student/login-student/login-student.service';

@Component({
  selector: 'app-search-student-officer',
  templateUrl: './search-student-officer.component.html',
  styleUrls: ['./search-student-officer.component.css']
})
export class SearchStudentOfficerComponent {
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  searchTerm: string = '';

  constructor(private router: Router, private loginStudentService: LoginStudentService) {}

  submitForm() {
    // Send data to service or perform any other actions here
    this.router.navigate(['/student-information'], { 
      queryParams: { option1: this.selectedOption1, option2: this.selectedOption2 } 
    });
  }

  search() {
    if (this.selectedOption1 && this.selectedOption2 && this.searchTerm) {
      this.loginStudentService.searchData(this.selectedOption1, this.selectedOption2, this.searchTerm);
    } else {
      console.error("One or more of the selected options are undefined.");
    }
  }
}

