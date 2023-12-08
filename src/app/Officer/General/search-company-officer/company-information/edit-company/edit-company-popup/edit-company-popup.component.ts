// edit-company-popup.component.ts
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/Officer/General/search-company-officer/company-information/data-storage.service';

@Component({
  selector: 'app-edit-company-popup',
  templateUrl: './edit-company-popup.component.html',
  styleUrls: ['./edit-company-popup.component.css']
})
export class EditCompanyPopupComponent implements OnInit {

  companyName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditCompanyPopupComponent>,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CompanyInformation']) {
        const parsedData = JSON.parse(params['CompanyInformation']);
        this.companyName = parsedData.company_name;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const response = {
      company_name: 'Updated Company Name',
    };

    // Save the updated data to the data storage service
    this.dataStorageService.updateCompanyInformation(response);
    this.submitForm();
  }

  private navigateBackToCompanyInformation(updatedData: any) {
    this.dialogRef.close();

    const queryParams = {
      CompanyInformation: JSON.stringify(updatedData)
    };

    this.router.navigate(['/company-information'], { queryParams: queryParams });
  }

  private submitForm() {
    // Subscribe to the observable to get the actual data
    this.dataStorageService.getCompanyInformation().subscribe(
      (data: any) => {
        // Get the latest data from DataStorageService
        const formData = {
          year: data.year,
          type_code: data.type_code
        };
      
        this.http.post('http://localhost/PJ/Backend/Officer/Company/company-officer.php', formData)
          .subscribe(
            (response: any) => {
              console.log('Backend Response:', response);
        
              if (response.hasOwnProperty('company') && response.hasOwnProperty('need_student')) {
                const updatedData = {
                  year: formData.year,
                  type_code: formData.type_code,
                  company: response.company,
                  need_student: response.need_student,
                };
        
                this.dataStorageService.updateCompanyInformation(updatedData);
        
              } else {
                console.error('Invalid response from server.');
              }
            },
            (error) => {
              console.error('HTTP Error:', error);
            }
          );
      },
      (error) => {
        console.error('Error getting company information:', error);
      }
    );
  }
}