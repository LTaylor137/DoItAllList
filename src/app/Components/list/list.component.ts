import { Component, OnInit, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { ListService } from 'src/app/Services/list.service';
import { List } from 'src/app/Classes/List';
import { ListItem } from '../../Classes/ListItem';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ListItemRequest } from '../../models/ListItemRequestModel';
// import { DeleteListRequest } from '../../models/xxxxxxDeleteListRequestModel';
import { ListRequest } from '../../models/ListRequestModel';
// import { CreateListItemRequest } from '../../models/CreateListItemRequestModel';
import { ListItemfromDB } from '../../Classes/ListItemfromDB';
import { UserService } from '../../Services/user.service';
import { ApistatusService } from 'src/app/Services/apistatus.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public ListService: ListService, private router: Router, private httpClient: HttpClient, private UserService: UserService, public ApistatusService: ApistatusService) {
  }

  // @Input() List: List;

  refresh(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.ListService.populateList()
  }

  returnThisListIndex(thisListID) {
    let listIndex = this.ListService.listOfLists.findIndex(function (listObject) {
      return listObject.ListID === thisListID;
    });
    console.log("ListID = " + thisListID + " Index = " + listIndex)
    return listIndex;
  }

  showHideList(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    if (this.ListService.listOfLists[listIndex].isShowListActive === false) {
      this.ListService.listOfLists[listIndex].isShowListActive = true;

      setTimeout(() => {
        document.getElementById("list-content-container" + thisListID).className = "list-content-container";
      }, 450);
    } else {
      document.getElementById("list-content-container" + thisListID).className = "list-content-container-close";
      document.getElementById("list-heading-arrow" + thisListID).className = "list-heading-arrow-down-ani";
      document.getElementById("options-gear" + thisListID).className = "list-heading-gear-hide";
      this.ListService.listOfLists[listIndex].isShowListOptionsActive = false;
      this.ListService.listOfLists[listIndex].isShowListColourOptionsActive = false;
      this.ListService.listOfLists[listIndex].isListRenameActive = false;
      this.ListService.listOfLists[listIndex].isDeleteListOptionsActive = false;
      this.ListService.listOfLists[listIndex].isAddListItemsActive = false;
      setTimeout(() => {
        document.getElementById("list-heading-arrow" + thisListID).className = "list-heading-arrow-down";
        this.ListService.listOfLists[listIndex].isShowListActive = false;
      }, 450);
    }
  }

  showHideListOptions(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    console.log("showhideitems clicked")
    if (this.ListService.listOfLists[listIndex].isShowListOptionsActive === false) {
      this.ListService.listOfLists[listIndex].isShowListOptionsActive = true;
      document.getElementById("options-gear" + thisListID).className = "list-heading-gear-open";
      setTimeout(() => {
        document.getElementById("options-gear" + thisListID).className = "list-heading-gear";
      }, 510);
    } else {
      document.getElementById("options-gear" + thisListID).className = "list-heading-gear-close";
      document.getElementById("list-options-container" + thisListID).className = "list-options-container-close";
      if (this.ListService.listOfLists[listIndex].isShowListColourOptionsActive === true) {
        document.getElementById("list-colour-options-container" + thisListID).className = "list-options-container-close";
      }
      setTimeout(() => {
        this.ListService.listOfLists[listIndex].isShowListOptionsActive = false;
        this.ListService.listOfLists[listIndex].isShowListColourOptionsActive = false;
        this.ListService.listOfLists[listIndex].isListRenameActive = false;
        this.ListService.listOfLists[listIndex].isDeleteListOptionsActive = false;
        this.ListService.listOfLists[listIndex].isAddListItemsActive = false;
      }, 450);
      setTimeout(() => {
        document.getElementById("options-gear" + thisListID).className = "list-heading-gear";
      }, 500);
    }
  }

  showHideListColourOptions(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    if (this.ListService.listOfLists[listIndex].isShowListColourOptionsActive === false) {
      this.ListService.listOfLists[listIndex].isShowListColourOptionsActive = true;
    } else {
      document.getElementById("list-colour-options-container" + thisListID).className = "list-options-container-close";
      setTimeout(() => {
        this.ListService.listOfLists[listIndex].isShowListColourOptionsActive = false;
      }, 450);
    }
  }

  applyListColourTheme(thisListID, colour) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    // ======= API request ======== \\

    this.ApistatusService.loading = true;
    this.ApistatusService.loaded = false;

    let request = this.httpClient.put<ListRequest>("https://localhost:5001/DoItAllList/UpdateListColour",
      {
        UserID: this.UserService.userID,
        ListID: thisListID,
        ListTitle: 'notused',
        ListColour: colour
      } as ListRequest);
    request.subscribe(() => {
      // only if api request successful.
      this.ListService.listOfLists[listIndex].ListColour = colour

      this.ApistatusService.loading = false;
      this.ApistatusService.loaded = true;
      setTimeout(() => {
        this.ApistatusService.loaded = false;
      }, 500);

    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to update the list colour. \n"
          + "please try again.")
      }
    );
  }

  showRenameListOption(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    if (this.ListService.listOfLists[listIndex].isListRenameActive === false) {

      this.ListService.listOfLists[listIndex].isListRenameActive = true;
      console.log(thisListID);
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById("list-heading-text" + thisListID)).value = this.ListService.listOfLists[listIndex].ListTitle;
        (<HTMLInputElement>document.getElementById("list-heading-text" + thisListID)).focus();
      }, 0);
    } else {
      this.ListService.listOfLists[listIndex].isListRenameActive = false;
    }
  }

  submitNewListTitle(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)
    let newlisttitle = (<HTMLInputElement>document.getElementById("list-heading-text" + thisListID)).value

    // ======= API request ======== \\

    this.ApistatusService.loading = true;
    this.ApistatusService.loaded = false;

    let request = this.httpClient.put<ListRequest>("https://localhost:5001/DoItAllList/UpdateListTitle",
      {
        UserID: this.UserService.userID,
        ListID: thisListID,
        ListTitle: newlisttitle,
        ListColour: 'notused'
      } as ListRequest);
    request.subscribe(() => {
      // only if api request successful.
      this.ListService.listOfLists[listIndex].ListTitle = newlisttitle
      this.ListService.listOfLists[listIndex].isListRenameActive = false;

      this.ApistatusService.loading = false;
      this.ApistatusService.loaded = true;
      setTimeout(() => {
        this.ApistatusService.loaded = false;
      }, 500);

    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to update the list title. \n"
          + "please try again.")
      }
    );
  }

  showDeleteListOptions(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    if (this.ListService.listOfLists[listIndex].isDeleteListOptionsActive === false) {
      this.ListService.listOfLists[listIndex].isDeleteListOptionsActive = true;
    } else {
      this.ListService.listOfLists[listIndex].isDeleteListOptionsActive = false;
    }
  }

  deleteList(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    this.ListService.deleteThisList(thisListID, listIndex);
  }

  activateAddListItems(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    console.log("activateAddListItems clicked")
    if (this.ListService.listOfLists[listIndex].isAddListItemsActive === false) {
      this.ListService.listOfLists[listIndex].isAddListItemsActive = true;
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById("inputfield" + thisListID)).focus();
      }, 40)
    } else {
      this.ListService.listOfLists[listIndex].isAddListItemsActive = false;
    }
  }

  stopAddListItems(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    console.log("stopAddListItems clicked")
    this.ListService.listOfLists[listIndex].isAddListItemsActive = false;
  }

  addNewListItem(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    if ((<HTMLInputElement>document.getElementById("inputfield" + thisListID)).value === '') {
      console.log("no text detected")

    } else {
      // create a temporary array of available ID's and select the first available ID
      let newIDsAvailable: number[] = [];
      for (let i = 1; i < (this.ListService.listOfLists[listIndex].List.length + 2); i++) {
        if (this.ListService.listOfLists[listIndex].List.find((ListItem) => ListItem.ListItemID === i)) {
          //do nothing
          console.log("the id " + i + " already exists and was not added")
        } else {
          newIDsAvailable.push(i)
          console.log("the available id " + i + " was added")
        }
      }
      let newListItemID: number = newIDsAvailable[0];
      // add the list item using that new ID and text from the input field
      let newListItemText = (<HTMLInputElement>document.getElementById("inputfield" + thisListID)).value

      // ======= API request ======== \\

      this.ApistatusService.loading = true;
      this.ApistatusService.loaded = false;

      let request = this.httpClient.post<ListItemRequest>("https://localhost:5001/DoItAllList/PostListItemToDB",
        {
          UserID: this.UserService.userID,
          ListID: thisListID,
          ListItemID: newListItemID,
          Text: newListItemText
        } as ListItemRequest);
      request.subscribe(() => {
        // add the new List using that new ID, only if api request successful.
        this.ListService.listOfLists[listIndex].List.push(new ListItem(newListItemID, (newListItemText), false));
        this.ListService.listOfLists[listIndex].List.forEach(listitem => {
          console.log(listitem)

          this.ApistatusService.loading = false;
          this.ApistatusService.loaded = true;
          setTimeout(() => {
            this.ApistatusService.loaded = false;
          }, 500);

        });
        (<HTMLInputElement>document.getElementById("inputfield" + thisListID)).value = '';
        (<HTMLInputElement>document.getElementById("inputfield" + thisListID)).focus();
      },
        error => {
          console.error(error);
          alert("The API has thrown an error while attempting to create the list item \n"
            + "please try again.")
        }
      );

    }
  }

  setInputBorderColour(thisListID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    document.getElementById("inputfield" + thisListID).focus();
    (<HTMLInputElement>document.getElementById("inputfield" + thisListID)).style.borderColor = this.ListService.listOfLists[listIndex].ListColour;
  }


  checkThisListItem(thisListID, thisListItemID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    console.log("checkThisListItem clicked")
    this.ListService.listOfLists[listIndex].List.forEach(_listitem => {
      if (_listitem.ListItemID === thisListItemID) {
        if (_listitem.isChecked === false) {

          // ======= API request ======== \\

          this.ApistatusService.loading = true;
          this.ApistatusService.loaded = false;

          console.log(this.UserService.userID)
          console.log(thisListID)
          console.log(thisListItemID)

          let request = this.httpClient.put<ListItemRequest>("https://localhost:5001/DoItAllList/UpdateListItemChecked",
            {
              UserID: this.UserService.userID,
              ListID: thisListID,
              ListItemID: thisListItemID,
              isChecked: true
            } as ListItemRequest);
          request.subscribe(() => {
            // if successful, delete the list item from local list too.
            _listitem.isChecked = true;

            this.ApistatusService.loading = false;
            this.ApistatusService.loaded = true;
            setTimeout(() => {
              this.ApistatusService.loaded = false;
            }, 500);

          },
            error => {
              console.error(error);
              alert("The API has thrown an error while attempting to update the list item to checked \n"
                + "please try again.")
            }
          );

        } else {

          // ======= API request ======== \\

          this.ApistatusService.loading = true;
          this.ApistatusService.loaded = false;

          console.log(this.UserService.userID)
          console.log(thisListID)
          console.log(thisListItemID)

          let request = this.httpClient.put<ListItemRequest>("https://localhost:5001/DoItAllList/UpdateListItemChecked",
            {
              UserID: this.UserService.userID,
              ListID: thisListID,
              ListItemID: thisListItemID,
              isChecked: false
            } as ListItemRequest);
          request.subscribe(() => {
            // if successful, delete the list item from local list too.
            _listitem.isChecked = false;

            this.ApistatusService.loading = false;
            this.ApistatusService.loaded = true;
            setTimeout(() => {
              this.ApistatusService.loaded = false;
            }, 500);

          },
            error => {
              console.error(error);
              alert("The API has thrown an error while attempting to update the list item to checked \n"
                + "please try again.")
            }
          );

        }
      }
    })


    // 



  }

  deleteThisListItem(thisListID, thisListItemID) {

    // obtain the List Item Index that matches this List Item ID
    let listIndex = this.returnThisListIndex(thisListID)

    let listItemIndexToRemove = this.ListService.listOfLists[listIndex].List.findIndex((ListItem) => ListItem.ListItemID === thisListItemID)

    // ======= API request ======== \\

    this.ApistatusService.loading = true;
    this.ApistatusService.loaded = false;

    console.log(this.UserService.userID)
    console.log(thisListID)
    console.log(thisListItemID)

    let request = this.httpClient.put<ListItemRequest>("https://localhost:5001/DoItAllList/DeleteListItemFromDB",
      {
        UserID: this.UserService.userID,
        ListID: thisListID,
        ListItemID: thisListItemID
      } as ListItemRequest);
    request.subscribe(() => {
      // if successful, delete the list item from local list too.
      this.ListService.listOfLists[listIndex].List.splice(listItemIndexToRemove, 1);

      this.ApistatusService.loading = false;
      this.ApistatusService.loaded = true;
      setTimeout(() => {
        this.ApistatusService.loaded = false;
      }, 500);

    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to delete the list item \n"
          + "please try again.")
      }
    );

  }

}
