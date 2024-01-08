import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../../search-company-officer/company-information/data-storage.service';
import { CompanyStudentService } from 'src/app/Student/General/search-company-student/company-student/company-student.service';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {
  StudentInformation: any[] = [];
  selectedOption3: any;
  selectedOption4: any;
  username: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService
  ) { }

  ngOnInit() {
    const studentInformation = this.dataStorageService.getStudentInformation();

    if (studentInformation) {
      this.StudentInformation = studentInformation.student; // Access the 'student' property
      this.selectedOption3 = studentInformation.year;
      this.selectedOption4 = studentInformation.type_name;
      // Handle accordingly, e.g., redirect to another page or show an error message
    }
    this.username = this.companyStudentService.getUsername();
    console.log('Username from service:', this.username);
    if (!this.username) {
      this.router.navigateByUrl('/login-officer', { replaceUrl: true });
      return;
    }
  }
<<<<<<< HEAD

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');

          // Disable browser back
          history.pushState('', '', window.location.href);
          window.onpopstate = function () {
            history.go(1);
          };
          this.companyStudentService.setUsername('');
          // Navigate to login-student
          const navigationExtras: NavigationExtras = {
            replaceUrl: true,
            state: {
              clearHistory: true
            }
          };

          this.router.navigate(['/login-officer'], navigationExtras);
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
=======
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
}