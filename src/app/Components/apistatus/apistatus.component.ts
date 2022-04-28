import { Component, OnInit } from '@angular/core';
import { ApistatusService } from 'src/app/Services/apistatus.service';

@Component({
  selector: 'app-apistatus',
  templateUrl: './apistatus.component.html',
  styleUrls: ['./apistatus.component.css']
})
export class ApistatusComponent implements OnInit {

  constructor(public ApistatusService: ApistatusService) { }

  ngOnInit(): void {
  }

}
