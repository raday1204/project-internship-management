import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel-status',
  templateUrl: './cancel-status.component.html',
  styleUrls: ['./cancel-status.component.css']
})
export class CancelStatusComponent {
  StudentProfileData = {
    student_name: '',
    student_code: ''
  }
  company ={
    company_name: ''
  }

}

