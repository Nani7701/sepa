import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/shared/home.service';
import { IndexService } from 'src/app/core/shared/index.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bulkpayments',
  templateUrl: './bulkpayments.component.html',
  styleUrls: ['./bulkpayments.component.scss']
})
export class BulkpaymentsComponent implements OnInit {
  dropdown: any;
  cuntrieslist: any;
  userData: any;
  country_name: any;
  calling_code: any;
  combined: any;
  userInfo: any;
  private subs = new SubSink();
  existMobile: any;
  counterParties: any;
  detail: any;
  acc_type: any;
  selected: any;
  checkedList = [];
  selectedRow: any;
  searchText: any;

  constructor(private router:Router,private homeService: HomeService, private indexService: IndexService, private alert: NotificationService) { }

  ngOnInit() {
    this.getCountriesList()
    this.getCuntries();
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.userInfo = this.userData.data.userInfo;
    this.acc_type = this.userInfo.account_type;
    this.searchText;

  }
  
  continue(counterParty) {
    this.createMobileOTP();
    sessionStorage.setItem('UserListDetails', JSON.stringify(this.selected));
    if(this.acc_type === 'Personal') {
      this.router.navigate(['/home/payments/sms'], { queryParams: { name: 'bulk' } });
    } else if(this.acc_type === 'Business'){
      this.router.navigate(['/home/payments_tab/sms'], { queryParams: { name: 'bulk' } });
    }
  }
  
  getCountriesList() {
    this.homeService.getCounterParty().subscribe(res => {
      if(res['status']==0){     
        this.counterParties = res['data'].results;  
        this.counterParties =this.counterParties.map(ele=> {
          ele.selectORunselect=false;
          return ele;
        }) 
       } else if(res['status']==1){
        this.alert.error(res['message']);
      }
    });
  }
  getShortName(name: string) { 
    return name.charAt(0).toUpperCase()
  }
  getCuntries(){
    this.homeService.getCountryDetails().subscribe(res => {
     if(res['status']==0) {
          if (res['data']['status'] == 1) {
        } else if(res['data']['status']==0) {
          this.cuntrieslist = res['data']['country list'];
          this.cuntrieslist.forEach(element => {
            if(element.country_id == this.userData['data']['userInfo']['country_id']){
              this.userData['data']['userInfo']['country_id']
              this.country_name = element.country_name;
              this.calling_code = element.calling_code;
              this.combined = this.calling_code + this.userInfo.mobile;
            }
          });
        }
      } 
    });
  }

  onCheckboxChange(counterParty, event,index) {
      if(event.target.checked) {        
        this.checkedList.push(counterParty);
      } else {
        this.checkedList.splice(index,1);
      }
  }

  next() {    
    this.createMobileOTP();
    sessionStorage.setItem('UserListDetails', JSON.stringify(this.checkedList));
    if(this.acc_type === 'Personal') {
      this.router.navigate(['/home/payments/sms'], { queryParams: { name: 'bulk' } });
    } else if(this.acc_type === 'Business'){
      this.router.navigate(['/home/payments_tab/sms'], { queryParams: { name: 'bulk' } });
    }
  }

  sendUserListDetails(counterParty,index) {
     counterParty.selectORunselect=!counterParty.selectORunselect;
     if(counterParty.selectORunselect) {
      this.checkedList.push(counterParty);
    } else {
    this.checkedList= this.checkedList.filter(ele => ele.counterparty_id!=counterParty.counterparty_id);
    }
  }

  createMobileOTP() {
    let obj = { 'userId': this.calling_code + this.userInfo.mobile, 'type': "Personal" }
    this.subs.sink = this.indexService.duplicateEmailMobile(obj).subscribe(res => {
      if (res['status'] == 0) {
        if (res['data']['status'] == 1) {
          this.existMobile = res['data']['message'];
        }
        else if (res['data']['status'] == 0) {
          this.subs.sink = this.indexService.createOTP(this.calling_code + this.userInfo.mobile).subscribe(res => {
            if (res['status'] == 0) {
              if (res['data']['status'] == 0) {
                this.existMobile = res['data']['message'];
              }
              if (res['data']['status'] == 3) {
                this.existMobile = res['data']['message'];
              }
              if (res.data.status == 4) {
                this.existMobile = res['data']['message'];
              }
              if (res['data']['status'] == 1) {
                this.existMobile = res['data']['message'];
              }
              else {
                this.existMobile = res['data']['message'];
              }
            }
            else {
              this.alert.error(res['message'])
            }
          });
        }
      }
      else {
        this.alert.error(res['message'])
      }
    });
  }
}
