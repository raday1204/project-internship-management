import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-relation',
  templateUrl: './add-relation.component.html',
  styleUrls: ['./add-relation.component.css']
})
export class AddRelationComponent {
  relation: any = {};
  selectedFile: File | undefined;

  constructor(private http: HttpClient) {}

  saveRelation() {
    const formData = {
      relation_date: this.relation.relation_date,
      relation_content: this.relation.relation_content,
      relation_pic: this.relation.relation_pic,
    };
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onUpload() {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost:3000/students', fd)
        .subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
    }
  }
}
