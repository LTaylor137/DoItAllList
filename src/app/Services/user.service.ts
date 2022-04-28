import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { List } from '../Classes/List';
import { ListItem } from '../Classes/ListItem';
import { ListItemRequest } from '../models/ListItemRequestModel';
import { ListItemfromDB } from '../Classes/ListItemfromDB';


@Injectable({
  providedIn: 'root'
})

export class UserService {


  public userID: number = 1;
  public username: string = 'Lachlan';

  constructor(private router: Router, private httpClient: HttpClient) { }




  
}
