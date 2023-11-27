// edit-relation.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditRelationPopupComponent } from 'src/app/Officer/Relation/edit-relation/edit-relation-popup/edit-relation-popup.component';

@Component({
  selector: 'app-edit-relation',
  templateUrl: './edit-relation.component.html',
  styleUrls: ['./edit-relation.component.css']
})
// ... (existing imports)

export class EditRelationComponent implements OnInit {
  relationForm: FormGroup;
  relationId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.relationForm = this.fb.group({
      relation_date: ['', Validators.required],
      relation_content: ['', Validators.required],
      relation_pic: [null],
    });
  }

  ngOnInit(): void {
    this.relationId = this.route.snapshot.params['id'];
    this.fetchRelationDetails();
  }

  fetchRelationDetails() {
    this.http.get(`http://localhost/PJ/Backend/Officer/Relation/get-relation-details.php?id=${this.relationId}`)
      .subscribe(
        (response: any) => {
          if (response && response.data) {
            this.relationForm.patchValue(response.data);
          } else {
            console.error('Invalid response structure:', response);
          }
        },
        (error: HttpErrorResponse) => {
          console.error('HTTP Error:', error);
        }
      );
  }

  openDatePicker() {
    // Additional logic if needed
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.relationForm.patchValue({ relation_pic: file });
  }

  editRelation() {
    const formData = new FormData();
    formData.append('relation_date', this.relationForm.value.relation_date);
    formData.append('relation_content', this.relationForm.value.relation_content);
    formData.append('file', this.relationForm.value.relation_pic);

    const serverUrl = `http://localhost/PJ/Backend/Officer/Relation/update-relation.php?id=${this.relationId}`;

    const uploadPath = '/var/www/html/PJ/Backend/Officer/uploads/' + this.relationForm.value.relation_pic?.name;
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
          }
        },
        (error: HttpErrorResponse) => {
          console.error('HTTP Error:', error);

          if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
          } else {
            console.error('Server-side error:', error.error);
          }
        }
      );
  }

  openPopup(successMessage: string): void {
    const dialogRef = this.dialog.open(EditRelationPopupComponent, {
      data: { successMessage },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/relation-officer']);
    });
  }
}

