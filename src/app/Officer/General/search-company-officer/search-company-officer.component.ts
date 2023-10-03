import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-company-officer',
  templateUrl: './search-company-officer.component.html',
  styleUrls: ['./search-company-officer.component.css']
})
export class SearchCompanyOfficerComponent {
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  searchTerm: string = '';

  constructor(private router: Router) {}

  submitForm() {
    // Send data to service or perform any other actions here
    this.router.navigate(['/student-information'], { 
      queryParams: { option1: this.selectedOption1, option2: this.selectedOption2 } 
    });
  }
}
