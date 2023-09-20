import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private apiUrl = 'http://localhost:3000';
  StudentProfileData: any;
  
  constructor(private http: HttpClient) { }

  setStudentProfileData(data: any) {
      this.StudentProfileData = data;
  }

  getStudentProfiles() {
      return this.http.post(`${this.apiUrl}/getStudentProfiles`, this.StudentProfileData);
  }
}
