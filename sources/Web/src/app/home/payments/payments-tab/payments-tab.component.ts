import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments-tab',
  templateUrl: './payments-tab.component.html',
  styleUrls: ['./payments-tab.component.scss']
})
export class PaymentsTabComponent implements OnInit {
  userData: any;
  accountType: any;

  constructor() { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.accountType = this.userData.data.userInfo.account_type
  }

  ngOnInit() {
  }

}
