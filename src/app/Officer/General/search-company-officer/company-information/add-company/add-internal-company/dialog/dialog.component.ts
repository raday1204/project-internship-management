import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close({ saveData: false });
  }

  onSaveClick(): void {
    this.dialogRef.close({ saveData: true, company: this.data.company, need_student: this.data.need_student });
  }
}