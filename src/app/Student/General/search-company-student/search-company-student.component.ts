import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';
import { CompanyStudentService } from './company-student/company-student.service';
@Component({
  selector: 'app-search-company-student',
  templateUrl: './search-company-student.component.html',
  styleUrls: ['./search-company-student.component.css']
})
export class SearchCompanyStudentComponent {
  username: string = '';
  selectedOption5: any;
  selectedOption6: any;
  CompanyInformation: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private http: HttpClient,
    private dataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService
    ) {}

    ngOnInit() {
      this.username = this.companyStudentService.getUsername();
      console.log('Username from service:', this.username);
      this.getOptions();
    }
  
    getOptions() {
      this.http.get('http://localhost/PJ/Backend/Officer/Company/get-company-officer.php').subscribe((data: any) => {
        if (Array.isArray(data)) {
          // Create a Set to store unique values for selectedOption1 and selectedOption2
          const uniqueYears = new Set(data.map((item: any) => item.year));
          const uniqueTypeCodes = new Set(data.map((item: any) => item.type_code));
  
          this.selectedOption5 = Array.from(uniqueYears);
          this.selectedOption6 = Array.from(uniqueTypeCodes);
        } else if (typeof data === 'number') {
          console.error('Invalid data structure in the API response.');
        }
      });
    }
  
    submitForm() {
      const formData = new FormData();
      formData.append('year', this.selectedOption5);
      formData.append('type_code', this.selectedOption6);
    
      this.http.post('http://localhost/PJ/Backend/Officer/Company/company-officer.php', formData)
        .subscribe((response: any) => {
          console.log('Backend Response:', response);
    
          if (response.company && Array.isArray(response.company)) {
            // Assuming you only need the company data, not student and need_student
            this.dataStorageService.setYearTypecode(this.selectedOption5, this.selectedOption6);
    
            this.router.navigate(['/company-student'], {
              relativeTo: this.route,
              queryParams: {
                year: this.selectedOption5,
                type_code: this.selectedOption6
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