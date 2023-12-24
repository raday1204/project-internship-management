import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-information-popup',
  templateUrl: './status-information-popup.component.html',
  styleUrls: ['./status-information-popup.component.css']
})
export class StatusInformationPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<StatusInformationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onCancel(): void {
    this.dialogRef.close({ saveData: false });
  }

  onSubmit(): void {
    this.dialogRef.close({ saveData: true });
  }
}