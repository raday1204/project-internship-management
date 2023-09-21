import { Component } from '@angular/core';

@Component({
  selector: 'app-status-information',
  templateUrl: './status-information.component.html',
  styleUrls: ['./status-information.component.css']
})
export class StatusInformationComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};

  confirmCompanyStatus() {
    // Add logic to confirm the company status here
    console.log("Confirmed Company Status:", this.CompanyInformation);
  }

  rejectCompanyStatus() {
    // Add logic to reject the company status here
    console.log("Rejected Company Status:", this.CompanyInformation);
  }
}





