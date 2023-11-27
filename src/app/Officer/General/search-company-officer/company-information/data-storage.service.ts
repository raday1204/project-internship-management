// data-storage.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    private companyInformationSubject = new BehaviorSubject<any>(null);
    companyInformation$ = this.companyInformationSubject.asObservable();

    constructor() { }

    updateCompanyInformation(updatedData: any): void {
        // You can perform additional logic here if needed
        // For simplicity, this example only updates the BehaviorSubject
        this.companyInformationSubject.next(updatedData);
    }

    getCompanyInformation(): any {
        // Get the latest company information
        return this.companyInformationSubject.value;
    }
    setCompanyInformation(data: any): void {
        // Set the company information
        this.companyInformationSubject.next(data);
    }
}
