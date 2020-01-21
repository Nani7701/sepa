
/**
* Dashboard Component
* KYC status, KYC verification process, user profile
* @package BusdashboardComponent
* @subpackage app\home\personal\business-dashboard\busdashboard.component.html
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { HomeService } from '../../../../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { ApplicationsComponent } from '../applications.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HomeComponent } from 'src/app/home/home.component';
declare var $: any;

@Component({
  selector: 'app-personalprofile',
  templateUrl: './personalprofile.component.html',
  styleUrls: ['./personalprofile.component.scss']
})
export class PersonalprofileComponent implements OnInit {
  countryData: any;
  profileData: any;
  kycTemplate: boolean = false;
  updateContactDetails: boolean = true;
  updateContactForm: FormGroup; 
  maxDOB: any;
  contact_mobile: any;
  updateContactAddress: boolean = false;
  validDOB: boolean = false; 
  selectedCountryId: any;
  personalAddress1: FormGroup; 

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


  constructor(private fb: FormBuilder, private homeService: HomeService, private alert: NotificationService, private routerNavigate: Router,private application: ApplicationsComponent,public sanitizer: DomSanitizer,private loader: HomeComponent) {
    this.profileData = JSON.parse(sessionStorage.getItem('userData')); 
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    var obj = [date.getFullYear(), mnth, day].join("-");
    this.maxDOB = obj;
    this.application.loadContent=false;
    this.getCountryDetails();


  }
  getCountryDetails() {  
    this.homeService.getCountryDetails().subscribe(res => {
      if (res['status'] == 0) {
        this.countryData = res['data']['country list'];
        this.Bus_SubmitForKYC();
      }
      else {
        this.alert.error(res['message'])
      }
    });
  }
  dobValidation($event) { 
    var dt = new Date();
    var yr = dt.getFullYear();
    var selectedYr = $event.target.value;
    if (selectedYr <= this.maxDOB) {
      this.validDOB = false;
    }
    else {
      this.validDOB = true;
    }
  }
  
  getUpdatedStatus(col, status) {
    let obj = {
      "column": col,
      "status": status
    }
    this.homeService.getUpdatedStatus(obj).subscribe(res => {
      if (res['status'] == 0) {
        if (res['data']['status'] == 0) {
          $("#identId").modal('hide');
          this.application.loadContent=true;
          this.application.getKYBStatus();
          this.routerNavigate.navigate(['/home/application']);
        }
        else if (res['data']['status'] == 1) {
          this.alert.error(res['data']['message'])
        }
      }
      else {
        this.alert.error(res['message'])
      }
    });
  }

  Bus_SubmitForKYC() {
    this.contact_mobile = this.profileData['data']['userInfo']['mobile'];
    var country_id = this.profileData['data']['userInfo']['country_id'];
    for (var i = 0; i < this.countryData.length; i++) {
      if (country_id == this.countryData[i]['country_id']) {
        this.updateContactForm.patchValue({
          calling_code: this.countryData[i]['calling_code']
        })
        this.personalAddress1.patchValue({
          country_id: this.countryData[i]['country_id']
        })
      }
    }
    }

  updateAddrDetails(formData: any) { 
    const copiedObj = Object.assign({}, formData);
    copiedObj.mobile = copiedObj.calling_code + copiedObj.mobile;
    delete copiedObj["calling_code"];
    this.homeService.updateContact(copiedObj).subscribe(res => {
      if (res['status'] == 0) {
        if (res['data']['status'] == 0) {
          this.alert.success(res['data']['message']);
          this.updateContactAddress = true;
          this.updateContactDetails = false
        }
        else if (res['data']['status'] == 1) {
          this.alert.error(res['data']['message']);
        }
      }
      else {
        this.alert.error(res['message'])
      }
    })
  }
  submitAddr(formData: any) {
    formData.address_type_id = 1;
    formData.account_type ='personal'
    this.homeService.submitAddr(formData).subscribe(res => {
      if (res['status'] == 0) {
        if (res['data']['status'] == 0) {
          this.alert.success(res['data']['message']);
         // this.getUpdatedStatus('personal_profile', 1);
          this.SubmitForKYC()
        }
        else if (res['data']['status'] == 1) {
          this.alert.error(res['data']['message']);
        }
      }
      else {
        this.alert.error(res['message'])
      }
    });
  }
  SubmitForKYC() {
    this.loader.apploader=true;
    if(sessionStorage.getItem('isCamera')=='no'){
      this.homeService.SubmitForKYC().subscribe(res=>{
         if(res['status']==0){
           if(res['data']['status']==1){
              this.isIdentId=false;
              this.identId =res['data']['id'];
              $("#kycpopup").modal('hide');
              $("#identId").modal('show');
              this.loader.apploader=false;
           }
          if(res['data']['status']==0){
            this.isIdentId=false;
            this.identId =res['data']['id'];
            $("#kycpopup").modal('hide');
            $("#identId").modal('show');
            this.loader.apploader=false;
         }
         }
         else{
           this.alert.error(res['message']);
           this.loader.apploader=false;
         }
      })
    }
   else if(sessionStorage.getItem('isCamera')=='yes'){
    this.homeService.SubmitForKYC().subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 0) {
        this.loader.apploader=false;
        this.kycIframe=true;
        this.identId =res['data']['id'];
        $("#identId").modal('hide');
        $("#kycpopup").modal('show');
        this.url='https://go.idnow.de/app/sepacybertestauto1/identifications/'+this.identId+'/identification/start'
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }
       else if(res['data']['status']==1) {
        this.loader.apploader=false;
          this.kycIframe=true;
          this.identId =res['data']['id'];
          $("#identId").modal('hide');
          $("#kycpopup").modal('show');
          this.url='https://go.idnow.de/app/sepacybertestauto1/identifications/'+this.identId+'/identification/start'
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
  verifyStatus(){
    this.homeService.verifyStatus().subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 1) {
       this.alert.error(res['data']['message'])
      } else if(res['data']['status']==0) {
        this.KYCStatus=res['data']['kyc_status'];
        this.application.getKYBStatus();
        this.application.loadContent=true;
        this.routerNavigate.navigate(['/home/application']);
      }
    }
    else{
      this.alert.error(res['message'])
    }
    })
  }
  KYClinkToMobile(mobilePlatform) {
    this.homeService.KYClinkToMobile(this.profileData['data']['userInfo']['mobile'],this.profileData['data']['userInfo']['email'], mobilePlatform, this.identId).subscribe(res => {
      if(res['status']==0){
       if(res['data']['status']==0){
        this.getUpdatedStatus('personal_profile', 1);
         this.smslinkBox = false;
         this.alert.success(res['data']['message'])
       }
       else if(res['data']['status']==1){
        this.smslinkBox = false;
       }
      }
      else{
        this.smslinkBox = false;
        this.alert.error(res['message'])
      }
    })
  }
  clearFlag(){
    this.smslinkBox = true;
    this.verifyStatus();
  }
  personalAddTemplate(){
    this.updateContactAddress=false;
    this.updateContactDetails=true;

  }
  SetCountryKYB() { 
    this.selectedCountryId = this.updateContactForm.get('calling_code').value;

     let obj =  this.countryData.filter(({calling_code}) => calling_code == this.selectedCountryId);
     let list=obj[0];
        this.personalAddress1.patchValue({
          'country_id': list.country_id,
        });
  }
  ngOnInit() {

    this.updateContactForm = this.fb.group({
      first_name: ["", Validators.compose([Validators.required, Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],
      last_name: ["", Validators.compose([Validators.required, Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],
      dob: ["", Validators.required],
      mobile: ["", Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      email: ["", Validators.compose([Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
      gender: ['', Validators.required],
      middle_name: [''],
      telephone: [null],
      calling_code: ['', Validators.required],
    })

    this.personalAddress1 = this.fb.group({
      country_id: ['', Validators.required],
      postal_code: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9- ]+$")])],
      city: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z- ']+$")])],
      address_line1: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      address_line2: ['', Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      region: ['', Validators.compose([Validators.required])],
    })
  }
}

