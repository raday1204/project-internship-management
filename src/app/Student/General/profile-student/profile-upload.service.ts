import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileUploadService {


  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    return this.http.post<any>('http://example.com/upload', formData);
  }
}
