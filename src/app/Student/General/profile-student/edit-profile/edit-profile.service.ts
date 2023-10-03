// edit-profile.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  [x: string]: any;

  private apiUrl = 'http://localhost:8080/Backend';

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/single_user.php`,
    { params: { id: id } });
  }

  createProfileStudent(user: Object): Observable<Object> {
    return this.http.post(`${this.apiUrl}/create.php`, user);
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/read.php`);
  }
  }

