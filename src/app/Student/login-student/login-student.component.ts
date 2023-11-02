import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  username: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  onSubmit() {
    this.http.post('http://localhost/PJ/Backend/Student/login-student.php', {
      username: this.username,
    }).subscribe({
      next: (response: any) => {
        console.log('Login API Response:', response);
        try {
          if (response.success) {
            if (response.user && response.user.username) { 
              this.username = response.user.username;
              console.log('Extracted username:', this.username);
              this.router.navigate(['/profile-student'], 
              { queryParams: { username: this.username } });
            } else {
              console.error('No username found in the response');
            }
          } else {
            console.error('Login failed:', response.message);
          }
        } catch (error) {
          console.error('Error parsing response:', error);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}  