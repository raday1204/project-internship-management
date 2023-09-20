import { Component } from '@angular/core';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent {
  CompanyInformation: any;
  StudentProfileData: any;
  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);
}
}