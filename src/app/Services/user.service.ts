import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { List } from '../Classes/List';
import { ListItem } from '../Classes/ListItem';
import { ListItemRequest } from '../models/ListItemRequestModel';
import { ListItemfromDB } from '../Classes/ListItemfromDB';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ApistatusService } from './apistatus.service';
import { UserRequest } from '../models/UserRequestModel';
import { UserFromDB } from '../Classes/UsersFromDB';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public userID = localStorage.getItem('userID')
  public username: string = localStorage.getItem('username')
  public UsersFromDB: UserFromDB[] = [];


  constructor(private router: Router, private httpClient: HttpClient, private ApistatusService: ApistatusService) { }

  setuserID(userID) {
    const jsonData = JSON.stringify(userID)
    localStorage.setItem('userID', jsonData)
  }

  getuserID() {
    return localStorage.getItem('userID')
  }

  navigateToUserSelect() {
    console.log("navigateToUserSelect clicked")
    this.router.navigateByUrl('/userselect');
  }

  navigateToShowList(passedUserID, passedUsername) {
    this.userID = passedUserID;
    this.username = passedUsername;

    //store items in local storage.
    localStorage.setItem('userID', passedUserID)
    localStorage.setItem('username', passedUsername)

    console.log("passedUserID = " + passedUserID)
    console.log("userID = " + this.userID)
    console.log("navigateToShowList clicked")
    this.router.navigateByUrl('/showlist');
  }

  getUsersFromDB() {

    this.UsersFromDB = [];

    // ======= API request ======== \\

    this.ApistatusService.loading = true;
    this.ApistatusService.loaded = false;

    let request = this.httpClient.get<UserRequest[]>("https://localhost:5001/DoItAllList/GetAllUsersFromDB");

    request.subscribe((response) => {
      // if api request successful. 

      response.forEach(element => {
        this.UsersFromDB.push(element);
      });

      console.log(this.UsersFromDB)

      this.ApistatusService.loading = false;
      this.ApistatusService.loaded = true;
      setTimeout(() => {
        this.ApistatusService.loaded = false;
      }, 500);

    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to retrieve users. \n"
          + "please try again.")
      }
    );
  }



  addNewUser(passedNewUsername) {
    // create a temporary array of available ID's and select the first available ID
    let newUserIDsAvailable: number[] = [];
    for (let i = 1; i < (this.UsersFromDB.length + 2); i++) {
      if (this.UsersFromDB.find((User) => User.UserID === i)) {

        //do nothing
        // console.log("the id " + i + " already exists and was not added")
      } else {
        newUserIDsAvailable.push(i)
        // console.log("the available id " + i + " was added")
      }
    }
    let newUserID: number = newUserIDsAvailable[0];
    let newUsername: string = passedNewUsername;
    // console.log("newUserID " + newUserID)
    // console.log("newUsername " + newUsername)

    // ======= API request ======== \\

    this.ApistatusService.loading = true;
    this.ApistatusService.loaded = false;

    let request = this.httpClient.post<UserRequest>("https://localhost:5001/DoItAllList/CreateNewUser",
      {
        UserID: newUserID,
        Username: newUsername
      } as UserRequest);
    request.subscribe(() => {
      // add the new List using that new ID, only if api request successful.
      this.UsersFromDB.push(new UserFromDB(newUserID, newUsername));

      this.UsersFromDB.forEach(User => {
        console.log(User)

        this.ApistatusService.loading = false;
        this.ApistatusService.loaded = true;
        setTimeout(() => {
          this.ApistatusService.loaded = false;
        }, 500);

      });
      (<HTMLInputElement>document.getElementById("adduserinputfield")).value = '';
    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to create the list item \n"
          + "please try again.")
      }
    );

  }
}







