import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Relation {
  id: number;
  relation_date: string;
  relation_content: string;
}

@Component({
  selector: 'app-home-officer',
  templateUrl: './home-officer.component.html',
  styleUrls: ['./home-officer.component.css']
})

export class HomeOfficerComponent implements OnInit {
  item: any;
  dateTime: Date | undefined
  relations: Relation[] = [];
  username: string = '';
  loggedInUsername: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loggedInUsername = localStorage.getItem('loggedInUsername') || '';
    this.username = this.loggedInUsername;
    this.dateTime = new Date()

    const serverUrl = 'http://localhost/PJ/Backend/Officer/Relation/get-relation.php';

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
      link_name: "ข้อมูลนิสิตวิศวกรรมคอมพิวเตอร์",
      link: "/search-student-officer",
      icon: "fa-solid fa-users",
      sub_menu: []
    },

    {
      link_name: "ข้อมูลหน่วยงาน",
      link: null,
      icon: "fa-solid fa-address-book",
      sub_menu: [
        {
          link_name: "ข้อมูลหน่วยงาน",
          link: "//search-company-officer",
        }, {
          link_name: "เพิ่มข้อมูลหน่วยงาน",
          link: "/add-company",
        }
      ]
    },

    {
      link_name: "ยืนยันสถานะการฝึกงาน",
      link: "/status-officer",
      icon: "fa-solid fa-user-check",
      sub_menu: []
    },
  ]

  formSidebar = [
    {
      link_name: "หนังสือขอความอนุเคราะห์รับนิสิตเข้าฝึกงาน",
      link: "/search-permission-form-officer",
      icon: "fa-regular fa-file-pdf",
    },

    {
      link_name: "หนังสือแจ้งรายชื่อนิสิตเข้าฝึกงาน",
      link: "/search-send-form-officer",
      icon: "fa-regular fa-file-pdf",
    },
    {
      link_name: "หนังสือรายงานตัวนิสิตเข้าฝึกงาน",
      link: "/search-report-form-officer",
      icon: "fa-regular fa-file-pdf",
    },
    {
      link_name: "หนังสือแจ้งผู้ปกครองเรื่องการฝึกงาน",
      link: "/search-notifying-form-officer",
      icon: "fa-regular fa-file-pdf",
    },
    {
      link_name: "หนังสือขอบคุณหน่วยงาน",
      link: "/search-thanks-form-officer",
      icon: "fa-regular fa-file-pdf",
    },
    {
      link_name: "หนังสือแบบประเมินการฝึกงาน",
      link: "/search-evaluation-form-officer",
      icon: "fa-regular fa-file-pdf",
    },
  ]

  newsSidebar = [
    {
      link_name: "เพิ่ม-ลบ-แก้ไขข่าวประชาสัมพันธ์",
      link: "/relation-officer",
      icon: "fa-solid fa-bullhorn",
    },
  ]
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  isNew(date: string): boolean {
    const newsDate = new Date(date);
    const today = new Date();
    const differenceInDays = Math.floor((today.getTime() - newsDate.getTime()) / (1000 * 3600 * 24));
    return differenceInDays < 2;
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