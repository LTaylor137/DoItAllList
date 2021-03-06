import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { ListService } from '../../Services/list.service';
import { ApistatusService } from 'src/app/Services/apistatus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  logInAsUser(passedUserID, passedUsername) {
    this.UserService.navigateToShowList(passedUserID, passedUsername)
  }

  cancelRegisterUser() {
this.UserService.navigateToLogin();
  }

  addNewUser() {
    // console.log("addNewUser = ")
    // if ((<HTMLInputElement>document.getElementById("usernameinputfield")).value === '') {
    //   console.log("no text detected")
    // } else {
    //   let newUsernameText = (<HTMLInputElement>document.getElementById("usernameinputfield")).value
    //   this.UserService.addNewUser(newUsernameText);
    //   this.isAddUserActive = false;
    // }

    let inputUsername: string;
    let inputPassword: string;
    let errormsg: string = '';


    // check un
    if ((<HTMLInputElement>document.getElementById("regusernameinput")).value === '') {
      console.log("no text detected in username input")
      errormsg = "no text detected in username input"
    } else {
      inputUsername = (<HTMLInputElement>document.getElementById("regusernameinput")).value
      // check pw
      if ((<HTMLInputElement>document.getElementById("regpasswordinput")).value === '') {
        console.log("no text detected in password input")
        errormsg = "no text detected in password input"
      } else {
        inputPassword = (<HTMLInputElement>document.getElementById("regpasswordinput")).value
      }
    }
    if (errormsg === '') {
    this.UserService.addNewUser(inputUsername, inputPassword)
    } else {
      alert(errormsg)
    }


  }

  register() {

  }

}
