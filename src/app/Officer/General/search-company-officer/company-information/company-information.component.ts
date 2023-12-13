import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

interface NeedStudent {
  number_student_train: string;
}

interface Company {
  company_id: string;
  company_name: string;
  company_building: string;
  number_student_train: string;
  student_code: string;
  student_name: string;
  student_lastname: string;
  selected: boolean;
}

interface CompanyResponse {
  company: Company[];
  need_student: { [key: string]: NeedStudent[] };
}

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit {
  need_student: { [key: string]: NeedStudent[] } = {};
  company: Company[] = [];
  CompanyInformation: any;
  companyName: any = {};
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
    this.dataStorageService.getCompanyInformation().subscribe(
      (companyInformation: any) => {
    if (companyInformation) {
      this.CompanyInformation = companyInformation.company;
      this.selectedOption1 = companyInformation.year;
      this.selectedOption2 = companyInformation.type_code;
      this.companyName = companyInformation.company_name;
      this.need_student = companyInformation.need_student;
    } else {
      console.error('No company information found.');
    }
  },
  (error) => {
    // Handle the error if any occurs during the subscription
    console.error('Error fetching company information:', error);
  }
  );
      const apiUrl = 'http://localhost/PJ/Backend/Student/Company/company-student.php';
  
      this.http.get<CompanyResponse>(apiUrl).subscribe(
        (companyInformation) => {
          console.log(companyInformation);
          if (companyInformation && companyInformation.company) {
            this.CompanyInformation = companyInformation.company;
            this.need_student = companyInformation.need_student;
          } else {
            console.error('No company information found.');
          }
        },
        (error) => {
          console.error('Error fetching company information:', error);
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
