import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-company',
  templateUrl: './print-company.component.html',
  styleUrls: ['./print-company.component.css']
})
export class PrintCompanyComponent  {
  StudentProfileData: any;
  company: any;

  constructor() { }


  printDocument() {
    window.print();
  }
}
