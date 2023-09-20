import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EditProfileService } from './edit-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedFile: File | null = null;
    
  StudentProfileData = {
      student_name: 'some',
      student_lastname: '',
      student_code: '',
      type_code: '',
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
      ct_tel: ''
      
    };
  
    constructor(private router: Router, private http: HttpClient, private editProfileService: EditProfileService, private location: Location) { }
  
    goBack(): void {
      this.location.back();
    }
  
    ngOnInit(): void {
      this.http.get('http://localhost:3000/students').subscribe((data: any) => {
        console.log('Fetched data: ', data);
        // Assign the fetched data to userProfileData if needed
        this.StudentProfileData = data;
      });
    }
  
    getStudentProfiles(){
      if (!this.StudentProfileData.student_name) {
        console.error('Student name is required');
        return;
      }
      this.http.post('/getStudentProfiles', this.StudentProfileData).subscribe(
        (response) => {
          console.log('Profile saved:', response);
        },
        (error) => {
          console.error('Error saving profile:', error);
        }
      );
    }
  
    onFileSelected(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files) {
        this.selectedFile = inputElement.files[0];
      }
    }
  
    onUpload() {
      if (this.selectedFile) {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
  
        this.http.post('http://localhost:3000/students', fd)
          .subscribe(
            (response) => {
              console.log('File uploaded successfully:', response);
            },
            (error) => {
              console.error('Error uploading file:', error);
            }
          );
      }
    }
  }
