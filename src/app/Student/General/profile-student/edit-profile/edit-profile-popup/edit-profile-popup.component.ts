import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfilePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onCloseClick(): void {
    this.dialogRef.close({ saveData: false });
  }

  onSaveClick(): void {
    this.dialogRef.close({ saveData: true });
  }
}

