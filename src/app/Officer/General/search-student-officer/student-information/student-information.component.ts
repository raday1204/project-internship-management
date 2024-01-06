import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../../search-company-officer/company-information/data-storage.service';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {
  StudentInformation: any[] = [];
  selectedOption3: any;
  selectedOption4: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    const studentInformation = this.dataStorageService.getStudentInformation();

    if (studentInformation) {
      this.StudentInformation = studentInformation.student; // Access the 'student' property
      this.selectedOption3 = studentInformation.year;
      this.selectedOption4 = studentInformation.type_name;
      // Handle accordingly, e.g., redirect to another page or show an error message
    }
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