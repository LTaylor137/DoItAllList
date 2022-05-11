import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApistatusService {

  constructor() { }

  public loading: boolean = false;
  public loaded: boolean = false;
  public failed: boolean = false;

public APIURL: string = "https://localhost:5001/DoItAllList/"

// public APIURL: string = "http://dialapi6linux-env.eba-ee2hhybk.ap-southeast-2.elasticbeanstalk.com/DoItAllList/"

}
