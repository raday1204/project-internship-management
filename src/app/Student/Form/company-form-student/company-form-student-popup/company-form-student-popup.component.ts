import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-form-student-popup',
  templateUrl: './company-form-student-popup.component.html',
  styleUrls: ['./company-form-student-popup.component.css']
})
export class CompanyFormStudentPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<CompanyFormStudentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close({ saveData: false });
  }

  onSaveClick(): void {
    this.dialogRef.close({ saveData: true });
  }
}