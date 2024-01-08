import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';
import { CompanyStudentService } from './company-student/company-student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
<<<<<<< HEAD
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801

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
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
<<<<<<< HEAD
    private location: Location,
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService
  ) {
    this.searchForm = this.formBuilder.group({
      selectedOption5: ['', Validators.required],
      selectedOption6: ['', Validators.required],
    });
  }
=======
    private dataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService
  ) { }
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801

  ngOnInit() {
    this.username = this.companyStudentService.getUsername();
    console.log('Username from service:', this.username);
    this.getOptions();
<<<<<<< HEAD

    if (!this.username) {
      this.router.navigateByUrl('/login-student', { replaceUrl: true });
      return;
    }
=======
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
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
<<<<<<< HEAD
    // Check if the form is valid
    if (this.searchForm.invalid) {
      this.snackBar.open('กรุณาเลือกปีการศึกษาและประเภท', 'Close', {
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('year', this.searchForm.value.selectedOption5);
    formData.append('type_name', this.searchForm.value.selectedOption6);
=======
    const formData = new FormData();
    formData.append('year', this.selectedOption5);
    formData.append('type_name', this.selectedOption6);
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801

    this.http.post('http://localhost/PJ/Backend/Officer/Company/company-officer.php', formData)
      .subscribe((response: any) => {
        console.log('Backend Response:', response);
        if (response.error) {
          this.snackBar.open('ไม่มีรายชื่อในปีการศึกษาและประเภทที่เลือก', 'Close', {
            duration: 3000,
          });
        } else if (response.success && response.data && response.data.company && response.data.company.length > 0) {
          // Assuming you only need the company data, not student and need_student
<<<<<<< HEAD
          this.dataStorageService.setYearTypecode(this.searchForm.value.selectedOption5, this.searchForm.value.selectedOption6);
=======
          this.dataStorageService.setYearTypecode(this.selectedOption5, this.selectedOption6);
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801

          this.router.navigate(['/company-student'], {
            relativeTo: this.route,
            queryParams: {
<<<<<<< HEAD
              year: this.searchForm.value.selectedOption5,
              type_name: this.searchForm.value.selectedOption6
            },
            queryParamsHandling: 'merge'
          });
        } else {
=======
              year: this.selectedOption5,
              type_name: this.selectedOption6
            },
            queryParamsHandling: 'merge'
          });
        }  else {
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
          console.error('Invalid response from server.');
        }
      },
        (error) => {
          console.error('HTTP Error:', error);
        });
  }
<<<<<<< HEAD


  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
          localStorage.removeItem('selectedCompanyID');
          this.searchForm.reset();
          this.username = ''; // Reset username
          this.router.navigateByUrl('/login-student', { replaceUrl: true });
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
=======
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
}