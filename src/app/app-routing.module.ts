import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './Components/list/list.component';
import { UserselectComponent } from './Components/userselect/userselect.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "userselect", component: UserselectComponent },
  { path: "showlist", component: ListComponent },
  { path: "**", redirectTo: "userselect" }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
