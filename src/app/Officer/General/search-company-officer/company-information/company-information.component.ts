import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

interface Company {
  company_id: number;
  company_name: string;
  company_building: string;
  number_student_train: string;
}

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit {
  company: Company[] = [];
  CompanyInformation: any;
  companyName: any = {};
  need_student: any = {};
  selectedOption1: any;
  selectedOption2: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    // Get the latest company information from DataStorageService
    const companyInformation = this.dataStorageService.getCompanyInformation();

    if (companyInformation) {
      this.CompanyInformation = companyInformation.company;
      this.selectedOption1 = companyInformation.year;
      this.selectedOption2 = companyInformation.type_code;
      this.companyName = companyInformation.company_name;
      this.need_student = companyInformation.need_student;
    } else {
      // If no information found, handle accordingly
      console.error('No company information found.');
    }
    const serverUrl = 'http://localhost/PJ/Backend/Officer/Company/get-company-officer.php';

    this.http.get<{ data: Company[] }>(serverUrl).subscribe(
      (response) => {
        this.company = response.data;
      },
      (error) => {
        console.error('HTTP Error:', error);
        // Handle error here
      }
    );
  }

  editCompany(company: any) {
    if (company && company.company_id) {
      // Use queryParams to pass the selected options and other necessary data back to the edit-company page
      const queryParams = {
        CompanyInformation: JSON.stringify({
          year: this.selectedOption1,
          type_code: this.selectedOption2,
          company_name: this.companyName,
          need_student: this.need_student
        })
      };

      // Navigate to the edit-company page with the company_id and queryParams
      this.router.navigate(['/edit-company', company.company_id], { queryParams: queryParams });
    } else {
      console.error('Invalid company data or missing company_id.');
    }
  }
}
