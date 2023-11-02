import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-company-officer',
  templateUrl: './search-company-officer.component.html',
  styleUrls: ['./search-company-officer.component.css']
})
export class SearchCompanyOfficerComponent {
  selectedOption1: string = '';
  selectedOption2: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

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





