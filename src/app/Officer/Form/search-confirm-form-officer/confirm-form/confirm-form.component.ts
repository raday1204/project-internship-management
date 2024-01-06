import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CompanyStudentService } from 'src/app/Student/General/search-company-student/company-student/company-student.service';

interface Company {
  selected: boolean;
  company_id: string;
  company_name: string;
  company_building: string;
}

interface Student {
  company_id: string;
  student_code: string;
  student_name: string;
  student_lastname: string;
}

interface CompanyInformation {
  company: Company;
  students: Student[];
}

interface CompanyResponse {
  success: boolean;
  data: CompanyInformation[];
}

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.css']
})
export class ConfirmFormComponent {
  companyInformation: CompanyInformation[] = [];

  student: { [key: string]: Student[] } = {};
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  username: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private companyStudentService: CompanyStudentService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedOption1 = params['year'];
      this.selectedOption2 = params['type_name'];
    });
    this.fetchData();
    if (!this.username) {
      this.router.navigateByUrl('/login-officer', { replaceUrl: true });
      return;
    }
  }

  fetchData() {
    this.http
      .get<CompanyResponse>(
        `http://localhost/PJ/Backend/Officer/Company/get-company-information.php?year=${this.selectedOption1}&type_name=${this.selectedOption2}`
      )
      .subscribe(
        (response: CompanyResponse) => {
          console.log('Backend Response:', response.data);
          if (response && response.success) {
            if (Array.isArray(response.data)) {
              this.companyInformation = response.data;
              this.companyInformation = response.data.filter(companyInfo => {
                // Filter out companies without students
                return companyInfo.students && companyInfo.students.length > 0;
              });
            } else {
              console.error('Invalid data structure in the server response.');
            }
          }
        },
        (error) => {
          console.error('HTTP Error:', error);
        }
      );
  }

  selectForm(form: any) { }

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
}