import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterCompanyService {
  constructor(private http: HttpClient) { }

  saveCompanyData(data: any) {
    return this.http.post('http://localhost:3000/saveData', data);
  }
  
  searchData(option1: string, option2: string, searchTerm: string): Observable<any> {
    return this.http.get<any>(`/api/search?option1=${option1}&option2=${option2}&term=${searchTerm}`);
  }

  enteredData: any = {};

  // Method to set the data
  setEnteredData(data: any) {
    this.enteredData = data;
  }

  // Method to get the data
  getEnteredData() {
    return this.enteredData;
  }
}