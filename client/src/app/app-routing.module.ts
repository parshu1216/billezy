import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales/sales.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardService] },
  { path: 'sales', component: SalesComponent ,canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent,canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
