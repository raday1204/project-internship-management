import { Component, OnInit } from '@angular/core';
import { LoginStudentService } from 'src/app/Student/login-student/login-student.service';

@Component({
  selector: 'app-print-company',
  templateUrl: './print-company.component.html',
  styleUrls: ['./print-company.component.css']
})
export class PrintCompanyComponent implements OnInit {
  StudentProfileData: any;
  company: any;

  constructor(private loginStudentService: LoginStudentService) { }

  ngOnInit(): void {
    this.StudentProfileData = this.loginStudentService['getStudentProfileData']();
    this.company = this.loginStudentService['getCompanyData']();
  }

  printDocument() {
    window.print();
  }
}