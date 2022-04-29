import { Component } from '@angular/core';
import { ListService } from './Services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoItAllList';

  constructor(public router: Router, public ListService: ListService) { }

ngOnInit(): void {
  console.log(" -- App Initialised -- ")
  // this.ListService.populateList() moved to list.component.ts
  this.ListService.populateColourThemes()
  // this.ListService.changeListClass() moved to list.component.ts
}



}
