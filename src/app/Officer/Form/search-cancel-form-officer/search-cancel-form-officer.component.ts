import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-cancel-form-officer',
  templateUrl: './search-cancel-form-officer.component.html',
  styleUrls: ['./search-cancel-form-officer.component.css']
})
export class SearchCancelFormOfficerComponent {
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  searchTerm: string = '';

  constructor(private router: Router) {}

  submitForm() {
    // Send data to service or perform any other actions here
    this.router.navigate(['/company'], { 
      queryParams: { option1: this.selectedOption1, option2: this.selectedOption2 } 
    });
  }
}
