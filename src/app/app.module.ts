import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdviceStudentComponent } from './Student/General/advice-student/advice-student.component';
import { CalendarStudentComponent } from './Student/General/calendar-student/calendar-student.component';
import { CancelStatusComponent } from './Student/General/status-studen/cancel-status/cancel-status.component';
import { ConfirmStatusComponent } from './Student/General/status-studen/confirm-status/confirm-status.component';
import { WaitStatusComponent } from './Student/General/status-studen/wait-status/wait-status.component';
import { CompanyStudentComponent } from './Student/General/company-student/company-student.component';
import { SelectCompanyComponent } from './Student/General/company-student/select-company/select-company.component';
import { CoordinatorStudentComponent } from './Student/General/coordinator-student/coordinator-student.component';
import { CourseStudentComponent } from './Student/General/course-student/course-student.component';
import { HomeStudentComponent } from './Student/home-student/home-student.component';
import { LoginStudentComponent } from './Student/login-student/login-student.component';
import { ProfileStudentComponent } from './Student/General/profile-student/profile-student.component';
import { EditProfileComponent } from './Student/General/profile-student/edit-profile/edit-profile.component';
import { AcceptanceFormStudentComponent } from './Student/Form/acceptance-form-student/acceptance-form-student.component';
import { CompanyFormStudentComponent } from './Student/Form/company-form-student/company-form-student.component';
import { DiaryFormStudentComponent } from './Student/Form/diary-form-student/diary-form-student.component';
import { EvaluationFormStudentComponent } from './Student/Form/evaluation-form-student/evaluation-form-student.component';
import { ManualFormStudentComponent } from './Student/Form/manual-form-student/manual-form-student.component';

import { SearchStudentOfficerComponent } from './Officer/General/search-student-officer/search-student-officer.component';
import { StudentInformationComponent } from './Officer/General/search-student-officer/student-information/student-information.component';
import { SearchCompanyOfficerComponent } from './Officer/General/search-company-officer/search-company-officer.component';
import { CompanyInformationComponent } from './Officer/General/search-company-officer/company-information/company-information.component';
import { StatusOfficerComponent } from './Officer/General/status-officer/status-officer.component';
import { SearchReportFormOfficerComponent } from './Officer/Form/search-report-form-officer/search-report-form-officer.component';
import { SearchConfirmFormOfficerComponent } from './Officer/Form/search-confirm-form-officer/search-confirm-form-officer.component';
import { SearchEvaluationFormOfficerComponent } from './Officer/Form/search-evaluation-form-officer/search-evaluation-form-officer.component';
import { SearchNotifyingFormOfficerComponent } from './Officer/Form/search-notifying-form-officer/search-notifying-form-officer.component';
import { SearchPermissionFormOfficerComponent } from './Officer/Form/search-permission-form-officer/search-permission-form-officer.component';
import { SearchSendFormOfficerComponent } from './Officer/Form/search-send-form-officer/search-send-form-officer.component';
import { SearchThanksFormOfficerComponent } from './Officer/Form/search-thanks-form-officer/search-thanks-form-officer.component';
import { AddRelationComponent } from './Officer/Relation/add-relation/add-relation.component';
import { EditRelationComponent } from './Officer/Relation/edit-relation/edit-relation.component';
import { LoginOfficerComponent } from './Officer/login-officer/login-officer.component';
import { HomeOfficerComponent } from './Officer/home-officer/home-officer.component';
import { RelationOfficerComponent } from './Officer/Relation/relation-officer/relation-officer.component';
import { EditProfileService } from './Student/General/profile-student/edit-profile/edit-profile.service';
import { ProfileUploadService } from './Student/General/profile-student/profile-upload.service';
import { AddCompanyComponent } from './Officer/General/search-company-officer/company-information/add-company/add-company.component';
import { EditCompanyComponent } from './Officer/General/search-company-officer/company-information/edit-company/edit-company.component';
import { ConfirmFormComponent } from './Officer/Form/search-confirm-form-officer/confirm-form/confirm-form.component';
import { EvaluationFormComponent } from './Officer/Form/search-evaluation-form-officer/evaluation-form/evaluation-form.component';
import { NotifyingFormComponent } from './Officer/Form/search-notifying-form-officer/notifying-form/notifying-form.component';
import { PermissionFormComponent } from './Officer/Form/search-permission-form-officer/permission-form/permission-form.component';
import { SendFormComponent } from './Officer/Form/search-send-form-officer/send-form/send-form.component';
import { ThanksFormComponent } from './Officer/Form/search-thanks-form-officer/thanks-form/thanks-form.component';
import { AddInternalCompanyComponent } from './Officer/General/search-company-officer/company-information/add-company/add-internal-company/add-internal-company.component';
import { StatusInformationComponent } from './Officer/General/status-officer/status-information/status-information.component';
import { DialogComponent } from './Officer/General/search-company-officer/company-information/add-company/add-internal-company/Dialog-Add-Internal/dialog/dialog.component';
import { EditCompanyPopupComponent } from './Officer/General/search-company-officer/company-information/edit-company/edit-company-popup/edit-company-popup.component';
import { DataStorageService } from './Officer/General/search-company-officer/company-information/data-storage.service';
import { ReportFormComponent } from './Officer/Form/search-report-form-officer/report-form/report-form.component';
import { AddRelationPopupComponent } from './Officer/Relation/add-relation/add-relation-popup/add-relation-popup.component';
import { EditRelationPopupComponent } from './Officer/Relation/edit-relation/edit-relation-popup/edit-relation-popup.component';
import { DeleteRelationPopupComponent } from './Officer/Relation/relation-officer/delete-relation-popup/delete-relation-popup.component';
import { CompanyStudentPopupComponent } from './Student/General/company-student/company-student-popup/company-student-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    AdviceStudentComponent,
    CalendarStudentComponent,
    CancelStatusComponent,
    ConfirmStatusComponent,
    WaitStatusComponent,
    CompanyStudentComponent,
    SelectCompanyComponent,
    CoordinatorStudentComponent,
    CourseStudentComponent,
    HomeStudentComponent,
    LoginStudentComponent,
    ProfileStudentComponent,
    EditProfileComponent,
    
    SearchStudentOfficerComponent,
    StudentInformationComponent,
    SearchCompanyOfficerComponent,
    CompanyInformationComponent,
    StatusOfficerComponent,
    SearchReportFormOfficerComponent,
    SearchConfirmFormOfficerComponent,
    SearchEvaluationFormOfficerComponent,
    SearchNotifyingFormOfficerComponent,
    SearchPermissionFormOfficerComponent,
    SearchSendFormOfficerComponent,
    SearchThanksFormOfficerComponent,
    AcceptanceFormStudentComponent,
    CompanyFormStudentComponent,
    DiaryFormStudentComponent,
    EvaluationFormStudentComponent,
    ManualFormStudentComponent,
    AddRelationComponent,
    EditRelationComponent,
    LoginOfficerComponent,
    HomeOfficerComponent,
    RelationOfficerComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ConfirmFormComponent,
    EvaluationFormComponent,
    NotifyingFormComponent,
    PermissionFormComponent,
    SendFormComponent,
    ThanksFormComponent,
    AddInternalCompanyComponent,
    StatusInformationComponent,
    DialogComponent,
    EditCompanyPopupComponent,
    ReportFormComponent,
    AddRelationPopupComponent,
    EditRelationPopupComponent,
    DeleteRelationPopupComponent,
    CompanyStudentPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],

  providers: [
    EditProfileService,
    ProfileUploadService,
    MatDialog,
    DataStorageService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }