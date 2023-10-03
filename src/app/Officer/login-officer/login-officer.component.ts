import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-officer',
  templateUrl: './login-officer.component.html',
  styleUrls: ['./login-officer.component.css']
})
export class LoginOfficerComponent {
  constructor(
    private router: Router,
    private http: HttpClient) { }

  username: string = '';

  onSubmit() {
    // console.log(this.username);
    this.http.post('http://localhost:8080/PJ/Backend/Officer/login-officer.php', {
username: this.username,
    }).subscribe({
      next: (res) => {
        console.log(res);
        if (res == 'login success') {
          this.router.navigate(['/home-officer'])
        } 
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}


