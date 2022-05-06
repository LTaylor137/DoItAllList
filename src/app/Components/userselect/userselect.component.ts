import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { ListService } from '../../Services/list.service';
import { ApistatusService } from 'src/app/Services/apistatus.service';


@Component({
  selector: 'app-userselect',
  templateUrl: './userselect.component.html',
  styleUrls: ['./userselect.component.css']
})

export class UserselectComponent implements OnInit {

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

  activateAddUser() {
    if (this.isAddUserActive === false) {
      this.isAddUserActive = true;
    } else {
      this.isAddUserActive = false;
    }
  }

  stopAddUser() {
    this.isAddUserActive = false;
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

}
