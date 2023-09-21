import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent {
  CompanyInformation: any;
  StudentProfileData: any;
  constructor(private router: Router) {}

  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    this.router.navigate(['/edit-company'], {
      state: { companyData: this.CompanyInformation }
    });
  }
}
