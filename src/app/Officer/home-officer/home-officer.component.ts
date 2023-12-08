import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-officer',
  templateUrl: './home-officer.component.html',
  styleUrls: ['./home-officer.component.css']
})
export class HomeOfficerComponent implements OnInit {
item: any;
    dateTime: Date | undefined
  
    ngOnInit() {
      this.dateTime = new Date()
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
  }
  
