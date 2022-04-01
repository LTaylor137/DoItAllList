
import { ListItem } from './ListItem';
// import { ListService } from '../Services/list.service';

export class List {

  ListID: number;
  ListTitle: string;
  List: ListItem[] = [];
  ListColour: string;

  isAddListItemsActive: boolean;
  isShowListActive: boolean;
  isShowListOptionsActive: boolean;
  isListRenameActive: boolean;
  isShowListColourOptionsActive: boolean;
  isDeleteListOptionsActive: boolean;

  constructor(_ListID: number, _ListTitle: string, _ListColour: string) {
    this.ListID = _ListID;
    this.ListTitle = _ListTitle;
    this.isAddListItemsActive = false;
    this.isShowListActive = true;

    this.isShowListOptionsActive = false;
    this.ListColour = _ListColour;
    this.isListRenameActive = false;
    this.isShowListColourOptionsActive = false;
    this.isDeleteListOptionsActive = false;
  }
  
}