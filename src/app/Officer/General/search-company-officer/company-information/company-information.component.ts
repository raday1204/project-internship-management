import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit {
  CompanyInformation: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CompanyInformation']) {
        this.CompanyInformation = JSON.parse(params['CompanyInformation']);
      }
    });
  }

  selectCompany(companyInformation: any) {
    // Implement any logic you need for selecting a company
  }
}
