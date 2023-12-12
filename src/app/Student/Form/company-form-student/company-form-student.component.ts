import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';
import { CompanyStudentService } from '../../General/company-student/company-student.service';
import { CompanyFormStudentPopupComponent } from './company-form-student-popup/company-form-student-popup.component';

@Component({
  selector: 'app-company-form-student',
  templateUrl: './company-form-student.component.html',
  styleUrls: ['./company-form-student.component.css']
})
export class CompanyFormStudentComponent implements OnInit {
  company: any = {
    company_id: '',
    year: '',
    type_code: '',
    term: '',
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
  student: any = {
    student_code: '',
    student_name: '',
    student_lastname: '',
    depart_code: '',
    student_pak: '',
    student_mobile: '',
    student_facebook: '',
  };
  companyForm: FormGroup;
  studentyForm: FormGroup;
  studentData: any;
  username: string | undefined;
  errorMessage: string | undefined;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private DataStorageService: DataStorageService,
    private companyStudentService: CompanyStudentService

  ) {
    this.studentyForm = this.fb.group({
      student_code: ['', Validators.required],
      student_name: ['', Validators.required],
      student_lastname: ['', Validators.required],
      depart_code: ['', Validators.required],
      student_pak: ['', Validators.required],
      student_mobile: ['', Validators.required],
      student_facebook: ['', Validators.required],
    });
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
            if (response && response.username) {
              this.studentyForm.patchValue(response);
            } else {
              this.errorMessage = response.error || 'An error occurred while fetching student data.';
              console.error('API Error:', this.errorMessage);
            }
          },
          (error) => {
            this.errorMessage = 'An error occurred while fetching student data. Please check your internet connection or try again later.';
            console.error('HTTP Error:', error);
          }
        );
    } else {
      this.errorMessage = 'No username provided.';
    }
  }

  updateData() {
    if (this.username) {
      const formDataStudent = new FormData();
      formDataStudent.append('type_code', this.companyForm.value.type_code);
      formDataStudent.append('student_code', this.studentyForm.value.student_code);
      formDataStudent.append('student_name', this.studentyForm.value.student_name);
      formDataStudent.append('student_lastname', this.studentyForm.value.student_lastname);
      formDataStudent.append('depart_code', this.studentyForm.value.depart_code);
      formDataStudent.append('student_pak', this.studentyForm.value.student_pak);
      formDataStudent.append('student_mobile', this.studentyForm.value.student_mobile);
      formDataStudent.append('student_facebook', this.studentyForm.value.student_facebook);
      formDataStudent.append('username', this.username);

      this.http.post('http://localhost/PJ/Backend/Student/update-company-form-student.php', formDataStudent)
        .subscribe(
          (responseStudent: any) => {
            if (responseStudent.success) {
              console.log(responseStudent.message);

              // Optionally, you can update the form with the latest data
              this.studentyForm.patchValue(responseStudent.data);

              // Proceed with company form data only if student data is successfully updated
              const formattedDate = this.companyForm.value.date_addtraining ?
                formatDate(this.companyForm.value.date_addtraining, 'yyyy-MM-dd', 'en-US') : '';

              const formDataCompany = new FormData();
              formDataCompany.append('year', this.companyForm.value.year);
              formDataCompany.append('type_code', this.companyForm.value.type_code);
              formDataCompany.append('term', this.companyForm.value.term);
              formDataCompany.append('company_name', this.companyForm.value.company_name);
              formDataCompany.append('send_name', this.companyForm.value.send_name);
              formDataCompany.append('send_coordinator', this.companyForm.value.send_coordinator);
              formDataCompany.append('send_position', this.companyForm.value.send_position);
              formDataCompany.append('send_tel', this.companyForm.value.send_tel);
              formDataCompany.append('send_email', this.companyForm.value.send_email);
              formDataCompany.append('send_mobile', this.companyForm.value.send_mobile);
              formDataCompany.append('type_position', this.companyForm.value.type_position);
              formDataCompany.append('type_special', this.companyForm.value.type_special);
              formDataCompany.append('date_addtraining', formattedDate);

              console.log('formDataCompany:', formDataCompany);

              this.http.post('http://localhost/PJ/Backend/Student/add-company-form-student.php', formDataCompany)
                .subscribe(
                  (responseCompany: any) => {
                    console.log('Response:', responseCompany);
                    if (responseCompany.success) {
                      console.log(responseCompany.message);

                      if (responseCompany.data) {
                        console.log(responseCompany.data);

                        this.companyForm.patchValue(responseCompany.data);
                      } else {
                        console.error('Data from the server is undefined.');
                      }
                      const typeCode = responseCompany.type_code;
                      const updatedCompanyId = responseCompany.company_id;

                      const formDataUpdateStudent = new FormData();
                      if (this.username) {
                        formDataUpdateStudent.append('type_code', typeCode);
                        formDataUpdateStudent.append('company_id', updatedCompanyId);

                        formDataUpdateStudent.append('username', this.username ?? '');
                      } else {
                        // Handle the case where username is undefined.
                        console.error('Error: Username is undefined.');
                      }

                      this.http.post('http://localhost/PJ/Backend/Student/update-student-company-id.php', formDataUpdateStudent)
                        .subscribe(
                          (responseUpdateStudent: any) => {
                            if (responseUpdateStudent.success) {
                              console.log(responseUpdateStudent.message);
                              this.printDocument();
                            } else {
                              console.error(responseUpdateStudent.message);
                            }
                          },
                          (errorUpdateStudent) => {
                            console.error('HTTP Error:', errorUpdateStudent);
                          }
                        );

                    } else {
                      console.error(responseCompany.message);
                    }
                  },
                  (errorCompany) => {
                    console.error('HTTP Error:', errorCompany);
                  }
                );
            } else {
              console.error(responseStudent.message);
            }
          },
          (errorStudent) => {
            console.error('HTTP Error:', errorStudent);
          }
        );
    }
  }

  openPopup(): void {
    if (this.areFormsValid()) {
      const formattedDate = this.companyForm.value.date_addtraining ?
        formatDate(this.companyForm.value.date_addtraining, 'yyyy-MM-dd', 'en-US') : '';

      const dialogRef = this.dialog.open(CompanyFormStudentPopupComponent, {
        data: {
          company: {
            year: this.companyForm.value.year,
            type_code: this.companyForm.value.type_code,
            term: this.companyForm.value.term,
            company_name: this.companyForm.value.company_name,
            send_name: this.companyForm.value.send_name,
            send_coordinator: this.companyForm.value.send_coordinator,
            send_position: this.companyForm.value.send_position,
            send_tel: this.companyForm.value.send_tel,
            send_email: this.companyForm.value.send_email,
            send_mobile: this.companyForm.value.send_mobile,
            type_position: this.companyForm.value.type_position,
            type_special: this.companyForm.value.type_special
          },
          need_student: {
            date_addtraining: formattedDate,
          },
          student: {
            student_code: this.studentyForm.value.student_code,
            student_name: this.studentyForm.value.student_name,
            student_lastname: this.studentyForm.value.student_lastname,
            depart_code: this.studentyForm.value.depart_code,
            student_pa: this.studentyForm.value.student_pak,
            student_mobile: this.studentyForm.value.student_mobile,
            student_facebook: this.studentyForm.value.student_facebook,
          }
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result && result.saveData) {
          this.updateData();
        }
      });
    }
  }

  areFormsValid(): boolean {
    return this.studentyForm.valid && this.companyForm.valid;
  }

  printDocument() {
    window.print();
  }

  openDatePicker() {
    console.log('Date picker opened');
  }
}

