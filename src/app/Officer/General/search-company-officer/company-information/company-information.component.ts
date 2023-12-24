import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

interface NeedStudent {
  number_student_train: string;
}

interface Company {
  selected: boolean;
  company_id: string;
  company_name: string;
  company_building: string;
}

interface Student {
  company_id: string;
  student_code: string;
  student_name: string;
  student_lastname: string;
  student_mobile: string;
}

interface CompanyInformation {
  company: Company;
  students: Student[];
  need_student: NeedStudent[];
}

interface CompanyResponse {
  success: boolean;
  data: CompanyInformation[];
}

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit {
  need_student: { [key: string]: NeedStudent[] } = {};
  CompanyInformation: CompanyInformation[] = [];
  student: { [key: string]: Student[] } = {};
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedOption1 = params['year'];
      this.selectedOption2 = params['type_name'];
    });
    this.fetchData();
  }

  fetchData() {
    if (this.selectedOption1 && this.selectedOption2) {
      this.http.get<CompanyResponse>(`http://localhost/PJ/Backend/Officer/Company/get-company-information.php?year=${this.selectedOption1}&type_name=${this.selectedOption2}`)
        .subscribe(
          (response: CompanyResponse) => {
            console.log('Backend Response:', response);
  
            if (response && response.success) {
              if (Array.isArray(response.data)) {
                this.CompanyInformation = response.data;

                this.CompanyInformation.forEach(company => {
                  this.need_student[company.company.company_id] = company.need_student;
                  this.student[company.company.company_id] = company.students;
                });
              } else {
                console.error('Invalid data structure in the server response.');
              }
            } else {
              console.error('Invalid response from the server.');
            }
          },
          (error) => {
            console.error('HTTP Error:', error);
          }
        );
    }
  }    
  

  editCompany(companyId: string) {
    if (companyId) {
      console.log('Invalid company ID.', companyId);
      this.router.navigate(['/edit-company', companyId]);
    } else {
      console.error('Invalid company ID.');
    }
  }
}