import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-relation-popup',
  templateUrl: './edit-relation-popup.component.html',
  styleUrls: ['./edit-relation-popup.component.css']
})

export class EditRelationPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<EditRelationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onCancel(): void {
    this.dialogRef.close({ saveData: false });
  }

  onSubmit(): void {
    this.dialogRef.close({ saveData: true });
}
}