import { Component } from '@angular/core';

@Component({
  selector: 'app-wait-status',
  templateUrl: './wait-status.component.html',
  styleUrls: ['./wait-status.component.css']
})
export class WaitStatusComponent {
  StudentProfileData = {
    name: '',
    student_code: ''
  }
  company ={
    company_name: ''
  }

}