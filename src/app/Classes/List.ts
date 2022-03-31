
import { ListItem } from './ListItem';

export class List {

  ListID: number;
  ListTitle: string;
  List: ListItem[] = [];
  isAddListItemsActive: boolean;
  isShowListActive: boolean;

  isShowListOptionsActive: boolean;
  ListColour: string;
  isListRenameActive: boolean;
  isShowListColourOptionsActive: boolean;

  constructor(_ListID: number, _ListTitle: string, _ListColour: string) {
    this.ListID = _ListID;
    this.ListTitle = _ListTitle;
    this.isAddListItemsActive = false;
    this.isShowListActive = true;

    this.isShowListOptionsActive = false;
    this.ListColour = _ListColour;
    this.isListRenameActive = false;
    this.isShowListColourOptionsActive = false;
  }

  setInputFocus() {
    document.getElementById("inputfield" + this.ListID).focus();
    (<HTMLInputElement>document.getElementById("inputfield" + this.ListID)).style.borderColor = this.ListColour;
  }

  showHideList() {
    // console.log("showhideitems clicked")
    if (this.isShowListActive === false) {
      this.isShowListActive = true;
      setTimeout(() => {
        document.getElementById("list-content-container" + this.ListID).className = "list-content-container";
      }, 450);
    } else {
      document.getElementById("list-content-container" + this.ListID).className = "list-content-container-close";
      document.getElementById("list-heading-arrow" + this.ListID).className = "list-heading-arrow-down-ani";
      this.isShowListOptionsActive = false;
      this.isShowListColourOptionsActive = false;
      this.isAddListItemsActive = false;
      setTimeout(() => {
        document.getElementById("list-heading-arrow" + this.ListID).className = "list-heading-arrow-down";
        this.isShowListActive = false;
      }, 450);
    }
  }

  showHideListOptions() {
    console.log("showhideitems clicked")
    if (this.isShowListOptionsActive === false) {
      this.isShowListOptionsActive = true;
      console.log(this.isShowListOptionsActive)
      document.getElementById("options-gear" + this.ListID).className = "list-heading-gear-open";
      setTimeout(() => {
        document.getElementById("options-gear" + this.ListID).className = "list-heading-gear";
      }, 510);
    } else {
      console.log(this.isShowListOptionsActive)
      document.getElementById("options-gear" + this.ListID).className = "list-heading-gear-close";
      document.getElementById("list-options-container" + this.ListID).className = "list-options-container-close";
      document.getElementById("list-options-button-ct" + this.ListID).className = "options-button-close";
      document.getElementById("list-options-button-rl" + this.ListID).className = "options-button-close";
      document.getElementById("list-options-button-ra" + this.ListID).className = "options-button-close";
      setTimeout(() => {
        this.isShowListOptionsActive = false;
        this.isShowListColourOptionsActive = false;
        this.isListRenameActive = false;
      }, 450);
      setTimeout(() => {
        document.getElementById("options-gear" + this.ListID).className = "list-heading-gear";
        this.isShowListOptionsActive = false;
      }, 600);
    }
  }

  showHideListColourOptions() {
    if (this.isShowListColourOptionsActive === false) {
      this.isShowListColourOptionsActive = true;

      // document.getElementById("options-gear" + this.ListID).className = "list-heading-gear-open";
      // setTimeout(() => {
      //   document.getElementById("options-gear" + this.ListID).className = "list-heading-gear";
      //   document.getElementById("list-options-container" + this.ListID).className = "list-options-container";
      // }, 510);
    } else {
      // console.log(this.isShowListOptionsActive)
      // document.getElementById("options-gear" + this.ListID).className = "list-heading-gear-close";
      // document.getElementById("list-options-container" + this.ListID).className = "list-options-container-close";
      // document.getElementById("list-options-button-ct" + this.ListID).className = "options-button-close";
      // document.getElementById("list-options-button-rn" + this.ListID).className = "options-button-close";
      // document.getElementById("list-options-button-ra" + this.ListID).className = "options-button-close";
      // setTimeout(() => {
        this.isShowListColourOptionsActive = false;
      // }, 450);
      // setTimeout(() => {
      //   document.getElementById("options-gear" + this.ListID).className = "list-heading-gear";
      // }, 600);
    }
  }

  applyListColourTheme(colour){

this.ListColour = colour

  }

  activateAddListItems() {
    console.log("activateAddListItems clicked")
    if (this.isAddListItemsActive === false) {
      this.isAddListItemsActive = true;
    } else {
      this.isAddListItemsActive = false;
    }
  }

  stopAddListItems() {
    console.log("stopAddListItems clicked")
    this.isAddListItemsActive = false;
  }

  addNewListItem() {
    if ((<HTMLInputElement>document.getElementById("inputfield" + this.ListID)).value === '') {
      console.log("no text detected")
    } else {
      // create a temporary array of available ID's and select the first available ID
      let newIDsAvailable: number[] = [];
      for (let i = 1; i < (this.List.length + 2); i++) {
        if (this.List.find((ListItem) => ListItem.ID === i)) {
          //do nothing
          console.log("the id " + i + " already exists and was not added")
        } else {
          newIDsAvailable.push(i)
          console.log("the available id " + i + " was added")
        }
      }
      let newListItemID: number = newIDsAvailable[0];
      // add the list item using that new ID and text from the input field
      let newListItemText = (<HTMLInputElement>document.getElementById("inputfield" + this.ListID)).value
      this.List.push(new ListItem(newListItemID, (newListItemText)));
      this.List.forEach(listitem => {
        console.log(listitem)
      });
      (<HTMLInputElement>document.getElementById("inputfield" + this.ListID)).value = '';
      (<HTMLInputElement>document.getElementById("inputfield" + this.ListID)).focus();
    }
  }
  
  renameThisList() {
    this.isListRenameActive = true;
    console.log(this.ListID);
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("list-heading-text" + this.ListID)).value = this.ListTitle;
      (<HTMLInputElement>document.getElementById("list-heading-text" + this.ListID)).focus();
    }, 0);
    }
  
    submitNewListTitle(ListID) {
      this.isListRenameActive = false;
      this.ListTitle = (<HTMLInputElement>document.getElementById("list-heading-text" + this.ListID)).value
      }


  deleteThisListItem(passedID) {
    let listItemToRemove = this.List.findIndex((ListItem) => ListItem.ID === passedID)
    console.log("remove ID " + passedID + " array index " + listItemToRemove + ": " + this.List[listItemToRemove].Text)
    this.List.splice(listItemToRemove, 1);
  }

  checkThisListItem(passedID) {
    console.log("checkThisListItem clicked")
    this.List.forEach(_listitem => {
      if (_listitem.ID === passedID) {
        if (_listitem.isChecked === false) {
          _listitem.isChecked = true;
        } else {
          _listitem.isChecked = false;
        }
      }
    })
  }


}

