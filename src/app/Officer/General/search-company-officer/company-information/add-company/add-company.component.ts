import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {
  company: any = {
    company_id: null,
    year: '',
    type_code: '',
    term: '',
    company_name: '',
    send_name: '',
    send_coordinator: '',
    send_position: '',
    send_tel: '',
    send_email: '',
    send_mobile: ''
  };
  companyForm: FormGroup;
  selectedOption1: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption5: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private DataStorageService: DataStorageService
  ) { 
    this.companyForm = this.fb.group({
      year: ['', Validators.required],
      type_code: ['', Validators.required],
      term: ['', Validators.required],
      company_name: ['', Validators.required],
      send_name: ['', Validators.required],
      send_coordinator: ['', Validators.required],
      send_position: ['', Validators.required],
      send_tel: ['', Validators.required],
      send_email: ['', Validators.required],
      send_mobile: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getOptions();
  }

  saveCompany() {
    if (this.companyForm.valid) {
    const formData = new FormData();
    formData.append('year', this.companyForm.value.year);
    formData.append('type_code', this.companyForm.value.type_code);
    formData.append('term', this.companyForm.value.term);
    formData.append('company_name', this.companyForm.value.company_name);
    formData.append('send_name', this.companyForm.value.send_name);
    formData.append('send_coordinator', this.companyForm.value.send_coordinator);
    formData.append('send_position', this.companyForm.value.send_position);
    formData.append('send_tel', this.companyForm.value.send_tel);
    formData.append('send_email', this.companyForm.value.send_email);
    formData.append('send_mobile', this.companyForm.value.send_mobile);
  
    console.log('formData:', formData);
  
    this.http.post('http://localhost/PJ/Backend/Officer/Company/add-company.php', formData, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          console.log('Response:', response);

          try {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.success) {
              console.log(parsedResponse.message);
              this.DataStorageService.setCompanyInformation(parsedResponse);
              this.company.company_id = parsedResponse.company_id;
              // Pass company information to the route using navigate method
              this.router.navigate(['/add-internal-company', this.company.company_id]);
            } else {
              console.error(parsedResponse.message);
            }
          } catch (error) {
            console.error('Error parsing JSON response:', error);
          }
        },
        (error) => {
          console.error('HTTP Error:', error);
          // Handle errors
        }
      );
  }
}
  

  getOptions() {
    this.http.get('http://localhost/PJ/Backend/Officer/Company/get-company-officer.php').subscribe((data: any) => {
      const uniqueYears = new Set(data.map((item: any) => item.year));
      const uniqueTypeCodes = new Set(data.map((item: any) => item.type_code));
      const uniqueTerm = new Set(data.map((item: any) => item.term));
      const uniqueCompanyName = new Set(data.map((item: any) => item.company_name));

      this.selectedOption1 = Array.from(uniqueYears);
      this.selectedOption2 = Array.from(uniqueTypeCodes);
      this.selectedOption5 = Array.from(uniqueTerm);
      this.selectedOption3 = Array.from(uniqueCompanyName);
    });
  }
}
