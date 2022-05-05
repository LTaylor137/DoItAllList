
export class ListItemfromDB {

    ListID: number;
    ListTitle: string;
    ListColour: string;
    ListItemID: number;
    Text: string;
    isChecked: boolean;

    constructor(
        _ListID: number,
        _ListTitle: string,
        _ListColour: string,
        _ListItemID: number,
        _Text: string,
        _isChecked: boolean
    ) {
        this.ListID = _ListID;
        this.ListTitle = _ListTitle;
        this.ListColour = _ListColour;
        this.ListItemID = _ListItemID;
        this.Text = _Text;
        this.isChecked = _isChecked;
    }

}

