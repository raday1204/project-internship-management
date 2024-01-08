import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-permission-form-officer',
  templateUrl: './search-permission-form-officer.component.html',
  styleUrls: ['./search-permission-form-officer.component.css']
})
export class SearchPermissionFormOfficerComponent {
  selectedOption1: any;
  selectedOption2: any;
  searchForm: FormGroup;
  username: string = '';
  loggedInUsername: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dataStorageService: DataStorageService
  ) {
    this.searchForm = this.formBuilder.group({
      selectedOption1: ['', Validators.required],
      selectedOption2: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.loggedInUsername = localStorage.getItem('loggedInUsername') || '';
    this.username = this.loggedInUsername;
    if (!this.username) {
      this.router.navigateByUrl('/login-officer', { replaceUrl: true });
      return;
    }
<<<<<<< HEAD
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
    // Check if the form is valid
    if (this.searchForm.invalid) {
      this.snackBar.open('กรุณาเลือกปีการศึกษาและประเภท', 'Close', {
        duration: 3000,
      });
      return;
    }
    const formData = new FormData();
    formData.append('year', this.searchForm.value.selectedOption1);
    formData.append('type_name', this.searchForm.value.selectedOption2);

    this.http.post('http://localhost/PJ/Backend/Officer/Company/company-officer.php', formData)
      .subscribe((response: any) => {
        console.log('Backend Response:', response);

        if (response.success && response.data) {
          const companies = response.data.company;
          const students = response.data.students;

          if (companies && companies.length > 0 && students && students.length > 0) {
=======
    
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
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
            // Assuming you only need the company data, not student and need_student
            this.dataStorageService.setYearTypecode(
              this.searchForm.value.selectedOption1,
              this.searchForm.value.selectedOption2
            );

            this.router.navigate(['/permission-form'], {
              relativeTo: this.route,
              queryParams: {
<<<<<<< HEAD
                year: this.searchForm.value.selectedOption1,
                type_name: this.searchForm.value.selectedOption2
=======
                year: this.selectedOption1,
                type_name: this.selectedOption2
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
              },
              queryParamsHandling: 'merge'
            });
          } else {
            // Display Snackbar if there are no students
            this.snackBar.open('ไม่มีรายชื่อในปีการศึกษาและประเภทที่เลือก', 'Close', {
              duration: 3000,
            });
          }
        } else {
          console.error('Invalid response from server.');
        }
      },
        (error) => {
          console.error('HTTP Error:', error);
        });
  }

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
          this.searchForm.reset();
          this.username = ''; // Reset username
          this.router.navigateByUrl('/login-officer', { replaceUrl: true });
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
}