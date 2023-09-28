// edit-profile.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private apiUrl = 'http://localhost/Backend/';

  constructor(private http: HttpClient) { }

  getStudentProfiles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get-student-profiles`);
  }

  saveStudentProfile(data: any) {
    return this.http.post(`${this.apiUrl}edit-profile.php`, data);
  }
}
