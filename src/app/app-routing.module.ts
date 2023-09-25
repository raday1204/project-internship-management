import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { EnterCompanyFormComponent } from './Student/Form/company-form-student/enter-company-form/enter-company-form.component';
import { DiaryFormStudentComponent } from './Student/Form/diary-form-student/diary-form-student.component';
import { EvaluationFormStudentComponent } from './Student/Form/evaluation-form-student/evaluation-form-student.component';
import { ManualFormStudentComponent } from './Student/Form/manual-form-student/manual-form-student.component';
import { PrintCompanyComponent } from './Student/Form/company-form-student/enter-company-form/print-company/print-company.component';

import { SearchStudentOfficerComponent } from './Officer/General/search-student-officer/search-student-officer.component';
import { StudentInformationComponent } from './Officer/General/search-student-officer/student-information/student-information.component';
import { SearchCompanyOfficerComponent } from './Officer/General/search-company-officer/search-company-officer.component';
import { CompanyInformationComponent } from './Officer/General/search-company-officer/company-information/company-information.component';
import { StatusOfficerComponent } from './Officer/General/status-officer/status-officer.component';
import { SearchCancelFormOfficerComponent } from './Officer/Form/search-cancel-form-officer/search-cancel-form-officer.component';
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
import { AddCompanyComponent } from './Officer/General/search-company-officer/company-information/add-company/add-company.component';
import { EditCompanyComponent } from './Officer/General/search-company-officer/company-information/edit-company/edit-company.component';
import { AddInternalCompanyComponent } from './Officer/General/search-company-officer/company-information/add-company/add-internal-company/add-internal-company.component';
import { StatusInformationComponent } from './Officer/General/status-officer/status-information/status-information.component';
import { CancelFormComponent } from './Officer/Form/search-cancel-form-officer/cancel-form/cancel-form.component';
import { ConfirmFormComponent } from './Officer/Form/search-confirm-form-officer/confirm-form/confirm-form.component';
import { EvaluationFormComponent } from './Officer/Form/search-evaluation-form-officer/evaluation-form/evaluation-form.component';
import { NotifyingFormComponent } from './Officer/Form/search-notifying-form-officer/notifying-form/notifying-form.component';
import { PermissionFormComponent } from './Officer/Form/search-permission-form-officer/permission-form/permission-form.component';
import { SendFormComponent } from './Officer/Form/search-send-form-officer/send-form/send-form.component';
import { ThanksFormComponent } from './Officer/Form/search-thanks-form-officer/thanks-form/thanks-form.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },

  { path: 'advice-student', component: AdviceStudentComponent },
  { path: 'calendar-student', component: CalendarStudentComponent },
  { path: 'cancel-status', component: CancelStatusComponent },
  { path: 'confirm-status', component: ConfirmStatusComponent },
  { path: 'wait-status', component: WaitStatusComponent },
  { path: 'company-student', component: CompanyStudentComponent },
  { path: 'select-company', component: SelectCompanyComponent },
  { path: 'coordinator-student', component: CoordinatorStudentComponent },
  { path: 'course-student', component: CourseStudentComponent },
  { path: 'home-student', component: HomeStudentComponent },
  { path: 'login-student', component: LoginStudentComponent },
  { path: 'profile-student', component: ProfileStudentComponent },  
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'acceptance-form-student', component: AcceptanceFormStudentComponent },
  { path: 'company-form-student', component: CompanyFormStudentComponent },
  { path: 'enter-company-form', component: EnterCompanyFormComponent },
  { path: 'diary-form-student', component: DiaryFormStudentComponent },
  { path: 'evaluation-form-student', component: EvaluationFormStudentComponent },
  { path: 'manual-form-student', component: ManualFormStudentComponent },
  { path: 'print-company', component: PrintCompanyComponent },

  { path: 'search-student-officer', component: SearchStudentOfficerComponent },
  { path: 'student-information', component: StudentInformationComponent },
  { path: 'search-company-officer', component: SearchCompanyOfficerComponent },
  { path: 'company-information', component: CompanyInformationComponent },
  { path: 'status-officer', component: StatusOfficerComponent },
  { path: 'search-cancel-form-officer', component: SearchCancelFormOfficerComponent },
  { path: 'search-confirm-form-officer', component: SearchConfirmFormOfficerComponent },
  { path: 'search-evaluation-form-officer', component: SearchEvaluationFormOfficerComponent },
  { path: 'search-notifying-form-officer', component: SearchNotifyingFormOfficerComponent },
  { path: 'search-permission-form-officer', component: SearchPermissionFormOfficerComponent },
  { path: 'search-send-form-officer', component: SearchSendFormOfficerComponent },
  { path: 'search-thanks-form-officer', component: SearchThanksFormOfficerComponent },
  { path: 'add-relation', component: AddRelationComponent },
  { path: 'edit-relation', component: EditRelationComponent },
  { path: 'login-officer', component: LoginOfficerComponent },
  { path: 'home-officer', component: HomeOfficerComponent },
  { path: 'relation-officer', component: RelationOfficerComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'edit-company', component: EditCompanyComponent },
  { path: 'add-internal-company', component: AddInternalCompanyComponent },
  { path: 'status-information', component: StatusInformationComponent },
  { path: 'cancel-form', component: CancelFormComponent },
  { path: 'confirm-form', component: ConfirmFormComponent },
  { path: 'evaluation-form', component: EvaluationFormComponent },
  { path: 'notifying-form', component: NotifyingFormComponent },
  { path: 'permission-form', component: PermissionFormComponent },
  { path: 'send-form', component: SendFormComponent },
  { path: 'thanks-form', component: ThanksFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
