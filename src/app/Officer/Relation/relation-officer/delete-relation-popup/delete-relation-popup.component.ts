import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-relation-popup',
  templateUrl: './delete-relation-popup.component.html',
  styleUrls: ['./delete-relation-popup.component.css']
})
export class DeleteRelationPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRelationPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
