import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    private companyInformationSubject = new BehaviorSubject<any>(null);
    private studentInformationSubject = new BehaviorSubject<any>(null);

    companyInformation$ = this.companyInformationSubject.asObservable();
    studentInformation$ = this.studentInformationSubject.asObservable();

    constructor() { }

    updateCompanyInformation(updatedData: any): void {
        this.companyInformationSubject.next(updatedData);
    }

    updateStudentInformation(updatedData: any): void {
        this.studentInformationSubject.next(updatedData);
    }

    getCompanyInformation(): any {
        return this.companyInformationSubject.value;
    }

    getStudentInformation(): any {
        return this.studentInformationSubject.value;
    }

    setCompanyInformation(data: any): void {
        this.companyInformationSubject.next(data);
    }
    
    setStudentInformation(data: any): void {
        this.studentInformationSubject.next(data);
    }
}
