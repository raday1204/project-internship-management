import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-student-popup',
  templateUrl: './company-student-popup.component.html',
  styleUrls: ['./company-student-popup.component.css']
})
export class CompanyStudentPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<CompanyStudentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onYesClick(): void {
    this.dialogRef.close({ saveData: true });
  }

  onNoClick(): void {
    this.dialogRef.close({ saveData: false });
  }
}
