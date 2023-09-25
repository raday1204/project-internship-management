import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStudentService {
  getStudentProfileData(): any {
    throw new Error('Method not implemented.');
  }
  selectedOption1: any;
  selectedOption2: any;
  private baseUrl = 'http://localhost:3000'; // Adjust the URL

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/data`, data);
  }

  searchData(selectedOption1: string, selectedOption2: string, searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/search`, {
      params: {
        option1: selectedOption1,
        option2: selectedOption2,
        term: searchTerm
      }
    });
  }
}