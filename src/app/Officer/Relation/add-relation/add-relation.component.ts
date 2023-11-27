import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { AddRelationPopupComponent } from 'src/app/Officer/Relation/add-relation/add-relation-popup/add-relation-popup.component'

@Component({
  selector: 'app-add-relation',
  templateUrl: './add-relation.component.html',
  styleUrls: ['./add-relation.component.css']
})
export class AddRelationComponent {
  relation: any = {
    relation_date: '',
    relation_content: '',
    relation_pic: null
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  openDatePicker() {
    // You can perform any additional logic here if needed
  }

  saveRelation() {
    const formattedDate = this.relation.relation_date ? formatDate(this.relation.relation_date, 'yyyy-MM-dd', 'en-US') : '';
    const formData = new FormData();
    formData.append('relation_date', formattedDate);
    formData.append('relation_content', this.relation.relation_content);
    formData.append('file', this.relation.relation_pic);

    const serverUrl = 'http://localhost/PJ/Backend/Officer/Relation/add-relation.php';

    // Update the absolute path to the 'uploads' directory
    const uploadPath = '/var/www/html/PJ/Backend/Officer/uploads/' + this.relation.relation_pic.name;
    formData.append('upload_path', uploadPath);

    this.http.post(serverUrl, formData)
      .subscribe(
        (response: any) => {
          console.log('Backend Response:', response);
          if (response.success) {
            console.log(response.message);
            this.openPopup(response.message);
          } else {
            console.error('Backend Error:', response.message);
            // Handle backend error here
          }
        },
        (error: HttpErrorResponse) => {
          console.error('HTTP Error:', error);

          // Log the full error response for debugging
          if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
          } else {
            console.error('Server-side error:', error.error);
          }

          // Handle HTTP error here
        }
      );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.relation.relation_pic = file;
  }

  openPopup(successMessage: string): void {
    const formattedDate = this.relation.relation_date ?
      formatDate(this.relation.relation_date, 'yyyy-MM-dd', 'en-US') : '';
  
    const dialogRef = this.dialog.open(AddRelationPopupComponent, {
      data: {
        successMessage,
        relationDate: formattedDate,
        relationContent: this.relation.relation_content
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Additional logic after the dialog is closed, if needed
    });
  }
}

