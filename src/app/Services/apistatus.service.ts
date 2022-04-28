import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApistatusService {

  constructor() { }

  public loading: boolean = false;
  public loaded: boolean = false;

}
