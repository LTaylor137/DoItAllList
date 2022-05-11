import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { ListService } from '../../Services/list.service';
import { ApistatusService } from 'src/app/Services/apistatus.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public UserService: UserService, public ListService: ListService, public ApistatusService: ApistatusService) { }

  public randomColour: string = '';
  public isAddUserActive: boolean = false;

  ngOnInit(): void {
    this.UserService.getUsersFromDB()
    this.getRandomColour()
  }

  getRandomColour() {
    let getRandomColour: string = this.ListService.listOfColourThemes[Math.floor(Math.random() * this.ListService.listOfColourThemes.length)]
    this.randomColour = getRandomColour;
  }

  login() {

    let inputUsername: string;
    let inputPassword: string;
    let errormsg: string = '';

    // check un
    if ((<HTMLInputElement>document.getElementById("usernameinput")).value === '') {
      console.log("no text detected in username input")
      errormsg = "no text detected in username input"
    } else {
      inputUsername = (<HTMLInputElement>document.getElementById("usernameinput")).value
      // check pw
      if ((<HTMLInputElement>document.getElementById("passwordinput")).value === '') {
        console.log("no text detected in password input")
        errormsg = "no text detected in password input"
      } else {
        inputPassword = (<HTMLInputElement>document.getElementById("passwordinput")).value
      }
    }
    if (errormsg === '') {
    this.UserService.attemptLogin(inputUsername, inputPassword)
    } else {
      alert(errormsg)
    }
  }


  activateRegisterUser() {
    this.UserService.navigateToRegister();
  }

  addNewUser() {
    console.log("addNewUser = ")
    if ((<HTMLInputElement>document.getElementById("adduserinputfield")).value === '') {
      console.log("no text detected")
    } else {
      let newUsernameText = (<HTMLInputElement>document.getElementById("adduserinputfield")).value
      this.UserService.addNewUser(newUsernameText);
      this.isAddUserActive = false;
    }
  }

  register() {

  }

}
