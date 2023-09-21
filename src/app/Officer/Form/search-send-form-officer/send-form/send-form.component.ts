import { Component } from '@angular/core';

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.css']
})
export class SendFormComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};
  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}


