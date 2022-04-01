import { Injectable } from '@angular/core';
import { List } from '../Classes/List';
import { ListItem } from '../Classes/ListItem';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  listOfLists: List[] = [];
  listOfColourThemes: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  populateList() {
    this.listOfLists.push(new List(1, "Shopping List", "var(--clr-heading-green)"))
    this.listOfLists.push(new List(2, "To Do List", "var(--clr-heading-blue)"))
    this.listOfLists.forEach(item => {
      if (item.ListID === 1) {
        item.List.push(new ListItem(1, "Apples"))
        item.List.push(new ListItem(2, "Milk"))
        item.List.push(new ListItem(3, "Cat Food"))
        item.List.forEach(item => {
          console.log(item)
        })

      }
    }
    )
    this.listOfLists.forEach(item => {
      if (item.ListID === 2) {

        item.List.push(new ListItem(1, "Do Tax"))
        item.List.push(new ListItem(2, "Wash Car"))
        item.List.push(new ListItem(3, "Go Shopping"))

        item.List.forEach(item => {
          console.log(item)
        })
      }
    }
    )
  }

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
      if (this.listOfLists.find((ListItem) => ListItem.ListID === i)) {
        //do nothing
        console.log("the id " + i + " already exists and was not added")
      } else {
        newIDsAvailable.push(i)
        console.log("the available id " + i + " was added")
      }
    }
    let newListItemID: number = newIDsAvailable[0];
    // get a random colour
    let randomColour: string = this.listOfColourThemes[Math.floor(Math.random() * this.listOfColourThemes.length)]
    // add the new List using that new ID
    this.listOfLists.push(new List(newListItemID, "New List", randomColour))
    // this.changeListClass();
    // this.listOfLists[newListItemID-1].showRenameListOption(1);
  }

  deleteThisList(listItemIndex) {
    console.log("deleting list = " + listItemIndex)
    this.listOfLists.splice(listItemIndex, 1)
  }

}







