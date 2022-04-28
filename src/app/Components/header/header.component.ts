import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/Services/list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public ListService: ListService) { }

  ngOnInit(): void {
  }

}
