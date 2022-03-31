import { Component } from '@angular/core';
import { ListService } from './Services/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoItAllList';

  constructor(public ListService: ListService) { }

ngOnInit(): void {
  console.log("initt1")

  this.ListService.populateList()
  this.ListService.populateColourThemes()
  this.ListService.changeListClass()

}

}
