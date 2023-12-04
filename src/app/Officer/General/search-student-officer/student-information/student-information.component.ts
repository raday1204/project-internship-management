// student-information.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    const studentInformation = this.dataStorageService.getStudentInformation();

    if (studentInformation) {
      this.StudentInformation = studentInformation.student; // Access the 'student' property
      this.selectedOption3 = studentInformation.year;
      this.selectedOption4 = studentInformation.type_code;
      // Handle accordingly, e.g., redirect to another page or show an error message
    }
  }
}
