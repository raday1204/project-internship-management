import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};
  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}

