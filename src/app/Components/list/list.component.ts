import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ListService } from 'src/app/Services/list.service';
import { ListItem } from '../../Classes/ListItem';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  constructor(public ListService: ListService) { }

  ngOnInit(): void {

  }

}
