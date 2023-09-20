import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStudentService {
  [x: string]: any;
  private apiUrl = 'http://localhost:3000'; // Adjust the URL

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this['baseUrl']}/api/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this['baseUrl']}/api/data`, data);
  }
}
