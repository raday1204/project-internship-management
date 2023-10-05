import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProfileService } from './edit-profile.service';
import { Router } from '@angular/router';

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
    student_citizen: '',
    student_nickname: '', 
    student_mobile: '', 
    student_email: '', 
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

  constructor(
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  updateStudent() {
    // console.log(this.frmStudentProfile.value)
    this.http.post('http://localhost:8080/PJ/Backend/Student/edit-profile.php', this.studentData)
    .subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle errors
      }
    });
}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
  }
//   getImageSrc() {
//     return URL.createObjectURL(this.selectedFile);
// }

}
