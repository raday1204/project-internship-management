import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-thanks-form-officer',
  templateUrl: './search-thanks-form-officer.component.html',
  styleUrls: ['./search-thanks-form-officer.component.css']
})
export class SearchThanksFormOfficerComponent {
  selectedOption1: string = '';
  selectedOption2: string = '';
  searchTerm: string = '';

  constructor(private router: Router) {}
  
  submitForm() {
  this.router.navigate(['/thanks-form'], {
    queryParams: {
      option1: this.selectedOption1,
      option2: this.selectedOption2
    }
  });
}

}

