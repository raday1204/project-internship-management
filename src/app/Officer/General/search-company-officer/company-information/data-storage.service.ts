import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    private companyInformationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
    private studentInformationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

    // companyInformation$ = this.companyInformationSubject.asObservable();
    // studentInformation$ = this.studentInformationSubject.asObservable();

    constructor() { }

    updateCompanyInformation(updatedData: any): void {
        this.companyInformationSubject.next(updatedData);
    }

    updateStudentInformation(updatedData: any): void {
        this.studentInformationSubject.next(updatedData);
    }

    getCompanyInformation(): Observable<any> {
        return this.companyInformationSubject.asObservable();
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
