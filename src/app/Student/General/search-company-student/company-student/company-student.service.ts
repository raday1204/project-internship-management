import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyStudentService {
  private username: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
    ) {
    // Retrieve the username from the route parameters during service initialization
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
  getStudentData(username: string) {
    // Adjust the URL based on your API endpoint
    return this.httpClient.get(`http://localhost/PJ/Backend/Student/profile-student.php?username=${username}`);
  }
}
