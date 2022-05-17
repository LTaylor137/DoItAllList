import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './Components/list/list.component';
import { UserselectComponent } from './Components/userselect/userselect.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component'; 

const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "userselect", component: UserselectComponent },
  { path: "showlist", component: ListComponent },
  { path: "**", redirectTo: "login" }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
