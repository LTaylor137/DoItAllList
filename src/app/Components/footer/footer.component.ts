import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/Services/list.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public ListService: ListService) { }

  ngOnInit(): void {
  }

}
