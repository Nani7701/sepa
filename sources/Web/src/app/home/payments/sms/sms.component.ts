import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/shared/home.service';
import { IndexService } from 'src/app/core/shared/index.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { SubSink } from 'subsink';
import { LocationStrategy } from '@angular/common';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  name: string;
  sendSmsForm: FormGroup;
  userData: any;
  userInfo: any;
  cuntrieslist: any;
  country_name: string;
  calling_code: number;

  private subs = new SubSink()
  timer: any;
  intervalId: any;
  isDisabled: boolean = true;
  sms: any;
  OtpError: string;
  combined: number;
  acc_type: string;
  existMobile: string;
  flag: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
              private hoemsService: HomeService, private indexService: IndexService,
              private alert: NotificationService, private router: Router, 
              private locationStrategy: LocationStrategy) {
  }

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.userInfo = this.userData.data.userInfo;
    this.acc_type = this.userInfo.account_type;
    this.route.queryParams.filter(params => params.name)
      .subscribe(params => {
        this.name = params.name;
    });

    this.sendSmsForm = this.fb.group({
      sms: ['', [Validators.required]]
    });

    this.getCuntries();
    clearInterval(this.intervalId);
    this.setTimer();
    this.createMobileOTP();
    this.preventBackButton();
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  verifyOTPAndSubmit(sms) {
    // this.flag = this.indexService.isVerified();
    // console.log(this.flag);
    // sessionStorage.setItem('smsVerify', this.flag); // setting flag to check weather SMS is verified or not
    this.subs.sink = this.indexService.verifyOTP(sms, this.combined).subscribe(res=>{
      if (res['status'] == 0) {
            if (res['data']['status'] == 0) {
              if(this.acc_type === 'Personal') {
                if (this.name === 'counterParty') {
                    this.router.navigateByUrl('/home/payments/add-counterparty');
                } else if (this.name === 'single') {
                    this.router.navigateByUrl('/home/payments/money-transfer');
                } else if (this.name === 'bulk') {
                    this.router.navigateByUrl("/home/payments/bulk-money-transfer");
                }
              } else if(this.acc_type === 'Business') {
                if (this.name === 'counterParty') {
                    this.router.navigateByUrl('/home/payments_tab/add-counterparty');
                } else if (this.name === 'single') {
                    this.router.navigateByUrl('/home/payments_tab/money-transfer');
                } else if (this.name === 'bulk') {
                    this.router.navigateByUrl("/home/payments_tab/bulk-money-transfer");
                }
              }
            }
            else if (res['data']['status'] == 1) {
             this.alert.error(res['data']['message']);
             this.OtpError = res['data']['message'];
            }
          }
          else {
            this.alert.error(res['message']);
          }
      });
  }

  getCuntries() {   // getCountryDetails
    this.hoemsService.getCountryDetails().subscribe(res => {
     if(res['status']==0) {
          if(res['data']['status'] == 1) {
        } else if(res['data']['status']==0) {
          this.cuntrieslist = res['data']['country list'];
          this.cuntrieslist.forEach(element => {
            if(element.country_id==this.userData['data']['userInfo']['country_id']){
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

  setTimer() {
    this.timer = 59
    var thisObj = this;
    this.intervalId = setInterval(function () {
      if(thisObj.timer > 0) {
          thisObj.timer = thisObj.timer - 1;
        if(thisObj.timer < 10) {
          thisObj.timer = "0" + thisObj.timer;
        }
        if(thisObj.timer == 0) {
          thisObj.isDisabled = false;
        }
      }
    }, 1000);
  }

  mobileResendLink() {
    this.isDisabled = true;
    this.subs.sink=this.indexService.createOTP(this.userInfo.mobile).subscribe(res=>{
      if(res['status']==0) {
        if(res['data']['status']==0) {
          this.setTimer();
        }
        else if(res['data']['status']==1) {
          this.alert.error(res['data']['message']);
        }
     }
     else {
       this.alert.error(res['message']);
     }
    });
  }

  createMobileOTP() {
    let obj = { 'userId': this.calling_code + this.userInfo.mobile, 'type': "Personal" }
    this.subs.sink = this.indexService.duplicateEmailMobile(obj).subscribe(res => {
      if (res['status'] === 0) {
        if (res['data']['status'] === 1) {
          this.existMobile = res['data']['message'];
        } else if (res['data']['status'] === 0) {
          this.subs.sink = this.indexService.createOTP(this.calling_code + this.userInfo.mobile).subscribe(res => {
            if (res['status'] === 0) {
              if (res['data']['status'] === 0) {
                this.existMobile = res['data']['message'];
              } if (res['data']['status'] === 3) {
                this.existMobile = res['data']['message'];
              } if (res.data.status === 4) {
                this.existMobile = res['data']['message'];
              } if (res['data']['status'] === 1) {
                this.existMobile = res['data']['message'];
              } else {
                this.existMobile = res['data']['message'];
              }
            } else {
              this.alert.error(res['message'])
            }
          });
        }
      } else {
        this.alert.error(res['message'])
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
