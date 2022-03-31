
export class ListItem {
    ID: number;
    Text: string;
    isChecked: boolean;

    constructor(
        _ID: number, _Text: string
        ) 
         
         {
         this.ID = _ID;
         this.Text = _Text;
         this.isChecked = false;
         }

}

