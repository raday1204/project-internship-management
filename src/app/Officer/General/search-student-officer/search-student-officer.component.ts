import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.getOptions();
  }

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/Student/get-student-officer.php').subscribe(
      (data: any) => {
        if (data.success) {
          if (Array.isArray(data.data)) {
            // Create a Set to store unique values for selectedOption1 and selectedOption2
            const uniqueYears = new Set(data.data.map((item: any) => item.year));
            const uniqueTypeNames = new Set(data.data.map((item: any) => item.type_name));

            this.selectedOption3 = Array.from(uniqueYears);
            this.selectedOption4 = Array.from(uniqueTypeNames);
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
    formData.append('year', this.selectedOption3.toString());
    formData.append('type_name', this.selectedOption4.toString());

    this.http.post('http://localhost/PJ/Backend/Officer/Student/student-officer.php', formData)
      .subscribe(
        (response: any) => {
          console.log('Backend Response:', response);

          if (response.error) {
            this.snackBar.open('ไม่มีรายชื่อในปีการศึกษาและประเภทที่เลือก', 'Close', {
              duration: 500,
            });

          } else if (response.student && response.student.length > 0) {
            // Save student information in the data storage service
            this.dataStorageService.setStudentInformation({
              year: this.selectedOption3,
              type_name: this.selectedOption4,
              student: response.student
            });

            // Navigate to student-information component
            const queryParams = {
              StudentInformation: JSON.stringify({
                year: this.selectedOption3,
                type_name: this.selectedOption4,
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

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
          this.router.navigate(['/login-officer']);
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
}