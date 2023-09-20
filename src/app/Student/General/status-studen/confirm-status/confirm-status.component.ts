import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-status',
  templateUrl: './confirm-status.component.html',
  styleUrls: ['./confirm-status.component.css']
})
export class ConfirmStatusComponent {
  StudentProfileData = {
    student_name: '',
    student_code: ''
  }
  company ={
    company_name: ''
  }

}
