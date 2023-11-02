import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-student-officer',
  templateUrl: './search-student-officer.component.html',
  styleUrls: ['./search-student-officer.component.css']
})
export class SearchStudentOfficerComponent {
  selectedOption3: string = '';
  selectedOption4: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  submitForm() {
    const formData = new FormData();
    formData.append('year', this.selectedOption3);
    formData.append('type_code', this.selectedOption4);
  
    this.http.post('http://localhost/PJ/Backend/Officer/student-officer.php', formData)
      .subscribe(
        (response: any) => {
          console.log('Backend Response:', response);
          if (response.length > 0) {
            this.router.navigate(['/student-information'], { queryParams: { StudentInformation: JSON.stringify(response) } });
          } else {
            // Handle empty response
          }
        },
        (error) => {
          console.error('Error:', error);
          // Handle error (e.g., display an error message to the user)
        }
      );
  }
}  
