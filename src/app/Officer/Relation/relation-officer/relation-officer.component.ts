import { Component } from '@angular/core';

@Component({
  selector: 'app-relation-officer',
  templateUrl: './relation-officer.component.html',
  styleUrls: ['./relation-officer.component.css']
})
export class RelationOfficerComponent {
  relation: any = {
    relation_date: '',  // Initialize relation_date with a default value
    relation_content: '',
    relation_pic: ''
  };

  selectCompany(selectedCompany: any) {
    console.log("Selected Company:", selectedCompany);
}

deleteRelation(id: number) {
  this.relation = this.relation.filter((relation: { id: number; }) => relation.id !== id);
}
}