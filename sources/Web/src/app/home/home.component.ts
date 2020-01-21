
/**
* Home Component
* its contain logout actin of the application and router-routet of the child components (home module)
* @package HomeComponent
* @subpackage app\home\HomeComponent
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { HomeService } from './../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/shared/auth.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { NotificationService } from '../core/toastr-notification/toastr-notification.service';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  apploader:boolean=false;
  userData: any;
  firstName: any;
  lastName: any;
  KYCStatus: any;
  accountType: any;
  public loading=true;
  accountActive:boolean;
  paymentActive: boolean;
  isDisabled:boolean=false;
   
  constructor(public authService: AuthService, private alert:NotificationService, private homeService:HomeService, private routerNavigate: Router,private bnIdle: BnNgIdleService) { 
   
   
    this.userData=JSON.parse(sessionStorage.getItem('userData'));
    this.KYCStatus= this.userData['data']['userInfo']['kycStatus']
    this.firstName= this.userData['data']['userInfo']['first_name']
    this.lastName= this.userData['data']['userInfo']['last_name']
    sessionStorage.setItem('x-auth-token',this.userData['data']['x-auth-token']);
   
this.industryStatus()

  }

  verifyStatus(){
    this.homeService.verifyStatus().subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 1) {
       this.alert.error(res['data']['message'])
      } else if(res['data']['status']==0) {
        this.KYCStatus=res['data']['kyc_status'];
      }
    }
    else{
      this.alert.error(res['message'])
    }
    })
  }

  logoutAction() {
    if (this.userData.data.userInfo.account_type == 'Personal') {
      if (this.authService.logOutAction()) {
        this.routerNavigate.navigate([''])
      }
    }
    else if (this.userData.data.userInfo.account_type == 'Business') {
      if (this.authService.logOutAction()) {
        this.routerNavigate.navigate([''])
      }
    }
    else if (this.userData.data.userInfo.account_type == 'sandbox') {
      if (this.authService.logOutAction()) {
        this.routerNavigate.navigate([''])
      }
    }

  }

  industryStatus() {
    this.homeService.industryStatus().subscribe(res => {
      if(res['status']==0){
      if(res['data']['status']==0){
        if(res['data']['Dashboard Status']['isRestricted']==1){
        this.isDisabled=true;
         // this.application.industrStatus=res['data']['Dashboard Status']['isRestricted'];

       
        }
      }
      // else if(res['data']['status']==1){
      //   this.alert.error(res['data']['message'])
      // }
     }
    //  else{
    //    this.alert.error(res['message'])
    //  }
   });
 }

  ngOnInit() {
    $(document).ready(function () {
      $(".bars_cnt").click(function () {
        $(".left_nav").toggleClass("active");
        $(".nav_backdrop").toggleClass("active");
      });
      $(".close_btn").click(function () {
        $(".left_nav").toggleClass("active");
        $(".nav_backdrop").toggleClass("active");
      });
    });
  }
  
  payments() {
    this.routerNavigate.navigateByUrl('/home/payments');
  }

}
