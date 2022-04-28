import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { List } from '../Classes/List';
import { ListItem } from '../Classes/ListItem';
import { ListItemRequest } from '../models/ListItemRequestModel';
import { DeleteListRequest } from '../models/DeleteListRequestModel';
import { ListRequest } from '../models/ListRequestModel';
import { ListItemfromDB } from '../Classes/ListItemfromDB';
import { UserService } from './user.service';
import { ApistatusService } from './apistatus.service';



@Injectable({
  providedIn: 'root'
})

export class ListService {

  listOfLists: List[] = [];
  listOfColourThemes: string[] = [];

  listItemsFromDB: ListItemfromDB[] = [];
  // listOfLists: List[] = [];

  ListItem: ListItemRequest[] = [];

  constructor(private router: Router, private httpClient: HttpClient, private UserService: UserService, private ApistatusService: ApistatusService) { }

  ngOnInit(): void {
  }

  populateList() {

    // ======= API request ======== \\

    this.ApistatusService.loading = true;
    this.ApistatusService.loaded = false;

    let request = this.httpClient.get<ListItemRequest[]>("https://localhost:5001/DoItAllList/GetAllListItemsAndEmptyListsFromDBOfUser?id=" + this.UserService.userID + "");

    request.subscribe((response) => {

      console.log(response)

      response.forEach(element => {
        this.listItemsFromDB.push(element);
      });

      console.log(this.listItemsFromDB)

      // add list items into their own lists sorted by list ID.
      this.listItemsFromDB.forEach(ListElement => {

        console.log("List ID = " + ListElement.ListID)

        // https://bobbyhadz.com/blog/typescript-array-contains?msclkid=6036ecf6c51d11eca35a29dc0923ec37

        const found = this.listOfLists.find((obj) => {
          return obj.ListID === ListElement.ListID;
        });

        // console.log(found);

        if (found !== undefined) {
          console.log('⛔️ the object is contained in the array already, so it not added');

          // push list items to existing list instead.
          this.listOfLists.forEach(ListItemElementA => {
            if (ListItemElementA.ListID === found.ListID) {
              ListItemElementA.List.push(new ListItem(ListElement.ListItemID, ListElement.Text))
            }
          });

        } else {
          console.log('✅ the object is NOT contained in the array, so is added to listOfLists');

          this.listOfLists.push(new List(ListElement.ListID, ListElement.ListTitle, ListElement.ListColour))

          // push list items to list that was just created.
          this.listOfLists.forEach(ListItemElementB => {
            if (ListItemElementB.ListID === ListElement.ListID) {
              if (ListElement.Text === '') {
                console.log("null value found.")
              } else {
                ListItemElementB.List.push(new ListItem(ListElement.ListItemID, ListElement.Text))
              }
            }
          });

        }

      });

      console.log(this.listOfLists)

      this.ApistatusService.loading = false;
      this.ApistatusService.loaded = true;
      setTimeout(() => {
        this.ApistatusService.loaded = false;
      }, 500);

    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to fetch the list. \n"
          + "please try again.")
      }
    );

  }

  // console.log(ListItem)

  // this.listOfLists.push(new List(1, "Shopping List", "var(--clr-heading-green)"))
  // this.listOfLists.push(new List(2, "To Do List", "var(--clr-heading-blue)"))
  // this.listOfLists.forEach(item => {
  //   if (item.ListID === 1) {
  //     item.List.push(new ListItem(1, "Apples"))
  //     item.List.push(new ListItem(2, "Milk"))
  //     item.List.push(new ListItem(3, "Cat Food"))
  //     item.List.forEach(item => {
  //       console.log(item)
  //     })

  //   }
  // }
  // )
  // this.listOfLists.forEach(item => {
  //   if (item.ListID === 2) {

  //     item.List.push(new ListItem(1, "Do Tax"))
  //     item.List.push(new ListItem(2, "Wash Car"))
  //     item.List.push(new ListItem(3, "Go Shopping"))

  //     item.List.forEach(item => {
  //       console.log(item)
  //     })
  //   }
  // }
  // )


  // populateListlcl() {
  //   this.listOfLists.push(new List(1, "Shopping List", "var(--clr-heading-green)"))
  //   this.listOfLists.push(new List(2, "To Do List", "var(--clr-heading-blue)"))
  //   this.listOfLists.forEach(item => {
  //     if (item.ListID === 1) {
  //       item.List.push(new ListItem(1, "Apples"))
  //       item.List.push(new ListItem(2, "Milk"))
  //       item.List.push(new ListItem(3, "Cat Food"))
  //       item.List.forEach(item => {
  //         console.log(item)
  //       })

  //     }
  //   }
  //   )
  //   this.listOfLists.forEach(item => {
  //     if (item.ListID === 2) {

  //       item.List.push(new ListItem(1, "Do Tax"))
  //       item.List.push(new ListItem(2, "Wash Car"))
  //       item.List.push(new ListItem(3, "Go Shopping"))

  //       item.List.forEach(item => {
  //         console.log(item)
  //       })
  //     }
  //   }
  //   )
  // }

  populateColourThemes() {
    this.listOfColourThemes.push(
      "var(--clr-heading-green)",
      "var(--clr-heading-teal)",
      "var(--clr-heading-blue)",
      "var(--clr-heading-purple)",
      "var(--clr-heading-pink)",
      "var(--clr-heading-red)",
      "var(--clr-heading-orange)",
      "var(--clr-heading-yellow)"
    )
  }

  // a quick hack to change list container style to non-animated version on initial load.
  changeListClass() {
    setTimeout(() => {
      this.listOfLists.forEach(List => {
        document.getElementById("list-content-container" + List.ListID).className = "list-content-container";
        console.log(List.ListID + " updated")
      }, 500);
    });
  }

  createNewList() {

    // create a temporary array of available ID's and select the first available ID
    let newIDsAvailable: number[] = [];
    for (let i = 1; i < (this.listOfLists.length + 2); i++) {
      if (this.listOfLists.find((List) => List.ListID === i)) {
        //do nothing
        console.log("the id " + i + " already exists and was not added")
      } else {
        newIDsAvailable.push(i)
        console.log("the available id " + i + " was added")
      }
    }
    let newListID: number = newIDsAvailable[0];
    // get a random colour
    let randomColour: string = this.listOfColourThemes[Math.floor(Math.random() * this.listOfColourThemes.length)]

    // ======= API request ======== \\

    let request = this.httpClient.post<ListRequest>("https://localhost:5001/DoItAllList/CreateNewList",
      {
        UserID: this.UserService.userID,
        ListID: newListID,
        ListTitle: 'New List',
        ListColour: randomColour
      } as ListRequest);
    request.subscribe(() => {
      // add the new List using that new ID, only if api request successful.
      this.listOfLists.push(new List(newListID, "New List", randomColour))
    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to create the new list. \n"
          + "please try again.")
      }
    );

    // this.apistatus.loading = true;
    //   this.ApistatusService.loaded = false;
  }



  deleteThisList(thisListID, listIndex) {

    // ======= API request ======== \\

    let request = this.httpClient.put<ListRequest>("https://localhost:5001/DoItAllList/DeleteListFromDB",
      {
        UserID: this.UserService.userID,
        ListID: thisListID
        // this.apistatus.loading = true;
        //   this.ApistatusService.loaded = false;
      } as ListRequest);
    request.subscribe(() => {
      console.log("deleting list at index = " + listIndex)
      this.listOfLists.splice(listIndex, 1)
      // this.apistatus.loading = false;
      //   this.ApistatusService.loaded = true;
    },
      error => {
        console.error(error);
        alert("The API has thrown an error while attempting to delete the list \n"
          + "please try again.")
      }
    );

  }



}





