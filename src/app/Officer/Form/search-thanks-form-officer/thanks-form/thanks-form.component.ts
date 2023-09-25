import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thanks-form',
  templateUrl: './thanks-form.component.html',
  styleUrls: ['./thanks-form.component.css']
})
export class ThanksFormComponent {
  CompanyInformation: any = {};
  StudentProfileData: any = {};
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.selectedOption1 = params['option1'];
      this.selectedOption2 = params['option2'];
    });
  }

  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}


