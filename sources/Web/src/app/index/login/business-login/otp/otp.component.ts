import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndexService } from 'src/app/core/shared/index.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit,OnDestroy {
  private subs=new SubSink()
  mobile: any;
  timer:any;
  intervalId:any;
  mobileOtp:any='';
  isDisabled: boolean = false;
  mobileOTPMessage: boolean = false;
  otpFailMsg: string;


  constructor(private indexService:IndexService,private AuthService:AuthService,private routerNavigate:Router,private alert:NotificationService) { 
    this.mobile=sessionStorage.getItem("mobile")
  }
  ngOnInit() {
    clearInterval(this.intervalId);
    this.setTimer();
  }
  
  setTimer() {
    this.timer = 59
    var thisObj = this;
    this.intervalId = setInterval(function () {
      if (thisObj.timer > 0) {
        thisObj.timer = thisObj.timer - 1;
        if (thisObj.timer < 10) {
          thisObj.timer = "0" + thisObj.timer;
        }
        if (thisObj.timer == 0) {
          thisObj.isDisabled = true;
        }
      }
    }, 1000);
  }
  verifyOTPAndSubmit(otp){
    this.subs.sink=this.indexService.verifyOTP(otp,this.mobile).subscribe(res=>{
      if(res['status']==0){
            if(res['data']['status']==0){
              this.routerNavigate.navigate(['/home/application']);
            }
            else if(res['data']['status']==1){
              this.mobileOTPMessage = true;
              this.otpFailMsg = res['data']['message'];
              this.isDisabled=true
            var thisObj = this;
            thisObj.timer='00'
            clearInterval();
            }
          }
          else{
            this.alert.error(res['message'])
          }
        })
  }
  mobileResendLink() {
    this.mobileOTPMessage=false;
    this.mobileOtp='';
    this.isDisabled = false;
    clearInterval(this.intervalId);
    this.subs.sink = this.indexService.createOTP(this.mobile).subscribe(res => {
      if (res['status'] == 0) {
        if (res.data.status == 0) {
          this.setTimer();
        }
        if (res.data.status == 1) {
          clearInterval();
          this.otpFailMsg = res['data']['message']
        }
      }
      else {
        this.alert.error(res['message'])
      }
    });
  }
    ngOnDestroy(){
      this.subs.unsubscribe();
    }
}
