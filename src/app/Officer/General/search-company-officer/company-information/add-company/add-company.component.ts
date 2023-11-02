import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {
  CompanyInformation: any[] = [];
  company: any = {  
    company_id: '',
    company_name: '',
    send_name: '',
    send_coordinator: '',
    send_position: '',
    send_tel: '',
    send_email: '',
    send_mobile: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CompanyInformation']) {
        this.CompanyInformation = JSON.parse(params['CompanyInformation']);
      }
    });
  }

  selectCompany(companyInformation: any) {
    this.company = {
      company_id: companyInformation.company_id,
      company_name: companyInformation.company_name,
      send_name: companyInformation.send_name,
      send_coordinator: companyInformation.send_coordinator,
      send_position: companyInformation.send_position,
      send_tel: companyInformation.send_tel,
      send_email: companyInformation.send_email,
      send_mobile: companyInformation.send_mobile
    };
  }

  saveData() {
    const formData = {
      company_name: this.company.company_name,
      send_name: this.company.send_name,
      send_coordinator: this.company.send_coordinator,
      send_position: this.company.send_position,
      send_tel: this.company.send_tel,
      send_email: this.company.send_email,
      send_mobile: this.company.send_mobile
    };

    const companyId = this.company.company_id; 
    this.http.put(`http://localhost/PJ/Backend/Officer/student-officer.php/${companyId}`, formData)

      .subscribe((response: any) => {
        if (response.success) {
          console.log('Company data updated successfully');
        } else {
          console.error('Error updating company data');
        }
      });

    this.router.navigate(['/add-internal-company']);
  }
}