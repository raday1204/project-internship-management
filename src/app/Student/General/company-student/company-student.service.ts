// company-student.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CompanyStudentService {
  private username: string = '';

  constructor(
    private route: ActivatedRoute
    ) {}
    setUsername(username: string): void {
      this.username = username;
    }
  
    getUsername(): string {
      return this.username;
    }
}
