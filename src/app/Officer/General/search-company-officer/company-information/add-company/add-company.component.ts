import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {
  company: any = {};
  constructor(private router: Router, private http: HttpClient) { }

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
  
    this.http.post('http://localhost:4200/api/saveData', formData)
      .subscribe((response: any) => {
        if (response.success) {
          console.log('Company data saved successfully');
        } else {
          console.error('Error saving company data');
        }
      });
  
    this.router.navigate(['/add-internal-company']);
  }
}  
