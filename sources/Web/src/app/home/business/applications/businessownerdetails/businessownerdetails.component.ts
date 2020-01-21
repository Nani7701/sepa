/**
* Dashboard Component
* KYC status, KYC verification process, user profile
* @package BusdashboardComponent
* @subpackage app\home\personal\business-dashboard\busdashboard.component.html
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { HomeService } from '../../../../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder} from "@angular/forms";
import { IndexService } from 'src/app/core/shared/index.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { ApplicationsComponent } from '../applications.component';
import { HomeComponent } from 'src/app/home/home.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-businessownerdetails',
  templateUrl: './businessownerdetails.component.html',
  styleUrls: ['./businessownerdetails.component.scss']
})
export class BusinessownerdetailsComponent implements OnInit {
 
  loadContent:boolean=true;
  countryData: any;
  profileData: any;
  KYBStatus: any;
  confmDirector:boolean=true;
  directorList: any;
  shareHoldertable:boolean=false;
  verifyIdenTemp:boolean=false;
  Invitaiontemplate:boolean=false
  busOwnPerTemplate:boolean=false;
  busSelfAddress:boolean=false;
  verifiedListTemp:boolean=false;
  shareholderTemp:boolean=false
  kycTemplate:boolean=false;
  utltimateOwner:boolean=false;
  updateContactDetails:boolean=false;
  addDirectorForm:FormGroup;
  dob: any;
  gender: any;
  mobile: any;
  ultimateOwnForm:FormGroup;
  first_name: any;
  last_name: any;
  minDOB=''
  maxDOB:any;
   authorityPhotoImage:string;
   business_owner_id: number;
  dirlistTemplate:boolean=true;
  arrayList: any;
 
   directorDetailsTemplate:boolean=false;
   addDirectorFormData: any=[];
   shareHolderData: any=[];
   dirList: string;
   verifyAllbtn: boolean=false;
   validDOB: boolean=false;
   SelectedVerifyData: any;
  ownerShareholderList:any={};
  selectedCountryId: any;
  isKyc: any;
  shareHolderEmail: any;
  type: string;
  user_id: any;
  isKycDirShare: any;
  directorListFlag:boolean=true;
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

sharelinkMobileNo:any;

  
  constructor(private fb: FormBuilder, private indexService: IndexService,private homeService:HomeService,private alert:NotificationService,private routerNavigate:Router,private application: ApplicationsComponent,private loader:HomeComponent,public sanitizer: DomSanitizer) {
   this.application.loadContent=false;
    var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    var obj=[date.getFullYear(), mnth, day].join("-");
    this.maxDOB=obj;
     this.getDirectors();
      this.profileData=JSON.parse(sessionStorage.getItem('userData'));
   }
  

  getDirectors(){
    this.homeService.getDirectors('director').subscribe(res=>{
      if(res['status']==0){
      if(res['data']['status']==0){
        this.directorList=res['data']['ownerList']['directors'];
       this.dirlistTemplate=true;
       this.loader.apploader=false;
      }
      else if(res['data']['status']==1){
        this.directorList=[];
        this.dirlistTemplate=false;
        this.loader.apploader=false;
      }
    }
    else{
      this.loader.apploader=false;
      this.alert.error(res['message'])
     }
      })
  }
  deleteDirectorFieldVal(index){
      this.addDirectorForm.reset();
      this.getDirectors();
      this.confmDirector=true;
      this.directorDetailsTemplate=false;
  }
  submitDirecotrsNames(formData:any){
         formData.status=false;
         formData.percentage=null;
         formData.type="director"
         formData.dob=null
         this.addDirectorFormData.push(formData)
    var obj= {list:this.addDirectorFormData}
   this.homeService.addDirShrHolder(obj).subscribe(res=>{
     if(res['status']==0){
      if(res['data']['status']==0){
        this.addDirectorFormData=[]
        this.alert.success(res['data']['message']); 
        this.getDirectors();
        this.directorDetailsTemplate=false;
        this.confmDirector=true;
        this.addDirectorForm.reset();
        this.deleteDirectorFieldVal(0)
      }
      else if(res['data']['status']==1){
        this.alert.warn(res['data']['message']); 
      }
    }
    else{
      this.alert.error(res['message'])
    }
    })
}
   verifiedAllStatus(){
     this.loadContent=true;
    this.verifiedListTemp=false;
    this.verifyIdenTemp=false;
  }
   VeriyYourself(item){

     this.getCountryDetails()
    this.shareHolderEmail=item.email;
    this.isKycDirShare=item.isKyc;
    this.SelectedVerifyData=item;
    this.personalAddress.reset();
    this.busOwnerForm.reset();
    if(item.type=='director'){
     // this.dirList= ['director'];
      this.dirList= 'director';
      this.busOwnerForm.controls['business_owner_type'].patchValue(item.type, {onlySelf: true});
    }
   else if(item.type=='shareholder'){
   //   this.dirList= ['shareholder'];
      this.dirList= 'shareholder';
      this.busOwnerForm.controls['business_owner_type'].patchValue(item.type, {onlySelf: true});
    }
    else if(item.type=='businessowner'){
      this.dirList= 'businessowner';
      //this.dirList= ['businessowner'];
      this.busOwnerForm.controls['business_owner_type'].patchValue(item.type, {onlySelf: true});
    }
  
    this.business_owner_id=item.kyb_bo_id
    var nameArr = item.name.split(',');
    this.busOwnerForm.patchValue({
      email:item.email,
      first_name:nameArr[0],
      last_name:nameArr[1],
    })
    this.first_name=nameArr[0];
    this.last_name=nameArr[1];
  

    this.dob = item.dob;
    this.gender = item.gender;
    this.mobile = item.mobile;

    this.verifyIdenTemp=false;
    this.busOwnPerTemplate=true;
   }
   submitPersonalDetails(formData:any){
    formData.percentage=null;
     formData.isKyc= true;
     this.sharelinkMobileNo=formData.mobile;
    this.homeService.submitPersonalDetails(formData).subscribe(res=>{
      if(res['status']==0){
        if(res['data']['status']==0){
          this.alert.success(res['data']['message']); 
          this.busOwnPerTemplate=false;
          this.busSelfAddress=true;
          this.kycTemplate=false;
          this.user_id=res['data']['user_id'];
          this.isKyc=res['data']['isKyc'];
          this.storeAppIdforKYC()
        }
        else if(res['data']['status']==1){
          this.alert.error(res['data']['message']); 
        }
      }
      else{
        this.alert.error(res['message'])
      }
    })
   }

  getCountryDetails() {
    this.indexService.getCountryDetails().subscribe(res => {
      if(res['status']==0){
        this.countryData = res['data']['country list'];
      }
      else{
        this.alert.error(res['message'])
      }
    });
  }
  resetDirShreholrd(){
    this.addDirectorForm.reset();
    this.ultimateOwnForm.reset();
  }
  submitPersonalAddr(formData:any){
    this.loader.apploader=true;
     formData.address_type_id=1;
     formData.account_type='business';
     formData.user_id=this.user_id;
     // new line
     
    this.homeService.submitAddr(formData).subscribe(res => {
      if(res['status']==0){
      if(res['data']['status']==0){
        this.alert.success(res['data']['message']);
        this.busSelfAddress=false;
        if(this.isKycDirShare==true){
          this.SubmitForKYC();
        }
        else if(this.isKycDirShare==false){
          this.busSelfAddress=false;
          this.verifyIdenTemp=true;
          this.loader.apploader=false;
          this.verifyIdentity();
        }
      }
      else if(res['data']['status']==1){
        this.loader.apploader=false;
        this.alert.error(res['data']['message']);
      }
    }
    else{
      this.loader.apploader=false;
      this.alert.error(res['message'])
    }
    });
  }
  storeAppIdforKYC(){
    let obj={account_type:'business',user_id:this.user_id,isKyc:this.isKyc}
    this.homeService.storeAppIdforKYC(obj).subscribe(res => {
      if(res['status']==0){
      if(res['data']['status']==0){
      }
      else if(res['data']['status']==1){
        this.alert.success(res['data']['message']);
      }
    }
    else{
      this.alert.error(res['message'])
    }
    });
  }
  // submitForShareHolderIdentId(){
  //   let obj={account_type:'business',user_id:this.user_id}
  //   this.homeService.IdentId(obj).subscribe(res=>{
  //     if(res['status']==0){
  //     if(res['data']['status']==0){
  //       this.SharidentId=res['data']['id'];
  //       this.loader.apploader=false;
  //       this.busSelfAddress=false
  //       this.kycTemplateShare=true;
  //     }
  //     else if(res['data']['status']==1){
  //       this.loader.apploader=false;
  //       this.alert.error(res['data']['message']);
  //     }
  //   }
  //   else{
  //     this.loader.apploader=false;
  //     this.alert.error(res['message'])
  //   }
  //   })
  // }
  // ShareHoldKYClinkToMobile(mobilePlatform){
  //   this.homeService.KYClinkToMobile(this.busOwnerForm.get('mobile').value, this.busOwnerForm.get('email').value ,mobilePlatform,this.SharidentId).subscribe(res=>{
  //   if(res['status']==0){
  //    if(res['data']['status']==0){
  //     this.smslinkBox1=false;
  //    // this.verifiedListTemp=true;
  //     //this.kycTemplateShare=false;
  //    }
  //    else if(res['data']['status']==1){
  //      this.alert.error(res['data']['message'])
  //    }
  //   }
  //   else{
  //     this.alert.error(res['message'])
  //   }
  //   })
  // }
  SubmitForKYC() {
    this.loader.apploader=true;
    let obj={account_type:'business',user_id:this.user_id}
    if(sessionStorage.getItem('isCamera')=='no'){
      this.homeService.IdentId(obj).subscribe(res=>{
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
        this.application.getKYBStatus();
        this.KYCStatus=res['data']['kyc_status'];
      }
    }
    else{
      this.alert.error(res['message'])
    }
    })
  }
  KYClinkToMobile(mobilePlatform) {

    // this.homeService.KYClinkToMobile(this.profileData['data']['userInfo']['mobile'],this.profileData['data']['userInfo']['email'], mobilePlatform, this.identId).subscribe(res => {
    this.homeService.KYClinkToMobile(this.sharelinkMobileNo,this.SelectedVerifyData.email, mobilePlatform, this.identId).subscribe(res => {
      if(res['status']==0){
       if(res['data']['status']==0){
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
    this.verifyIdenTemp=true;
    this.getAllList('all')
    //this.application.loadContent=true;
   // this.routerNavigate.navigate(['/home/application']);
   // this.verifyStatus();
  }




  IsVerifiedDirOwnr(){
    var obj={
      "kyb_bisiness_owner_id":this.business_owner_id,
      "status":true
    }    
    this.homeService.IsVerifiedDirOwnr(obj).subscribe(res => {
        if(res.status==0){
           if(res['data']['status']==0){
            this.alert.success(res['data']['message'])
            this.confmDirector=true;
          }
        }
        else{
          this.alert.error('status not updated');
        }
    });
  }
  selectedDirtitem={first_name:'',last_name:'',email:''}
  getCurrntDir(item){
    var nameArr = item.name.split(',');
    this.first_name=nameArr[0];
    this.last_name=nameArr[1];
    this.selectedDirtitem={first_name:this.first_name,last_name:this.last_name,email:item.email}
  }
  moveToShareHolder(){
    this.shareholderTemp=true;
    this.confmDirector=false;
    this.getShareHoldersOwners()

  }
    addShrHoldrFieldValue(){
       // this.type='businessowner'
        this.type='shareholder'
        this.ultimateOwnForm.value.type=this.type
        this.ultimateOwnForm.get('type').updateValueAndValidity();
      }
  delShrHoldrFieldValue(index) {
       this.ultimateOwnForm.reset();
       this.shareHolderData=[];
        this.utltimateOwner=false;
        this.shareholderTemp=true;
       this.getShareHoldersOwners();
  }

  getShareHoldersOwners(){
      this.homeService.getAllList('all').subscribe(res => {
        if(res['status']==0){
        if(res['data']['status']==0){
          this.ownerShareholderList=res['data']['ownerList']
          this.loader.apploader=false;
          this.shareHoldertable=true;
        }
        else if(res['data']['status']==1){
          this.loader.apploader=false;
          this.shareHoldertable=false;
          this.ownerShareholderList={};
        }
      }
      else{
        this.loader.apploader=false;
        this.shareHoldertable=false;
        this.alert.error(res['message'])
      }
            
      })
  }
  dobValidation($event){
    var dt = new Date();
    var yr= dt.getFullYear();
     var selectedYr = $event.target.value;
     if(selectedYr<=this.maxDOB){
        this.validDOB=false;
     }
     else{
      this.validDOB=true;
     }
  }
  submitSharedHolder(formData:any){
    formData.status=false;
    formData.dob=null
    formData.type= this.type
    
    this.shareHolderData.push(formData)
var obj= {list:this.shareHolderData}
   this.homeService.addDirShrHolder(obj).subscribe(res=>{
     if(res['status']==0){
     if(res['data']['status']==0){
       this.alert.success(res['data']['message']);
       this.shareHolderData=[];
       this.ultimateOwnForm.reset();
       this.getShareHoldersOwners();
     }
     else if(res['data']['status']==1){
      this.shareHolderData=[];
      this.ultimateOwnForm.reset();
       this.alert.error(res['data']['message']);
     }
    }
    else{
      this.alert.error(res['message'])
    }

   })
   this.shareHolderData=[];
 }
 verifyIdentity(){
  this.shareholderTemp=false;
  this.kycTemplate=false;
   this.verifyIdenTemp=true;
   this.getAllList('all');
 }
//  //update owner status
 getAllList(type){
  this.homeService.getAllList(type).subscribe(res => {
    if(res['status']==0){
      if(res['data']['status']==0){
        this.arrayList=res['data']['ownerList'];
        if(_.size(res['data']['ownerList']["Directors"]) == _.size(_.filter(res['data']['ownerList']["Directors"], {status:1}))  && _.size(res['data']['ownerList']["Businessowner"]) == _.size(_.filter(res['data']['ownerList']["Businessowner"], {status:1})) && _.size(res['data']['ownerList']["Shareholder"]) == _.size(_.filter(res['data']['ownerList']["Shareholder"], {status:1}))){
         this.getUpdatedStatus("business_owner_details", 2)
         this.verifyAllbtn=true;
        }     
      }
      else if(res['data']['status']==1){
        this.alert.error(res['data']['message'])
      }
        
        }
        else{
        this.alert.error(res['messsage'])
        }
  })
 
}
deleteOwner(id,type){
  this.loader.apploader=true;
  this.homeService.deleteOwner(id,type).subscribe(res=>{
    if(res['status']==0){
    if(res['data']['status']==0){
      if(type=='shareholder'){
        this.getShareHoldersOwners();
      }
      if(type=='director'){
        this.getDirectors();
      }
    }
    else if(res['data']['status']==1){
      this.loader.apploader=false;
      this.alert.success(res['data']['message'])
    }
    } 
    else{
      this.loader.apploader=false;
      this.alert.error(res['message'])
    }   
  })
}
 
  getUpdatedStatus(col,status){
   let obj={
      "column" : col,
      "status":status
    }
    this.homeService.getUpdatedStatus(obj).subscribe(res => {
      if(res['status']==0){
         if(res['data']['status']==0){
          this.application.getKYBStatus();
         }
         else if(res['data']['status']==1){
           this.alert.error(res['data']['message'])
         }
      }
      else{
        this.alert.error(res['message'])
      }
    });
  }


  numberOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  
}

  sendInvitationLink(item){
    var obj={
    userEmail:this.profileData.data.userInfo.email,
    inviteeEmail:item.email,
    kyBusinessId:item.kyb_bo_id,
    platformType:'web',
    //isKyc:this.isKyc
    }
     this.homeService.sendInvitationLink(obj).subscribe(res=>{
       if(res['status']==0){
          if(res['data']['status']==0){
            this.alert.success(res['data']['message']);
            this.Invitaiontemplate=false;
            this.loadContent=true;
          }
          else if(res['data']['status']==1){
            this.alert.error(res['data']['message']);
          }
        }
        else{
          this.alert.error(res['message'])
        }
     })
  }
  SetCountry(){
    this.selectedCountryId=this.busOwnerForm.get('calling_code').value;
    for(var i=0;i<=this.countryData.length;i++){
          if(this.selectedCountryId==this.countryData[i].calling_code){
            this.personalAddress.patchValue({
              'country_id':  this.countryData[i].country_id,
            });
          }
    }
   }
   directorTemplate(){
     this.shareholderTemp=false;
     this.confmDirector=true;
   }
   shareholderList(){
      this.verifyIdenTemp=false;
      this.shareholderTemp=true;
   }
   listTempalte(){
     this.busOwnPerTemplate=false;
    this.verifyIdenTemp=true;
   }
   personaDetailsTemplate(){
    this.busSelfAddress=false;
    this.busOwnPerTemplate=true;
   }
  busOwnerForm:FormGroup;
  personalAddress:FormGroup;
  ngOnInit() {
    this.addDirectorForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,30}")])],
    })
     
    this.ultimateOwnForm=this.fb.group({
      //type:['',Validators.required],
      type:[''],
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
     email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,30}")])], 
     percentage: ["",Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(2),Validators.maxLength(3),Validators.min(25),Validators.max(100)])],

    })
  
    this.busOwnerForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,30}")])],
      mobile: ["",Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      dob: ["",Validators.required],
     
      business_owner_type: ["",Validators.required],  
      gender: ['', Validators.required],
      calling_code: ['', Validators.required],
    })

    this.personalAddress=this.fb.group({
    country_id:['',Validators.required],
    postal_code:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9- ]+$")])],
    city:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
    address_line1:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
    address_line2:['',Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
    region:['',Validators.compose([Validators.required])],
    })
  }
}
