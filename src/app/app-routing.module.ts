import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './components/login/auth-guard';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: "registration", component: RegistrationComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent,  pathMatch: 'full' },
  { path: "members", component: MembersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: "view/:id", component: ViewComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: "update/:id", component: UpdateComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
