import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-send-form-officer',
  templateUrl: './search-send-form-officer.component.html',
  styleUrls: ['./search-send-form-officer.component.css']
})
export class SearchSendFormOfficerComponent {
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