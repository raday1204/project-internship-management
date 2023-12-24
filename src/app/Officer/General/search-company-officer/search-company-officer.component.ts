import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from './company-information/data-storage.service';

@Component({
  selector: 'app-search-company-officer',
  templateUrl: './search-company-officer.component.html',
  styleUrls: ['./search-company-officer.component.css']
})
export class SearchCompanyOfficerComponent {
  selectedOption1: any;
  selectedOption2: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.getOptions();
  }

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/Company/get-company-officer.php').subscribe(
      (data: any) => {
        if (data.success) {
          if (Array.isArray(data.data)) {
            // Create a Set to store unique values for selectedOption1 and selectedOption2
            const uniqueYears = new Set(data.data.map((item: any) => item.year));
            const uniqueTypeNames = new Set(data.data.map((item: any) => item.type_name));
  
            this.selectedOption1 = Array.from(uniqueYears);
            this.selectedOption2 = Array.from(uniqueTypeNames);
          } else {
            console.error('Invalid data structure in the API response.');
          }
        } else {
          console.error('API request failed:', data.message);
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }
  

  submitForm() {
    const formData = new FormData();
    formData.append('year', this.selectedOption1);
    formData.append('type_name', this.selectedOption2);
  
    this.http.post('http://localhost/PJ/Backend/Officer/Company/company-officer.php', formData)
      .subscribe((response: any) => {
        console.log('Backend Response:', response);
  
        if (response.success && response.data && response.data.company && response.data.company.length > 0) {
          // Assuming you only need the company data, not student and need_student
          this.dataStorageService.setYearTypecode(this.selectedOption1, this.selectedOption2);
  
          this.router.navigate(['/company-information'], {
            relativeTo: this.route,
            queryParams: {
              year: this.selectedOption1,
              type_name: this.selectedOption2
            },
            queryParamsHandling: 'merge'
          });
        } else {
          console.error('Invalid response from server.');
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
      });
  }
}  