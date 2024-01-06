import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditRelationPopupComponent } from 'src/app/Officer/Relation/edit-relation/edit-relation-popup/edit-relation-popup.component';
import { DataStorageService } from '../../General/search-company-officer/company-information/data-storage.service';

@Component({
  selector: 'app-edit-relation',
  templateUrl: './edit-relation.component.html',
  styleUrls: ['./edit-relation.component.css']
})
export class EditRelationComponent implements OnInit {
  relationForm: FormGroup;
  relationId: any;
  relation: any = {
    relation_date: '',
    relation_content: '',
    relation_pic: ''
  };
  displayedFilePath: string | undefined;
  username: string = '';
  loggedInUsername: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dataStorageService: DataStorageService
  ) {
    this.relationForm = this.fb.group({
      relation_date: ['', Validators.required],
      relation_content: ['', Validators.required],
      relation_pic: ['']
    });
  }

  ngOnInit(): void {
    this.relationId = this.route.snapshot.params['id'];
    this.loadRelationData();

    this.loggedInUsername = localStorage.getItem('loggedInUsername') || '';
    this.username = this.loggedInUsername;
    if (!this.username) {
      this.router.navigateByUrl('/login-officer', { replaceUrl: true });
      return;
    }
  }

  loadRelationData() {
    this.fetchRelationDetails(this.relationId).subscribe(
      (response: any) => {
        this.relationForm.patchValue(response.data);
        this.displayedFilePath = `http://localhost${response.data.relation_pic}`;
      },
      (error) => {
        console.error('Error fetching relation data:', error);
      }
    );
  }

  fetchRelationDetails(relationId: string) {
    return this.http.get(`http://localhost/PJ/Backend/Officer/Relation/get-relation-details.php?id=${relationId}`);
  }

  openDatePicker() {
    // Additional logic if needed
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.relationForm.patchValue({ relation_pic: file });
      this.displayedFilePath = URL.createObjectURL(file);
    }
  }

  createLocalImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  openPopup(): void {
    const formattedDate = this.relationForm.value.relation_date ?
      formatDate(this.relationForm.value.relation_date, 'yyyy-MM-dd', 'en-US') : '';

    const dialogRef = this.dialog.open(EditRelationPopupComponent, {
      data: {
        relation: {
          relation_date: formattedDate,
          relation_content: this.relationForm.value.relation_content,
          relation_pic: this.relationForm.value.relation_pic
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result && result.saveData) {
        this.editRelation();
      }
    });
  }

  editRelation() {
    const formattedDate = this.relationForm.value.relation_date ?
      formatDate(this.relationForm.value.relation_date, 'yyyy-MM-dd', 'en-US') : '';
    const formData = new FormData();
    formData.append('relation_date', formattedDate);
    formData.append('relation_content', this.relationForm.value.relation_content);
    formData.append('file', this.relationForm.value.relation_pic);

    const serverUrl = `http://localhost/PJ/Backend/Officer/Relation/update-relation.php?id=${this.relationId}`;

    this.http.post(serverUrl, formData).subscribe(
      (response: any) => {
        console.log('Backend Response:', response);
        if (response.success) {
          console.log(response.message);
          this.router.navigate(['/relation-officer']);
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

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
          this.username = ''; // Reset username
          this.router.navigateByUrl('/login-officer', { replaceUrl: true });
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
}