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
import { UserResponse } from '../models/UserResponseModel';
import { UserFromDB } from '../Classes/UsersFromDB';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  public userID = localStorage.getItem('userID')
  public username: string = localStorage.getItem('username')
  public UsersFromDB: UserFromDB[] = [];

  // _userid: number | null;
  // _username: string | null;
  // _password: string | null;

  constructor(private router: Router, private httpClient: HttpClient, private ApistatusService: ApistatusService) { }

  setuserID(userID) {
    const jsonData = JSON.stringify(userID)
    localStorage.setItem('userID', jsonData)
  }

  // getuserID() {
  //   return localStorage.getItem('userID')
  // }

  navigateToUserSelect() {
    console.log("navigateToUserSelect clicked")
    this.router.navigateByUrl('/userselect');
  }

  navigateToLogin() {
    console.log("navigateToLogin clicked")
    this.router.navigateByUrl('/login');
  }

  navigateToRegister() {
    console.log("avigateToRegister clicked")
    this.router.navigateByUrl('/register');
  };

  attemptLogin(inputUsername, inputPassword) {
    console.log("inputUsername = " + inputUsername)
    console.log("inputPassword = " + inputPassword)

    let resultID: number = 0;
    let resultusername: string = '';

    // ======= API request ======== \\

    this.ApistatusService.loading = true;
    this.ApistatusService.loaded = false;

    let request = this.httpClient.post<UserResponse>(this.ApistatusService.APIURL + "GetSingleUserIDAndUsernameFromDB",
      {
        Username: inputUsername,
        Password: inputPassword
      } as UserResponse);

    request.subscribe((response) => {
      // if api returns null
      if (response === null) {
        console.log("null value was recieved")
        console.log("username or password not found.")

        this.ApistatusService.loading = false;
        this.ApistatusService.failed = true;
        setTimeout(() => {
          this.ApistatusService.failed = false;
        }, 500);
        setTimeout(() => {
          alert("The API has thrown an error while attempting to log in. \n"
            + "please check your username and password and try again.")
        }, 10);
      } else {
        // if api request successful. 
        // console.log(response)
        // console.log("response.UserID " + response.UserID)
        // console.log("response.Username " + response.Username)
        resultID = response.UserID;
        resultusername = response.Username
        console.log("resultID " + resultID)
        console.log("resultusername " + resultusername)

        this.ApistatusService.loading = false;
        this.ApistatusService.loaded = true;
        setTimeout(() => {
          this.ApistatusService.loaded = false;
        }, 500);

        // navigate
        this.navigateToShowList(resultID, resultusername);
      }
    },
      error => {
        console.error(error);
        this.ApistatusService.loading = false;
        this.ApistatusService.failed = true;
        setTimeout(() => {
          this.ApistatusService.failed = false;
        }, 500);
        alert("The API has thrown an error while attempting to log in. \n"
          + "please check your username and password and try again." + error)
      }
    );
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

    let request = this.httpClient.get<UserRequest[]>(this.ApistatusService.APIURL + "GetAllUsersFromDB");

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
        this.ApistatusService.loading = false;
        this.ApistatusService.failed = true;
        setTimeout(() => {
          this.ApistatusService.failed = false;
        }, 500);
        alert("The API has thrown an error while attempting to retrieve users. \n"
          + "please try again.")
      }
    );
  }

  addNewUser(passedNewUsername, passedNewPassword) {

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
    let usernameexists = false;

    this.UsersFromDB.forEach(user => {
      if (user.Username === passedNewUsername) {
        console.log(user.Username)
        usernameexists = true
      }
    });

    let newUsername: string = passedNewUsername;
    let newPassword: string = passedNewPassword;
    // console.log("newUserID " + newUserID)
    // console.log("newUsername " + newUsername)

    if (usernameexists === false) {

      // ======= API request ======== \\

      this.ApistatusService.loading = true;
      this.ApistatusService.loaded = false;

      let request2 = this.httpClient.post<UserResponse>(this.ApistatusService.APIURL + "CreateNewUser",
        {
          UserID: newUserID,
          Username: newUsername,
          Password: newPassword
        } as UserResponse);
      request2.subscribe(() => {

        console.log("new user added successfully: " + newUserID + newUsername + newPassword)
        this.ApistatusService.loading = false;
        this.ApistatusService.loaded = true;
        setTimeout(() => {
          this.ApistatusService.loaded = false;
        }, 500);

        setTimeout(() => {
          this.navigateToLogin()
        }, 1000);
      },
        error => {
          console.error(error);
          this.ApistatusService.loading = false;
          this.ApistatusService.failed = true;
          setTimeout(() => {
            alert("The API has thrown an error while attempting to register the new user \n"
              + "please try again.")
          }, 10);
          setTimeout(() => {
            this.ApistatusService.failed = false;
          }, 500);

        }
      );

    } else if (usernameexists === true) {
      console.log("the username already existed and was not added = " + passedNewUsername)
      alert("This username already exists. \n"
        + "please try another username.");
    }

  }

}









