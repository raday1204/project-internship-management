import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';
import { CompanyStudentService } from './company-student/company-student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
    private dataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService
  ) { }

  ngOnInit() {
    this.username = this.companyStudentService.getUsername();
    console.log('Username from service:', this.username);
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

            this.selectedOption5 = Array.from(uniqueYears);
            this.selectedOption6 = Array.from(uniqueTypeNames);
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
    formData.append('year', this.selectedOption5);
    formData.append('type_name', this.selectedOption6);

    this.http.post('http://localhost/PJ/Backend/Officer/Company/company-officer.php', formData)
      .subscribe((response: any) => {
        console.log('Backend Response:', response);
        if (response.error) {
          this.snackBar.open('ไม่มีรายชื่อในปีการศึกษาและประเภทที่เลือก', 'Close', {
            duration: 3000,
          });
        } else if (response.success && response.data && response.data.company && response.data.company.length > 0) {
          // Assuming you only need the company data, not student and need_student
          this.dataStorageService.setYearTypecode(this.selectedOption5, this.selectedOption6);

          this.router.navigate(['/company-student'], {
            relativeTo: this.route,
            queryParams: {
              year: this.selectedOption5,
              type_name: this.selectedOption6
            },
            queryParamsHandling: 'merge'
          });
        }  else {
          console.error('Invalid response from server.');
        }
      },
        (error) => {
          console.error('HTTP Error:', error);
        });
  }
}