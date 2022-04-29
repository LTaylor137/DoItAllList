
export class ListItem {
    ListItemID: number;
    Text: string;
    isChecked: boolean;

    constructor(
        _ListItemID: number, _Text: string, _isChecked: boolean
        ) 
         
         {
         this.ListItemID = _ListItemID;
         this.Text = _Text;
         this.isChecked = _isChecked;
         }

}

