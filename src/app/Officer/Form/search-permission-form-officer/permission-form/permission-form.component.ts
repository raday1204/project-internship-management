import { Component } from '@angular/core';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css']
})
export class PermissionFormComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};
  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}


