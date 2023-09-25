import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStudentService } from 'src/app/Student/login-student/login-student.service';

@Component({
  selector: 'app-search-evaluation-form-officer',
  templateUrl: './search-evaluation-form-officer.component.html',
  styleUrls: ['./search-evaluation-form-officer.component.css']
})
export class SearchEvaluationFormOfficerComponent {


  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  searchTerm: string = '';

  constructor(private router: Router, private loginStudentService: LoginStudentService) {}

  submitForm() {
    // Send data to service or perform any other actions here
    this.router.navigate(['/company'], { 
      queryParams: { option1: this.selectedOption1, option2: this.selectedOption2 } 
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
