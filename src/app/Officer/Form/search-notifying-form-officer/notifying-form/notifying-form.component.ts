import { Component } from '@angular/core';

@Component({
  selector: 'app-notifying-form',
  templateUrl: './notifying-form.component.html',
  styleUrls: ['./notifying-form.component.css']
})
export class NotifyingFormComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};
  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}

