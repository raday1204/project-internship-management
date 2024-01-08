import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyStudentService } from '../General/search-company-student/company-student/company-student.service';
<<<<<<< HEAD
import { MatSnackBar } from '@angular/material/snack-bar';
=======
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801

interface Relation {
  id: number;
  relation_date: string;
  relation_content: string;
}

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})

export class HomeStudentComponent implements OnInit {
  [x: string]: any;
  dateTime: Date | undefined
  username: string = '';
  loggedInUsername: string = '';
  relations: Relation[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private companyStudentService: CompanyStudentService
  ) { }

  ngOnInit() {
    this.dateTime = new Date();
    this.loggedInUsername = localStorage.getItem('loggedInUsername') || '';
    this.username = this.loggedInUsername;
    this.checkLoginStatus();
<<<<<<< HEAD
=======
    // this.checkTrainingStatus();
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801

    const serverUrl = 'http://localhost/PJ/Backend/Student/get-relation-student.php';

    this.http.get<{ data: Relation[] }>(serverUrl).subscribe(
      (response) => {
        this.relations = response.data;
      },
      (error) => {
        console.error('HTTP Error:', error);
        // Handle error here
      }
    );
  }

  menuSidebar = [
    {
      link_name: "คำอธิบายรายวิชา",
      link: "/course-student",
      icon: "fa-regular fa-paste",
      sub_menu: []
    },

    {
      link_name: "ข้อแนะนำฝึกงาน",
      link: "/advice-student",
      icon: "fa-regular fa-thumbs-up",
      sub_menu: []
    },

    {
      link_name: "ปฏิทินฝึกงาน",
      link: "/calendar-student",
      icon: "fa-regular fa-calendar",
      sub_menu: []
    },

    {
      link_name: "ข้อมูลประวัติส่วนตัว",
      link: '/profile-student',
      icon: "fa-solid fa-clipboard-user",
      sub_menu: []
    },

    {
      link_name: "ข้อมูลหน่วยงาน",
      link: "/search-company-student",
      icon: "fa-solid fa-list",
      sub_menu: []
    },

    {
      link_name: "ตรวจสอบสถานะ",
      action: () => this.checkCompanyStatus(),// link: "/wait-status",
      icon: "fa-solid fa-user-check",
      sub_menu: [],
    },

    {
      link_name: "ตรวจสอบสถานะแบบประเมิน",
      action: () => this.checkAssessmentStatus(),// link: "/wait-status",
      icon: "fa-solid fa-file-circle-check",
      sub_menu: [],
    },

    {
      link_name: "ผู้ประสานงานด้านการฝึกงาน",
      link: "/coordinator-student",
      icon: "fa-solid fa-person-circle-question",
      sub_menu: []
    },
  ]

  formSidebar = [
    {
      link_name: "คู่มือการฝึกงานเสริมสร้างทักษะประสบการณ์วิชาชีพวิศวกรรม",
      link: "/manual-form-student",
      icon: "fa-regular fa-circle-question",
      sub_menu: []
    },

    {
      link_name: "01-ข้อมูลหน่วยงาน",
      link: "/company-form-student",
      icon: "fa-regular fa-file-pdf",
      sub_menu: []
    },

    {
      link_name: "04-แบบบันทึกประจำวัน",
      link: "/diary-form-student",
      icon: "fa-regular fa-file-pdf",
      sub_menu: []
    },

    {
      link_name: "06-สถานประกอบการในมุมมองของนิสิต",
      link: "/evaluation-form-student",
      icon: "fa-regular fa-file-pdf",
      sub_menu: []
    },
  ]

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  checkLoginStatus() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/home-student.php', { username: this.username })
      .subscribe(
        (response: any) => {
          if (response.loggedIn) {
            this.username = response.username;
            console.log(`Welcome, ${this.username}, to the home-student page!`);
            this.companyStudentService.setUsername(this.username);
            // Navigate to company-information with the username as a query parameter
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { username: this.username },
              queryParamsHandling: 'merge'
            });
          } else {
            this.router.navigate(['/login-student']);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }

<<<<<<< HEAD
  //Company-Status
  checkCompanyStatus() {
    console.log('Checking training status for username:', this.username);
    const requestBody = { username: this.username };

    this.http.post<any>('http://localhost/PJ/Backend/Student/Training/check-training-status.php', JSON.stringify(requestBody))
      .subscribe(
        (response: any) => {
          if (response && response.success) {
            const trainingData = response.data.trainingData;  // Match the key with PHP response
            console.log('Training Data:', trainingData);

            if (trainingData.length > 0) {
              const company_status = trainingData[0].company_status;
              if (company_status === '1') {
                this.router.navigate(['/wait-status']);
              } else if (company_status === '2') {
                this.router.navigate(['/confirm-status']);
              } else if (company_status === '3') {
                localStorage.removeItem('selectedCompanyID');
                this.router.navigate(['/cancel-status']);
              }
            } else {
              // console.log('No training status found.');
              this.snackBar.open('ยังไม่ได้เลือกหน่วยงาน', 'Close', {
                duration: 3000,
              });
            }
          } else {
            console.log('No training status found or an error occurred.');
=======
 //Company-Status
checkCompanyStatus() {
  console.log('Checking training status for username:', this.username);
  const requestBody = { username: this.username };

  this.http.post<any>('http://localhost/PJ/Backend/Student/Training/check-training-status.php', JSON.stringify(requestBody))
    .subscribe(
      (response: any) => {
        if (response && response.success) {
          const trainingData = response.data.trainingData;  // Match the key with PHP response
          console.log('Training Data:', trainingData);

          if (trainingData.length > 0) {
            const company_status = trainingData[0].company_status;
            if (company_status === '1') {
              this.router.navigate(['/wait-status']);
            } else if (company_status === '2') {
              this.router.navigate(['/confirm-status']);
            } else if (company_status === '3') {
              this.router.navigate(['/cancel-status']);
            }
          } else {
            // console.log('No training status found.');
            this.snackBar.open('ยังไม่ได้เลือกหน่วยงาน', 'Close', {
              duration: 3000,
            });
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
          }
        } else {
          console.log('No training status found or an error occurred.');
        }
<<<<<<< HEAD
      );
  }

  //Assessment-Status
  checkAssessmentStatus() {
    console.log('Checking training status for username:', this.username);
    const requestBody = { username: this.username };

    this.http.post<any>('http://localhost/PJ/Backend/Student/Training/check-training-status.php', JSON.stringify(requestBody))
      .subscribe(
        (response: any) => {
          if (response && response.success) {
            const trainingData = response.data.trainingData;  // Match the key with PHP response
            console.log('Training Data:', trainingData);

            if (trainingData.length > 0) {
              const assessment_status = trainingData[0].assessment_status;
              if (assessment_status === '1') {
                this.router.navigate(['/wait-assessment-status']);
              } else if (assessment_status === '2') {
                this.router.navigate(['/confirm-assessment-status']);
              }
            } else {
              // console.log('No training status found.');
              this.snackBar.open('ยังไม่ได้เลือกหน่วยงาน', 'Close', {
                duration: 3000,
              });
            }
          } else {
            console.log('No training status found or an error occurred.');
          }
        },
        (error) => {
          console.error('An error occurred while checking training status:', error);
        }
      );
  }
=======
      },
      (error) => {
        console.error('An error occurred while checking training status:', error);
      }
    );
}

  //Assessment-Status
checkAssessmentStatus() {
  console.log('Checking training status for username:', this.username);
  const requestBody = { username: this.username };

  this.http.post<any>('http://localhost/PJ/Backend/Student/Training/check-training-status.php', JSON.stringify(requestBody))
    .subscribe(
      (response: any) => {
        if (response && response.success) {
          const trainingData = response.data.trainingData;  // Match the key with PHP response
          console.log('Training Data:', trainingData);

          if (trainingData.length > 0) {
            const assessment_status = trainingData[0].assessment_status;
            if (assessment_status === '1') {
              this.router.navigate(['/wait-assessment-status']);
            } else if (assessment_status === '2') {
              this.router.navigate(['/confirm-assessment-status']);
            } 
          } else {
            // console.log('No training status found.');
            this.snackBar.open('ยังไม่ได้เลือกหน่วยงาน', 'Close', {
              duration: 3000,
            });
          }
        } else {
          console.log('No training status found or an error occurred.');
        }
      },
      (error) => {
        console.error('An error occurred while checking training status:', error);
      }
    );
}
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
          localStorage.removeItem('selectedCompanyID');
          this.username = ''; // Reset username
          this.router.navigateByUrl('/login-student', { replaceUrl: true });
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }

<<<<<<< HEAD

=======
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
  isNew(date: string): boolean {
    const newsDate = new Date(date);
    const today = new Date();
    const differenceInDays = Math.floor((today.getTime() - newsDate.getTime()) / (1000 * 3600 * 24));
    return differenceInDays < 2;
  }
}