import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedFile: File | null = null;

  studentProfileForm: FormGroup;

  constructor(
    private http: HttpClient,
    private location: Location,
    private formBuilder: FormBuilder
  ) {

    this.studentProfileForm = this.formBuilder.group({
      student_name: ['', Validators.required],
      student_lastname: ['', Validators.required],
      student_code: ['', Validators.required],
      type_code: ['', Validators.required],
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

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.http.get('http://4200/edit-profile').subscribe(
  (data: any) => {
    console.log('Fetched data: ', data);
    this.studentProfileForm = data;
  },
  (error) => {
    console.error('HTTP Error:', error);
  }
);
  }

  getStudentProfiles() {
    this.http.post('http://localhost/PJ/InternshipNEW/Backend/edit-profile.php', this.studentProfileForm.value).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (this.selectedFile) {

    } else {
      console.error('No file selected');
    }
  }
}

