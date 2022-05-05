import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './Components/list/list.component';
import { UserselectComponent } from './Components/userselect/userselect.component';

const routes: Routes = [

  { path: "userselect", component: UserselectComponent },
  { path: "showlist", component: ListComponent },
  { path: "**", redirectTo: "userselect" }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
