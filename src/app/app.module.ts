import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ListService } from './Services/list.service';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ListComponent } from './Components/list/list.component';
import { UserService } from './Services/user.service';
import { ApistatusComponent } from './Components/apistatus/apistatus.component';
import { UserselectComponent } from './Components/userselect/userselect.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
// import { ListItem } from './Classes/ListItem';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    FooterComponent,
    ApistatusComponent,
    UserselectComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ListService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
