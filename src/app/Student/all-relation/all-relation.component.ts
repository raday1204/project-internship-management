import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Relation {
  id: number;
  relation_date: string;
  relation_content: string;
}

@Component({
  selector: 'app-all-relation',
  templateUrl: './all-relation.component.html',
  styleUrls: ['./all-relation.component.css']
})

export class AllRelationComponent implements OnInit {

  dateTime: Date | undefined
  username: string = '';
  loggedInUsername: string = '';
  relations: Relation[] = [];

  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchRelations(this.currentPage, this.itemsPerPage);
  }

  fetchRelations(page: number, limit: number): void {
    const serverUrl = `http://localhost/PJ/Backend/Officer/Relation/get-relation.php?page=${page}&limit=${limit}`;

    this.http.get<{ data: Relation[] }>(serverUrl).subscribe(
      (response) => {
        this.relations = response.data;
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }

  paginate(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchRelations(this.currentPage, this.itemsPerPage);
  }

  logout() {
    this.http.post<any>('http://localhost/PJ/Backend/Student/logout.php', {})
      .subscribe(
        () => {
          localStorage.removeItem('loggedInUsername');
<<<<<<< HEAD
          localStorage.removeItem('selectedCompanyID');
          // Replace the current navigation history with the login page
          this.router.navigateByUrl('/login-student', { replaceUrl: true });
=======
          this.router.navigate(['/login-student']);
>>>>>>> 562c7b26eeb88f3e3a2dddadbaaa2af6d67b5801
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
  }
}