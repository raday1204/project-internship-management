import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enter-company-form',
  templateUrl: './enter-company-form.component.html',
  styleUrls: ['./enter-company-form.component.css']
})
export class EnterCompanyFormComponent {
  StudentProfileData: any = {};
  company: any = {};
  // StudentProfileData = {
  //   student_name: '',
  //   student_lastname: '',
  //   student_code: '',
  //   student_depart: '',
  //   student_pak: '',
  //   student_mobile: '',
  //   student_facebook: ''
  // }

  selectedOption1: string | undefined;
  selectedOption2: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient

  ) { 
    this.company = {};
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedOption1 = params['option1'];
      this.selectedOption2 = params['option2'];
    });
  }

  isPopupVisible = false;

  saveData() {
    const formData = {
      student_name: this.StudentProfileData.student_name,
      student_lastname: this.StudentProfileData.student_lastname,
      student_depart: this.StudentProfileData.student_depart,
      student_pak: this.StudentProfileData.student_pak,
      student_mobile: this.StudentProfileData.student_mobile,
      student_facebook: this.StudentProfileData.student_facebook,
      
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

    this.http.post('http://localhost:3000/saveData', formData).subscribe(
    (response) => {
      console.log('Data saved successfully:', response);
      this.isPopupVisible = true;
    },
    (error) => {
      console.error('Error saving data:', error);
    }
  );
}

  printDocument() {
    window.print();
  }
}