import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit {
  CompanyInformation: any = {};
  company: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CompanyInformation']) {
        this.CompanyInformation = Object.values(JSON.parse(params['CompanyInformation']));
      }
    });
  }


  editCompany(company: any) {
    console.log(company.company_id);
    this.router.navigate(['/edit-company', company.company_id]);
  }
}
