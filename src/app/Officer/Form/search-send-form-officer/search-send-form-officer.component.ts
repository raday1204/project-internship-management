import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

@Component({
  selector: 'app-search-send-form-officer',
  templateUrl: './search-send-form-officer.component.html',
  styleUrls: ['./search-send-form-officer.component.css']
})
export class SearchSendFormOfficerComponent {
  selectedOption1: any;
  selectedOption2: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataStorageService: DataStorageService
    ) {}

    ngOnInit() {
      this.getOptions();
    }
  
    getOptions() {
      this.http.get('http://localhost/PJ/Backend/Officer/get-company-officer.php').subscribe((data: any) => {
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
  
          // Assuming the response contains both 'company' and 'need_student' arrays
          if (response.hasOwnProperty('company') && response.hasOwnProperty('need_student')) {
            this.dataStorageService.setCompanyInformation({
              year: this.selectedOption1,
              type_code: this.selectedOption2,
              company: response.company,
              need_student: response.need_student,
            });
  
            const queryParams = {
              CompanyInformation: JSON.stringify({
                year: this.selectedOption1,
                type_code: this.selectedOption2,
                company: response.company,
                need_student: response.need_student
              })
            };
  
            this.router.navigate(['/send-form'], { queryParams: queryParams });
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
