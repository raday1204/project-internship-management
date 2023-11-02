import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent {
  StudentInformation: any; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['StudentInformation']) {
        this.StudentInformation = JSON.parse(params['StudentInformation']);
      }
    });
  }

  selectCompany(StudentInformation: any) {
    // Implement any logic you need for selecting a company
  }
}
