
import { ListItem } from './ListItem';
// import { ListService } from '../Services/list.service';

export class UserFromDB {

  UserID: number;
  Username: string;

  constructor(_UserID: number, _Username: string) {
    this.UserID = _UserID;
    this.Username = _Username;
  }
  
}