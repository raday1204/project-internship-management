import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { CompanyStudentService } from '../General/company-student/company-student.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  dateTime: Date | undefined
  username: string = '';
  loggedInUsername: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, 
    private router: Router,
    private companyStudentService: CompanyStudentService
    ) {}

  ngOnInit() {
    this.dateTime = new Date();
    this.loggedInUsername = localStorage.getItem('loggedInUsername') || '';
    this.username = this.loggedInUsername;
    this.checkLoginStatus();
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
      link: "/company-student",
      icon: "fa-solid fa-list",
      sub_menu: []
    },
    {
      link_name: "ตรวจสอบสถานะ",
      link: "/cancel-status",
      icon: "fa-solid fa-user-check",
      sub_menu: []
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

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
          this.router.navigate(['/login-student']);
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
}