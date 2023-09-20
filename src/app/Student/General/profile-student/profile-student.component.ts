import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditProfileService } from './edit-profile/edit-profile.service';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent {
  StudentProfileData: any;
  imageUrl: string = '';

  constructor(private router: Router, private http: HttpClient, private editProfileService: EditProfileService) { 
    this.StudentProfileData = this.editProfileService.getStudentProfiles();

  }

  ngOnInit(): void {
    this.editProfileService.getStudentProfiles().subscribe((data: any) => {
      this.StudentProfileData = data;
    });
  }
  getProfileImage() {
    this.http.get('http://localhost:3000/getProfileImage').subscribe(
      (response: any) => {
        this.imageUrl = 'data:image/jpeg;base64,' + response.imageData;
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }
}
