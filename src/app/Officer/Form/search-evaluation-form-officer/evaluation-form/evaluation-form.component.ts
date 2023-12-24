import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
}

interface CompanyInformation {
  company: Company;
  students: Student[];
}

interface CompanyResponse {
  success: boolean;
  data: CompanyInformation[];
}

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent {
  CompanyInformation: CompanyInformation[] = [];
  student: { [key: string]: Student[] } = {};
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
  filteredCompanyIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

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
                this.CompanyInformation = response.data.filter(companyInfo => {
                  // Filter out companies without students
                  return companyInfo.students && companyInfo.students.length > 0;
                });
  
                // Build the student map for filtered companies
                this.CompanyInformation.forEach(company => {
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
  
  selectForm(form: any) {  }
}