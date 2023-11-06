import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {
  company: any = {
    company_name: '',
    send_name: '',
    send_coordinator: '',
    send_position: '',
    send_tel: '',
    send_email: '',
    send_mobile: ''
  };
  company_id: any = null;
  need_student: any;
  selectedOption3: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getOptions();
  }

  saveCompany() {
    const formData = {
      company_name: this.company.company_name,
      send_name: this.company.send_name,
      send_coordinator: this.company.send_coordinator,
      send_position: this.company.send_position,
      send_tel: this.company.send_tel,
      send_email: this.company.send_email,
      send_mobile: this.company.send_mobile,
    };

    this.http.post('http://localhost/PJ/Backend/Officer/add-company.php', formData)
      .subscribe((response: any) => {
        if (response.success) {
          console.log(response.message);
          this.router.navigate(['/add-internal-company']);
        } else {
          console.error(response.message);
        }
      }, (error) => {
        console.error('HTTP Error:', error);
      });
  }

  saveInternal(company: any) {
    console.log(company.company_id);
    this.router.navigate(['/add-internal-company', company.company_id]);
  } 

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/get-company.php').subscribe((data: any) => {
      this.selectedOption3 = data.map((item: { company_name: any; }) => item.company_name);
    });
  }
}
