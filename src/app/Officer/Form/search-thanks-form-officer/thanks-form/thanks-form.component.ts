import { Component } from '@angular/core';

@Component({
  selector: 'app-thanks-form',
  templateUrl: './thanks-form.component.html',
  styleUrls: ['./thanks-form.component.css']
})
export class ThanksFormComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};

  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}


