import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-student-officer',
  templateUrl: './search-student-officer.component.html',
  styleUrls: ['./search-student-officer.component.css']
})
export class SearchStudentOfficerComponent {
  selectedOption3: any;
  selectedOption4: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getOptions();
  }

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/get-student-officer.php').subscribe((data: any) => {
      if (Array.isArray(data)) {
        // Create a Set to store unique values for selectedOption1 and selectedOption2
        const uniqueYears = new Set(data.map((item: any) => item.year));
        const uniqueTypeCodes = new Set(data.map((item: any) => item.type_code));
  
        this.selectedOption3 = Array.from(uniqueYears);
        this.selectedOption4 = Array.from(uniqueTypeCodes);
      } else if (typeof data === 'number') {
        console.error('Invalid data structure in the API response.');
      }
    });
  }

  submitForm() {
    const formData = new FormData();
    formData.append('year', this.selectedOption3);
    formData.append('type_code', this.selectedOption4);
  
    this.http.post('http://localhost/PJ/Backend/Officer/student-officer.php', formData)
      .subscribe((response: any) => {
        console.log('Backend Response:', response);
        if (Array.isArray(response) && response.length > 0) {
          // Assuming the response contains necessary data
          const queryParams = {
            StudentInformation: JSON.stringify(response)
          };
  
          this.router.navigate(['/student-information'], { queryParams: queryParams });
        } else {
          console.error('Invalid response from server.');
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }
}  
