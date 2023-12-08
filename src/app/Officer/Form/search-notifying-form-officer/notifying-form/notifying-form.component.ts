import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

@Component({
  selector: 'app-notifying-form',
  templateUrl: './notifying-form.component.html',
  styleUrls: ['./notifying-form.component.css']
})
export class NotifyingFormComponent {
  CompanyInformation: any = {};
  StudentInformation: any = {};
  selectedOption1: any;
  selectedOption2: any;

  constructor(
  private router: Router,
  private dataStorageService: DataStorageService
) { }

ngOnInit() {
  // Get the latest company information from DataStorageService
  this.dataStorageService.getCompanyInformation().subscribe(
    (companyInformation: any) => {
      if (companyInformation) {
        this.CompanyInformation = companyInformation;
        this.selectedOption1 = companyInformation.year;
        this.selectedOption2 = companyInformation.type_code;
      } else {
        console.error('No company information found.');
      }
    },
    (error) => {
      // Handle the error if any occurs during the subscription
      console.error('Error fetching company information:', error);
    }
  );
}
selectForm(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);

    window.print();
  }
}

