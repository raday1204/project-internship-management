// relation-officer.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Relation {
  id: number;
  relation_date: string;
  relation_content: string;
}

@Component({
  selector: 'app-relation-officer',
  templateUrl: './relation-officer.component.html',
  styleUrls: ['./relation-officer.component.css']
})
export class RelationOfficerComponent implements OnInit {
  relations: Relation[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router
    ) {}

  ngOnInit(): void {
    this.fetchRelations();
  }

  fetchRelations() {
    const serverUrl = 'http://localhost/PJ/Backend/Officer/Relation/get-relation.php';

    this.http.get<{ data: Relation[] }>(serverUrl).subscribe(
      (response) => {
        this.relations = response.data;
      },
      (error) => {
        console.error('HTTP Error:', error);
        // Handle error here
      }
    );
  }

  deleteRelation(relationId  : number) {
    const serverUrl = `http://localhost/PJ/Backend/Officer/Relation/delete-relation.php?id=${relationId}`;
    this.http.delete(serverUrl).subscribe(
      (response: any) => {
        console.log('Delete Response:', response);
        if (response.success) {
          // Update the relations array by filtering out the deleted relation
          this.relations = this.relations.filter(relation => relation.id !== relationId  );
        } else {
          console.error('Delete Error:', response.message);
          // Handle delete error here
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
        // Handle HTTP error here
      }
    );
  }

  editRelation(relationId: number) {
    // Navigate to the edit page with the relation ID
    this.router.navigate(['/edit-relation', relationId]);
  }
}
