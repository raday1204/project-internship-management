import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-add-relation-popup',
  templateUrl: './add-relation-popup.component.html',
  styleUrls: ['./add-relation-popup.component.css']
})
export class AddRelationPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<AddRelationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router  // Inject Router in the constructor
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Add logic for handling the submit action
    // For example, you can make an HTTP request to save the data

    // After submitting, close the dialog
    this.dialogRef.close();

    // Additional logic after submission, for example, navigate to a different route
    this.router.navigate(['/relation-officer']);
  }
}
