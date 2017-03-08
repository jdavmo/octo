import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  public business: any;
  constructor() { }

  ngOnInit() {
  	this.business = [{"icon": "sim_card", "description": "The best of all the world", "name": "Nebrazka Cafe"}]
  }

}
