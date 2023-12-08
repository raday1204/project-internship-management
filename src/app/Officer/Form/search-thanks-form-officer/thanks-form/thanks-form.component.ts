import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

@Component({
  selector: 'app-thanks-form',
  templateUrl: './thanks-form.component.html',
  styleUrls: ['./thanks-form.component.css']
})
export class ThanksFormComponent {
  CompanyInformation: any = {};
  StudentInformation: any = {};
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;

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

