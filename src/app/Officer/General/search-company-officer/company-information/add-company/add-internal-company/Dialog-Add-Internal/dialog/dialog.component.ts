import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  submittedData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    private router: Router 
  ) { }

  onCancel(): void {
    // Handle the "Cancel" button action
    this.dialogRef.close();
  }

  onSubmit(): void {
    const companyInformation = JSON.parse(this.data.CompanyInformation);
  
    // Navigate to the "company-information" route with the companyInformation
    this.router.navigate(['/company-information'], { queryParams: companyInformation });
  
    // Close the dialog
    this.dialogRef.close();
  }
  
}
