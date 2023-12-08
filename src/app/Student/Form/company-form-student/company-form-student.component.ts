import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';
import { CompanyStudentService } from '../../General/company-student/company-student.service';

@Component({
  selector: 'app-company-form-student',
  templateUrl: './company-form-student.component.html',
  styleUrls: ['./company-form-student.component.css']
})
export class CompanyFormStudentComponent {
  company: any = {
    company_id: null,
    year: '',
    type_code: '',
    term: '',
    depart_code: '',
    student_pak: '',
    student_mobile: '',
    student_facebook: '',
    company_name: '',
    send_name: '',
    send_coordinator: '',
    send_position: '',
    send_tel: '',
    send_email: '',
    send_mobile: '',
    type_position: '',
    type_special: '',
  };
  need_student: any = {
    date_addtraining: ''
  };
  companyForm: FormGroup;
  studentData: any;
  username: string | undefined;
  student: any;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private DataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService

  ) {
    this.companyForm = this.fb.group({
      year: [''],
      type_code: [''],
      student_name: [''],
      student_lastname: [''],
      depart_code: [''],
      student_pak: [''],
      student_mobile: [''],
      student_facebook: [''],
      company_name: ['', Validators.required],
      send_name: ['', Validators.required],
      send_coordinator: ['', Validators.required],
      send_position: ['', Validators.required],
      send_tel: ['', Validators.required],
      send_email: ['', Validators.required],
      send_mobile: ['', Validators.required],
      type_position: ['', Validators.required],
      type_special: ['', Validators.required],
      date_addtraining: ['', Validators.required]
    });
  }
  //ทำให้เรียกชื่อstudent
  ngOnInit(): void {
    this.username = this.companyStudentService.getUsername();
    console.log('Username from service:', this.username);

    if (this.username) {
      this.http
        .get(`http://localhost/PJ/Backend/Student/profile-student.php?username=${this.username}`)
        .subscribe(
          (response: any) => {
            if (!response.error) {
              this.studentData = response;
              console.log(response)
              // Set default values for the form
              this.companyForm.setValue({
                year: this.studentData.year,
                type_code: this.studentData.type_code,
                student_name: this.studentData.student_name,
                student_lastname: this.studentData.student_lastname,
                depart_code: this.studentData.depart_code,
                student_pak: this.studentData.student_pak,
                student_mobile: this.studentData.student_mobile,
                student_facebook: this.studentData.student_facebook,
              });
            } else {
              this.errorMessage = response.error;
            }
          },
          (error) => {
            this.errorMessage = 'An error occurred while fetching student data.';
          }
        );
    } else {
      this.errorMessage = 'No username provided.';
    }
  }

  updateData() {
    const formDataStudent = this.companyForm.value;

    this.http
      .post('http://localhost/PJ/Backend/Student/edit-profile.php', formDataStudent)
      .subscribe(
        (responseCompany: any) => {
          if (responseCompany.success) {
            console.log(responseCompany.message);

            // Update this.studentData with formDataStudent
            this.studentData = formDataStudent;

            // Optionally reset the form
            this.companyForm.reset();
          }
        },
        (error) => {
          console.error('HTTP Error:', error);
        }
      );
  }


saveData() {
  const formattedDate = this.companyForm.value.date_addtraining ?
    formatDate(this.companyForm.value.date_addtraining, 'yyyy-MM-dd', 'en-US') : '';

  const formData = new FormData();
  // formData.append('year', this.companyForm.value.year);
  // formData.append('type_code', this.companyForm.value.type_code);
  // formData.append('term', this.companyForm.value.term);
  // formData.append('student_depart', this.companyForm.value.student_depart);
  // formData.append('student_pak', this.companyForm.value.student_pak);
  // formData.append('student_mobile', this.companyForm.value.student_mobile);
  // formData.append('student_facebook', this.companyForm.value.student_facebook);
  formData.append('company_name', this.companyForm.value.company_name);
  formData.append('send_name', this.companyForm.value.send_name);
  formData.append('send_coordinator', this.companyForm.value.send_coordinator);
  formData.append('send_position', this.companyForm.value.send_position);
  formData.append('send_tel', this.companyForm.value.send_tel);
  formData.append('send_email', this.companyForm.value.send_email);
  formData.append('send_mobile', this.companyForm.value.send_mobile);
  formData.append('type_position', this.companyForm.value.type_position);
  formData.append('type_special', this.companyForm.value.type_special);
  formData.append('date_addtraining', formattedDate);

  console.log('formData:', formData);
  this.http.post('http://localhost/PJ/Backend/Officer/Company/add-company.php', formData)
    .subscribe((response: any) => {
      console.log('Response:', response)
      if (response.success) {
        console.log(response.message);
        this.DataStorageService.setCompanyInformation(response);
      } else {
        console.error(response.message);
      }
    }, (error) => {
      console.error('HTTP Error:', error);
    });
}

// updateData() {
//   const formDataStudent= {
//     student_name: this.student ? this.student.student_name : null,
//     student_lastname: this.student ? this.student.student_lastname : null,
//     student_depart: this.student ? this.student.student_depart : null,
//     student_pak: this.student ? this.student.student_pak : null,
//     student_mobile: this.student ? this.student.student_mobile : null,
//     student_facebook: this.student ? this.student.student_facebook : null,
//   };

//   this.http.post('http://localhost/PJ/Backend/Officer/Company/edit-company.php', formDataStudent)
//     .subscribe((responseCompany: any) => {
//       if (responseCompany.success) {
//         console.log(responseCompany.message);

//         // Update this.company and this.need_student with formDataCompany
//       this.company = {
//         student_name: formDataStudent.student_name,
//         student_lastname: formDataStudent.student_lastname,
//         student_depart: formDataStudent.student_depart,
//         student_pak: formDataStudent.student_pak,
//         student_mobile: formDataStudent.student_mobile,
//         student_facebook: formDataStudent.student_facebook,
//       };

//       // Use queryParams to send updated data to company-information component
//       const queryParams = {
//         CompanyInformation: JSON.stringify(formDataStudent)
//       };

//     }, (error) => {
//       console.error('HTTP Error:', error);
//     });
// }

printDocument() {
  window.print();
}

openDatePicker() {
}
}

