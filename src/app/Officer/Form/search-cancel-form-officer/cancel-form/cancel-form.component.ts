import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel-form',
  templateUrl: './cancel-form.component.html',
  styleUrls: ['./cancel-form.component.css']
})
export class CancelFormComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};
  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}

