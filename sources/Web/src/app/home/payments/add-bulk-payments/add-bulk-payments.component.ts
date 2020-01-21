import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-bulk-payments',
  templateUrl: './add-bulk-payments.component.html',
  styleUrls: ['./add-bulk-payments.component.scss']
})
export class AddBulkPaymentsComponent implements OnInit {
  CounterPartyList: any = [];
  selected: string;
  balance: any;
  selectedAcc: any;
  copyAcc: any;
  refText: any;
  referenceText: any;
  refText1: any;
  refText2: any;
  Ref: any;
  savedata = [];
  balData = [];
  total: any = [];
  totalbal: any = 0;
  counterdata: any = []
  searchText: any;
  userData: any;
  userInfo: any;
  accountType: any;
  editFormList: any;
  check_bal: any;

  constructor(public router: Router, private form: FormBuilder) { }

  ngOnInit() {  
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.accountType = this.userData.data.userInfo.account_type
    this.counterdata = JSON.parse(sessionStorage.getItem('UserListDetails'));
    this.CounterPartyList =this.counterdata.map(ele=>{
      if(ele.balance==undefined && ele.referenceText==undefined){
        ele.balance='',
        ele.referenceText=''
      }     
      return ele
    })
    this.editFormList = JSON.parse(sessionStorage.getItem('bulkPaymentList'));
  }

  getShortName(name: string) {
    return name.charAt(0).toUpperCase()
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  totalBalance(e) {
    this.totalbal = 0;
    this.CounterPartyList.forEach(ele => {
      this.check_bal = ele.balance != '';
      if (ele.balance != '') {
        this.totalbal = this.totalbal + parseInt(ele.balance);
      }
    });
    sessionStorage.setItem('TotalBalance', JSON.stringify(this.totalbal))
  }

  copyObject(counterParty) {
    this.copyAcc = this.CounterPartyList.filter((item) => item.counterparty_id == counterParty.counterparty_id);
    let obj = {
      account_no: this.copyAcc[0].account_no,
      counterparty_id: this.copyAcc[0].counterparty_id,
      country_name: this.copyAcc[0].country_name,
      currency: this.copyAcc[0].currency,
      email: this.copyAcc[0].email,
      full_name: this.copyAcc[0].full_name,
      mobile: this.copyAcc[0].mobile,
      referenceText: '',
      balance: 0
    }
    this.CounterPartyList.push(obj)
  }
  removeObject(counterParty) {
    this.copyAcc = this.CounterPartyList.filter((item) => item.counterparty_id == counterParty.counterparty_id);
    this.CounterPartyList.pop(this.copyAcc[0])
  }
  continue(counterParty) {
    sessionStorage.setItem('userDataList', JSON.stringify(this.CounterPartyList));
    this.router.navigate(['/home/payments_tab/bulk_transfer']);
  }
  onSubmit() {
    alert(this.referenceText)
  }
}
