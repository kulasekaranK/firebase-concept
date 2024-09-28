import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { StorageComponent } from './storage/storage.component';
import { RealtimeDatabaseComponent } from './realtime-database/realtime-database.component';

export const routes: Routes = [
    { path:"login", component:LoginComponent},
    { path:"register", component:RegisterComponent},
    { path:"add-task", component:AddTaskComponent,},
    { path:"", component:ViewTaskComponent,  },
    { path:"reset-password", component:ResetPasswordComponent},
    { path: 'edit-task/:id', component: EditTaskComponent,  },
    { path:"storage", component:StorageComponent},
    { path:"realtime-database", component:RealtimeDatabaseComponent}
];
// canActivate:[authGuardGuard]  