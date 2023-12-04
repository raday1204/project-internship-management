import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-relation-popup',
  templateUrl: './add-relation-popup.component.html',
  styleUrls: ['./add-relation-popup.component.css']
})
export class AddRelationPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<AddRelationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onCancel(): void {
    this.dialogRef.close({ saveData: false })
  }

  onSubmit(): void {
    this.dialogRef.close({ saveData: true });
  }
}
