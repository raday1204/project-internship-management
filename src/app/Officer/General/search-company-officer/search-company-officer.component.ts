import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-company-officer',
  templateUrl: './search-company-officer.component.html',
  styleUrls: ['./search-company-officer.component.css']
})
export class SearchCompanyOfficerComponent {
  selectedOption1: any;
  selectedOption2: any;

  option: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getOptions();
  }

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/get-company.php').subscribe((data: any) => {
      if (Array.isArray(data)) {
        // Create a Set to store unique values for selectedOption1 and selectedOption2
        const uniqueYears = new Set(data.map((item: any) => item.year));
        const uniqueTypeCodes = new Set(data.map((item: any) => item.type_code));
  
        this.selectedOption1 = Array.from(uniqueYears);
        this.selectedOption2 = Array.from(uniqueTypeCodes);
      } else if (typeof data === 'number') {
        console.error('Invalid data structure in the API response.');
      }
    });
  }

  submitForm() {
    const formData = new FormData();
    formData.append('year', this.selectedOption1);
    formData.append('type_code', this.selectedOption2);

    this.http.post('http://localhost/PJ/Backend/Officer/company-officer.php', formData)
      .subscribe((response: any) => {
        console.log('Backend Response:', response);
        if (response.length > 0) {
          this.router.navigate(['/company-information'], { queryParams: { CompanyInformation: JSON.stringify(response) } });
        } else {
        }
      });
  }
}





