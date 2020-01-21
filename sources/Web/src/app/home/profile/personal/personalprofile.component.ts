/**
* Userprofile Component
* @package UserprofileComponent
* @subpackage app\home\personal\userprofile\UserprofileComponent
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { Component, OnInit, Input} from '@angular/core';
import { HomeService } from '../../../core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HomeComponent } from '../../home.component';

declare var $;

@Component({
  selector: 'user-profile',
  templateUrl: './personalprofile.component.html',
  styleUrls: ['./personalprofile.component.scss']
})
export class PersonalprofileComponent implements OnInit {
  ios:boolean;
  gplay:boolean;
  @Input()
  url: string = "";
  urlSafe: SafeResourceUrl;
  
  authToken: any;
  userData: any = [];
  smslinkBox: boolean = true;
  identId: any;
  KYCStatus: any;
  isIdentId:boolean=true;
  email: any;
  kycIframe:boolean=false;
  kycTargetURL:any;
  cuntrieslist: any=[];
  country_name: any;
  calling_code: any;
  constructor(private hoemsService: HomeService, private alert:NotificationService,public sanitizer: DomSanitizer,private loader: HomeComponent) {
  
    this.userData=JSON.parse(sessionStorage.getItem('userData'));
    this.getCuntries()
    this.KYCStatus= this.userData['data']['userInfo']['kycStatus'];
  }
  SubmitForKYC() {
    this.loader.apploader=true;
    if(sessionStorage.getItem('isCamera')=='no'){
      this.loader.apploader=false;
       this.alert.info("No camera available or Broswer support")
      // this.hoemsService.SubmitForKYC().subscribe(res=>{
      //    if(res['status']==0){
      //      if(res['data']['status']==1){
      //         this.isIdentId=false;
      //         this.identId =res['data']['id'];
      //         $("#kycpopup").modal('hide');
      //         $("#identId").modal('show');
      //         this.loader.apploader=false;
      //      }
      //     if(res['data']['status']==0){
      //       this.isIdentId=false;
      //       this.identId =res['data']['id'];
      //       $("#kycpopup").modal('hide');
      //       $("#identId").modal('show');
      //       this.loader.apploader=false;
      //    }
      //    }
      //    else{
      //      this.alert.error(res['message']);
      //      this.loader.apploader=false;
      //    }
      // })
    }
    if(sessionStorage.getItem('isCamera')=='yes'){
    this.hoemsService.SubmitForKYC().subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 0) {
        this.loader.apploader=false;
        this.kycIframe=true;
        this.identId =res['data']['id'];
         $("#myModal").modal('hide');
        $("#kycpopup").modal('show');
        this.url='https://go.idnow.de/app/sepacybertestauto1/identifications/'+this.identId+'/identification/auto-ident'
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }
       else if(res['data']['status']==1) {
          this.loader.apploader=false;
          this.kycIframe=true;
          this.identId =res['data']['id'];
          $("#kycpopup").modal('show');
          this.url='https://go.idnow.de/app/sepacybertestauto1/identifications/'+this.identId+'/identification/auto-ident'
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
    }
    else{
      this.alert.error(res['message']);
      this.loader.apploader=false;
    }
    })
  }
  }
  kycOption(){
    $("#myModal").modal('show');
  }
  webCamera(){
     this.SubmitForKYC();
  }
  getKYCStatus(){
    this.hoemsService.getKYCStatus().subscribe(res => {
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

  getCuntries(){
   // getCountryDetails
   this.hoemsService.getCountryDetails().subscribe(res => {
    if(res['status']==0){
    if (res['data']['status'] == 1) {
     //this.alert.error(res['data']['message'])
    } else if(res['data']['status']==0) {
      this.cuntrieslist=res['data']['country list'];
      this.cuntrieslist.forEach(element => {
        if(element.country_id==this.userData['data']['userInfo']['country_id']){
          this.userData['data']['userInfo']['country_id']
          this.country_name=element.country_name;
          this.calling_code = element.calling_code;
        }
      });
    }
  } else {
      this.alert.error(res['message'])
    }
  });
  }

  KYClinkToMobile(mobilePlatform) {
    this.hoemsService.SubmitForKYC().subscribe(res=>{
      if(res['status']==0){
        if (res['data']['status'] == 0) {
          this.linkToMobile(mobilePlatform)
        }
        else if(res['data']['status']==1){
          this.linkToMobile(mobilePlatform)
        }
      }
      else {
        this.alert.error(res['message'])
    }
    })
}
  linkToMobile(mobilePlatform){
     this.hoemsService.KYClinkToMobile(this.userData['data']['userInfo']['mobile'],this.userData['data']['userInfo']['email'], mobilePlatform, this.identId).subscribe(res => {
      if(res['status']==0){
       if(res['data']['status']==0){
         this.alert.success(res['data']['message'])
       }
      }
      else{
        this.alert.error(res['message'])
      }
    })
   }
  latestStatus(){
    this.smslinkBox = true;
    this.getKYCStatus();
  }
   
  ngOnInit() {
    $(document).ready(function(){
        $('#commingSoonPopup').modal({
      });
     });
  }
}
