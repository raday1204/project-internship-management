import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent {
company: any ={};
need_student: any = {};
constructor(private router: Router) {}

saveData() {
  const formData = {
    company_name: this.company.company_name,
    send_name: this.company.send_name,
    send_coordinator: this.company.send_coordinator,
    send_position: this.company.send_position,
    send_email: this.company.send_email,
    send_mobile: this.company.send_mobile,
    company_job: this.company.company_job,
    company_qualifications: this.company.company_qualifications,
    company_period: this.company.company_period,
  };
  this.router.navigate(['/add-internal-company']);
}
}
