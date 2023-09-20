import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyStudentService {

  getSelectedCompany(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  getCompanyInformation(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/company-information');
  }
}