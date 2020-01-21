import { HomeService } from './../../../../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import {SubSink} from 'subsink'
import { HomeComponent } from 'src/app/home/home.component';

declare var $:any;

@Component({
  selector: 'app-getaccounts',
  templateUrl: './getaccounts.component.html',
  styleUrls: ['./getaccounts.component.scss']
})
export class GetaccountsComponent implements OnInit {
  currencyData: any;
  profileData: any;
  country_name: any;
  obj: any;
  accountData: any;
  country_id_currency: any;
  layout: boolean=true;
  initialPayment:any;
  cardData:any;
  search_accounts:any;
  search_currencies:any;
  listActive: boolean=false;
  gridActive: boolean=true;
  public unsubscribe$=new SubSink();


  constructor(private homeService: HomeService, private fb: FormBuilder,private router:Router,private alert: NotificationService,private loader:HomeComponent) { 
    this.profileData=JSON.parse(sessionStorage.getItem('userData'));
    this.getAccounts();
    this.getInitialPayment();
  }
  statusCurrency() {
    this.homeService.getAccountsCurrency().subscribe(res => {
      if(res['status']==0){
        if(res['data']['status']==0){
        this.currencyData = res['data']['currency'];
        } else if(res['data']['status']==1){
          this.alert.error(res['data']['message']); 
        }
       } else if(res['status']==1){
        this.alert.error(res['message']);
      }
    });
  }
  listView(){
    this.listActive=true
    this.gridActive=false;
    this.layout=false;
  }
  gridView(){
    this.gridActive=true;
    this.listActive=false
    this.layout=true;
  }
  save_outage_item(item){
  this.country_id_currency=item.country_id;
  this.country_name=item.currency;

   this.obj={
  "applicantId":this.profileData.data.userInfo.applicant_id,
	"currency":item.currency,
	"status": true,
	"role":1,
	"balance":0
   }
  }
  createAccount(){
    this.homeService.createAccount(this.obj).subscribe(res => {
      if(res['status']==0){
        if(res['data']['status']==0){
        this.alert.success(res['data']['message'])
        this.getAccounts();
        } else if(res['data']['status']==1){
          this.alert.warn(res['data']['message']);
        }
       } else {
        this.alert.error(res['message'])
      }
    });
  }
  getAccounts(){
    this.loader.apploader=true;
    this.homeService.getAccounts().subscribe(res => {
      if(res['status']==0){
        if(res['data']['status']==0){
        this.accountData = res['data']['account'];
        this.loader.apploader=false;
        } else if(res['data']['status']==1){
          this.loader.apploader=false;
        }
       }else{
        this.loader.apploader=false;
        this.alert.error(res['message'])
      }
    });
  }
  deactivateAccount(item){
   var obj={
      "status":0,
      "currency":item.currency,
  }
  this.homeService.ActiveDeactiveacocunt(obj).subscribe(res => {
if(res['status']==0){
  if(res['data']['status']==0){
    this.alert.success(res['data']['message']);
    this.getAccounts();
  }
  else if(res['data']['status']==1){
    this.alert.error(res['data']['message']);
  }
}
else{
  this.alert.error(res['message']);
}
  });
}
activateAccount(item){
  var obj={
     "status":1,
     "currency":item.currency,
     "applicantId":this.profileData.data.userInfo.applicant_id,
 }
 this.homeService.ActiveDeactiveacocunt(obj).subscribe(res => {
  if(res['status']=1){
   this.alert.success(res['data']['message']);
    this.getAccounts();
  }
  else{
    this.alert.error("Failed")
  }
});
}

addMoney() {
  $('#add_money').modal('hide');

  if (this.cardData == null) {
    if(this.profileData.data.userInfo.account_type == 'Business'){
      this.router.navigate(['home/business-add-money']);
    } else {
        this.router.navigate(['home/add-money']);
      }
    }
    else {
      this.router.navigate(['home/add-money', this.cardData]);
    }
}

skip() {
  this.profileData.data.userInfo.initialPayment=false;
  sessionStorage.setItem('userData', JSON.stringify(this.profileData));
  $('#add_money').modal('hide');
}

getInitialPayment() {
  this.initialPayment = this.profileData.data.userInfo.initialPayment;
  if (this.initialPayment == true) {
    $('#add_money').modal('show');
  }
}

  ngOnInit() {
    this.getInitialPayment();
  $(".search_open").click(function(){
        $(".srch_cnt").toggleClass("active");
  });
  }
  ngOnDestroy(){
    this.unsubscribe$.unsubscribe();

  }


}