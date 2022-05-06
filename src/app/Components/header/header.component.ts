import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/Services/list.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogoutOptionShowing: boolean = false;

  constructor(public ListService: ListService, public UserService: UserService) { }

  ngOnInit(): void {
  }


  // showHideLogoutOption(){
  //   if (this.isLogoutOptionShowing === false) {
  //     this.isLogoutOptionShowing = true;
  //   } else if (this.isLogoutOptionShowing === true) {
  //     this.isLogoutOptionShowing = false;
  //   }
  // }

  navigateToUserSelect()
  {
this.UserService.navigateToUserSelect()
  }

}
