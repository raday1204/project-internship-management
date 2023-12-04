// search-student-officer.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../search-company-officer/company-information/data-storage.service';

@Component({
  selector: 'app-search-student-officer',
  templateUrl: './search-student-officer.component.html',
  styleUrls: ['./search-student-officer.component.css']
})
export class SearchStudentOfficerComponent {
  selectedOption3: any[] = [];
  selectedOption4: any[] = [];
  studentInformation: any[] = [];
  error: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.getOptions();
  }

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/Student/get-student-officer.php').subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          const uniqueYears = new Set(response.data.map((item: any) => item.year));
          const uniqueTypeCodes = new Set(response.data.map((item: any) => item.type_code));

          // Convert sets to arrays
          this.selectedOption3 = Array.from(uniqueYears);
          this.selectedOption4 = Array.from(uniqueTypeCodes);
        } else {
          console.error('Invalid data structure in the API response.');
        }
      },
      (error) => {
        console.error('Error fetching options:', error);
        // Handle error appropriately
      }
    );
  }

  submitForm() {
    const formData = new FormData();
    formData.append('year', this.selectedOption3.toString());
    formData.append('type_code', this.selectedOption4.toString());

    this.http.post('http://localhost/PJ/Backend/Officer/Student/student-officer.php', formData)
      .subscribe(
        (response: any) => {
          console.log('Backend Response:', response);

          if (response.error === 'No data found for the given year and type_code.') {
            this.error = 'No data found for the selected year and type_code.';
          } else if (response.student && response.student.length > 0) {
            // Save student information in the data storage service
            this.dataStorageService.setStudentInformation({
              year: this.selectedOption3,
              type_code: this.selectedOption4,
              student: response.student
            });

            // Navigate to student-information component
            const queryParams = {
              StudentInformation: JSON.stringify({
                year: this.selectedOption3,
                type_code: this.selectedOption4,
                student: response.student
              })
            };
            this.router.navigate(['/student-information'], { queryParams: queryParams });
          } else {
            console.error('Invalid response from server.');
          }
        },
        (error) => {
          console.error('HTTP Error:', error);
        }
      );
  }
}
