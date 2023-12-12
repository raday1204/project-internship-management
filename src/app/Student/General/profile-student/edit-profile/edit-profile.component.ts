import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyStudentService } from '../../company-student/company-student.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfilePopupComponent } from './edit-profile-popup/edit-profile-popup.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedFile: File | undefined;

  studentData = {
    student_id: '', 
    type_code: '',
    student_name: '', 
    student_lastname: '',
    student_nickname: '',
    student_citizen: '',
    student_email: '',
    student_mobile: '',
    student_facebook: '',
    student_line: '',

    st_address: '',
    st_tambol: '',
    st_ampher: '',
    st_province: '',
    st_zipcode: '',
    st_tel: '',
    st_contact: '',
    st_mobile: '',

    ct_address: '',
    ct_tambol: '',
    ct_ampher: '',
    ct_province: '',
    ct_zipcode: '',
    ct_tel: '',
  };
  studentyForm: FormGroup;
  username: string | undefined;
  errorMessage: string | undefined;
  displayedFilePath: string | undefined;

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private companyStudentService: CompanyStudentService
    
  ) {
    this.studentyForm = this.fb.group({
      student_id: ['', Validators.required],
      type_code: ['', Validators.required],
      student_name: ['', Validators.required],
      student_lastname: ['', Validators.required],
      student_nickname: ['', Validators.required],
      student_citizen: ['', Validators.required],
      student_email: ['', Validators.required],
      student_mobile: ['', Validators.required],
      student_facebook: ['', Validators.required],
      student_line: ['', Validators.required],
      st_address: ['', Validators.required],
      st_tambol: ['', Validators.required],
      st_ampher: ['', Validators.required],
      st_province: ['', Validators.required],
      st_zipcode: ['', Validators.required],
      st_tel: ['', Validators.required],
      st_contact: ['', Validators.required],
      st_mobile: ['', Validators.required],
      ct_address: ['', Validators.required],
      ct_tambol: ['', Validators.required],
      ct_ampher: ['', Validators.required],
      ct_province: ['', Validators.required],
      ct_zipcode: ['', Validators.required],
      ct_tel: ['', Validators.required],
    });
  }

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

  goBack(): void {
    this.location.back();
  }

  updateStudent() {
    if (this.username) {
      const formDataStudent = new FormData();
      formDataStudent.append('type_code', this.studentyForm.value.type_code);
      formDataStudent.append('student_name', this.studentyForm.value.student_name);
      formDataStudent.append('student_lastname', this.studentyForm.value.student_lastname);
      formDataStudent.append('student_nickname', this.studentyForm.value.student_nickname);
      formDataStudent.append('student_citizen', this.studentyForm.value.student_citizen);
      formDataStudent.append('student_email', this.studentyForm.value.student_email);
      formDataStudent.append('student_mobile', this.studentyForm.value.student_mobile);
      formDataStudent.append('student_facebook', this.studentyForm.value.student_facebook);
      formDataStudent.append('student_line', this.studentyForm.value.student_line);

      formDataStudent.append('st_address', this.studentyForm.value.st_address);
      formDataStudent.append('st_tambol', this.studentyForm.value.st_tambol);
      formDataStudent.append('st_ampher', this.studentyForm.value.st_ampher);
      formDataStudent.append('st_province', this.studentyForm.value.st_province);
      formDataStudent.append('st_zipcode', this.studentyForm.value.st_zipcode);
      formDataStudent.append('st_tel', this.studentyForm.value.st_tel);
      formDataStudent.append('st_contact', this.studentyForm.value.st_contact);
      formDataStudent.append('st_mobile', this.studentyForm.value.st_mobile);
      
      formDataStudent.append('ct_address', this.studentyForm.value.ct_address);
      formDataStudent.append('ct_tambol', this.studentyForm.value.ct_tambol);
      formDataStudent.append('ct_ampher', this.studentyForm.value.ct_ampher);
      formDataStudent.append('ct_province', this.studentyForm.value.ct_province);
      formDataStudent.append('ct_zipcode', this.studentyForm.value.ct_zipcode);
      formDataStudent.append('ct_tel', this.studentyForm.value.ct_tel);
      formDataStudent.append('username', this.username);
      
    const url = 'http://localhost/PJ/Backend/Student/edit-profile.php';

    this.http.post(url, formDataStudent)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(['/profile-student', this.username]);
          } else {
            // Handle failure, show an error message
          }
        },
        (error) => {
          console.error('Error:', error);
          // Handle errors
        }
      );
  }
}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentyForm.patchValue({ relation_pic: file });
      this.displayedFilePath = URL.createObjectURL(file);
    }
  }

  createLocalImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

openPopup(): void {
  if (this.studentyForm.valid) {
    const dialogRef = this.dialog.open(EditProfilePopupComponent, {
      data: {
        studentData: {
          student_id: this.studentyForm.value.student_id,
          type_code: this.studentyForm.value.type_code,
          student_citizen: this.studentyForm.value.student_citizen,
          student_nickname: this.studentyForm.value.student_nickname,
          student_mobile: this.studentyForm.value.student_mobile,
          student_email: this.studentyForm.value.student_email,
          student_facebook: this.studentyForm.value.student_facebook,
          student_line: this.studentyForm.value.student_line,

          st_address: this.studentyForm.value.st_address,
          st_tambol: this.studentyForm.value.st_tambol,
          st_ampher: this.studentyForm.value.st_ampher,
          st_province: this.studentyForm.value.st_province,
          st_zipcode: this.studentyForm.value.st_zipcode,
          st_tel: this.studentyForm.value.st_tel,
          st_contact: this.studentyForm.value.st_contact,
          st_mobile: this.studentyForm.value.st_mobile,

          ct_address: this.studentyForm.value.ct_address,
          ct_tambol: this.studentyForm.value.ct_tambol,
          ct_ampher: this.studentyForm.value.ct_ampher,
          ct_province: this.studentyForm.value.ct_province,
          ct_zipcode: this.studentyForm.value.ct_zipcode,
          ct_tel: this.studentyForm.value.ct_tel,
        },
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result && result.saveData) {
        this.updateStudent();
      }
    });
  }
}
}