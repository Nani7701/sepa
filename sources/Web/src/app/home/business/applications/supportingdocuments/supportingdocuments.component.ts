/**
* Dashboard Component
* KYC status, KYC verification process, user profile
* @package BusdashboardComponent
* @subpackage app\home\personal\business-dashboard\busdashboard.component.html
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { HomeService } from '../../../../core/shared/home.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder,AbstractControl} from "@angular/forms";
import { IndexService } from 'src/app/core/shared/index.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { ApplicationsComponent } from '../applications.component';

declare var $: any;

@Component({
  selector: 'app-supportingdocuments',
  templateUrl: './supportingdocuments.component.html',
  styleUrls: ['./supportingdocuments.component.scss']
})
export class SupportingdocumentsComponent implements OnInit {
 

  loadContent:boolean=true;
  busAddrTemp:boolean=false;
  operatingAddrTemp:boolean=false;
  busAddrForm: FormGroup;
  operatingAddrForm:FormGroup;
  countryData: any;
  bus_applicant_id: number;
  profileData: any;
  typesOfBus:boolean=false;
  isBusList:boolean=false
  fieldArray: Array<any> = [{}];
  newAttribute: any = {};
  businessSectorData: any;
  range_of_service: any;
  busTypesFormData: any={};
  businessSectorId: any;
  transcationinfo:boolean=false;
  
  MnthVolTransData=[];
  PayntPerMonth=[];
  max_value_of_payment: any;
  monthy_transfer_amount: any;
  no_payments_per_month: any;
  monthlyTrsnAmt: any;
  pyntpermonth: any;
  KYBStatus: any;
  confmDirector:boolean=false;
  insdustriesData: any;
  ids: number[];
  facility:any;
  ids1:any;
  selectedInsData: any=[];
  selectedIndustries: any;
  receivePayTempl:boolean=false;
  sendPayTempl:boolean=false;
  reveivePaymentTemp:boolean=false;
  countryFieldArray: Array<any> = [{}];
  newCountryAttribute: any = {};
  sendPaycountryFieldArray:Array<any> = [{}];
  sendPayCountryAttribute: any = {};
  directorList: any;
  country: any;
  shareHoldertable:boolean=false;
  sendPymtBtn:boolean=false;
  sbmtOperBtn:boolean=false;
  businessList:boolean=true;
  verifyIdenTemp:boolean=false;
  Invitaiontemplate:boolean=false
  busOwnPerTemplate:boolean=false;
  busSelfAddress:boolean=false;
  verifiedListTemp:boolean=false;
  shareholderTemp:boolean=false
  kycTemplate:boolean=false;
  utltimateOwner:boolean=false;
  directorForm:FormGroup;
  smslinkBox:boolean=true;
  smslinkBox1:boolean=true;
  identId: any;
  identLoader:boolean=false;
  KYCStatus: any;
  updateContactDetails:boolean=false;
  updateContactForm:FormGroup;
  addDirectorForm:FormGroup;
  dob: any;
  gender: any;
  mobile: any;
  ultimateOwnForm:FormGroup;
  customLoadingTemplate:any;

  restricted_business: boolean=true;
  // indlistFlag = [
  //   {isSelected: false,name:'Yes'},
  //   {isSelected: true,name:'No'},
  // ]
 
  first_name: any;
  last_name: any;
  email: any;
  isVeryfiedList: any;
  addr_applicant_id: any;
  minDOB=''
  maxDOB:any;
  selectedfile: any;
   myObject = {};
   fileupload:boolean=false;
   photoimage:string;
   responsedata:any;
   responseDataOperting:any;
   opertingPhotoImage:string;
   shareholder:string;
   responseDatashare:any;
   authorityPhotoImage:string;
   responseDataAuthority:any;
   supportDocument:boolean=false;
   suppDocumRegistered:boolean=false;
   proofofOperating:boolean=false;
   proofOfShareHolder:boolean=false;
   authorityAddress:boolean=false;
   activeclick:boolean=false;
   activeClickOperating:boolean=false;
   activeClickShareHolder:boolean=false;
   activeClickAuthority:boolean=false;
   operatingObject={};
   shareholderObject={};
   authorityObject={};
   registeredcheckimage:boolean=false;
   registeredcheckfile:boolean=false;
   operatingcheckimage:boolean=false;
   operatingcheckfile:boolean=false;
   sharefolderchceckimage:boolean=false;
   sharefoldercheckfile:boolean=false;
   authoritycheckimage:boolean=false;
   authoritycheckfile:boolean=false;
   business_Id: number;
   business_owner_id: number;
   ShrHoldrList: any;
  dirlistTemplate:boolean=true;
  busUserList: unknown;
  Owner: any;
  directors: any;
  arrayList: any;
  business_owner_type: any;
  applicant_Id: number;
  allow: boolean=false;
  selectedIndValue: any;
  restricted:Array<any>=[]
  errordata:any;
  industrycheck:boolean=false;
  blockindustries:boolean=false;
  countrieserror:boolean=false;
   contact_mobile: any;
   contact_email: any;
   verifiedAll: boolean;
   sendcompanies:boolean;
   country_incorporation: any;
   country_business:any;
   directorDetailsTemplate:boolean=false;
   addDirectorFormData: any=[];
   shareHolderData: any=[];
   imgValue: any;
   supportDocBtn: boolean=true;
   legalName: any;
   businessname:any;
   updateContactAddress: boolean=false;
   business_description:any;
   dirList: string[];
   ownList:string[];  
   docData: any;
   verifyAllbtn: boolean=false;
   post_validation:boolean=false;
   invalidWebsite:boolean=true;
   invalidcountries:boolean=true;
   sendcountires:boolean=true;
   validDOB: boolean=false;
   SelectedVerifyData: any;
  fileName:any;

    applybusiness:boolean;
    checkoption:boolean=true;
    optionvalid:boolean=true;
    validationIndustries:boolean=true;
  
 
  ownerShareholderList:any;
  selectedCountryId: any;
  isKyc: any;
  SharidentId: any;
  kycTemplateShare: boolean=false;
  shareHolderEmail: any;
  industrStatus: any;
  restricted_businessValue: number;
  type: string;
  registeredFileName: any;
  shareholderFileName: any;
  authorityFileName: any;




 
   // supporting document end

   
  constructor(private fb: FormBuilder, private application:ApplicationsComponent, private indexService: IndexService,private homeService:HomeService,private alert:NotificationService,private routerNavigate:Router) {
    this.application.loadContent=false;
    var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    var obj=[date.getFullYear(), mnth, day].join("-");
    this.maxDOB=obj;
      this.getKYBStatus();
      this.profileData=JSON.parse(sessionStorage.getItem('userData'));
      this.supportingDocument();
      this.legalName=this.profileData.data.userInfo.business_legal_name;
   }


   getKYBStatus(){
    this.homeService.getKYBStatus().subscribe(res => {
      if(res['status']==0){
        if(res['data']['status']==0){
          this.KYBStatus=res['data']['Dashboard Status'];
        }
        else if(res['data']['status']==1){
        }
      }
      else{
        this.alert.error(res['message'])
      }
    });
   }

 

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); 
    var file_name = file.name;
    this.myObject['file_type'] = file_upload;
    this.registeredFileName=file_name;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }


  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.myObject['file_content'] = base64textString;
    this.fileupload = true;
  }


  uploadAddressDocument() {
    this.myObject['file_name'] = "REGISTERED_ADDRESS";
    this.homeService.sendRegisterdAddressDocument(this.myObject).subscribe(res => {
      debugger;
      if(res['status']==0){
      if(res['data']['status'] == 1) {
        this.alert.error(res['data']['message']);
      } else if (res['data']['status'] == 0) {
        this.alert.success(res['data']['message']);
        this.application.getKYBStatus();
        this.supportDocument = true;
        this.suppDocumRegistered = false;
        this.activeclick = true;
        this.getRegisterdAddressDocument();
      }
      } else if(res['status']==1){
      this.alert.error(res['message']);
    }
    });
    this.suppDocumRegistered=false;
    this.fileupload = false;
  }


  getRegisterdAddressDocument() {
    var checkfiletype: any;
    this.homeService.getRegisterdAddressDocument().subscribe(res => {
      if (res['status'] == 1) {
        if(res['data']['status']==0){
        for (let i = 0; i < res['data']['documents'].length; i++) {
          if (res['data']['documents'][i].kyb_doc_type == 'BUSINESS_ADDRESS') {
            this.photoimage = res['data']['documents'][i]['kyb_doc_base64'];
            checkfiletype = res['data']['documents'][i]['kyb_doc_file_type'];
          }
        }
        if (checkfiletype) {
          this.registeredcheckimage = true;
          this.registeredcheckfile = false;
        } else {
          this.registeredcheckimage = false;
          this.registeredcheckfile = true;
        }
       } else if(res['data']['status']==1){
         this.alert.success(res['message']);
      }
     }
      else if(res['status'] == 1){
        this.alert.error(res['message']);
      }
    });
  }

  getRegisterdAddress() {
    this.homeService.getRegisterdDetails().subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 0) {
        for (let i = 0; i < res['data']['addressDetails'].length; i++) {
          if (res['data']['addressDetails'][i].address_type == "BUSINESS_ADDRESS") {
            this.responsedata = res['data']['addressDetails'][i];
          }
        }
      } else if(res['data']['status']==1){
        this.alert.error(res['message']);
      }
     } else if(res['status']==0){
       this.alert.error(res['message'])
     }
    });
  }

  handleFileSelects(evt) {

    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); //changed

    var file_name=file.name;
    this.operatingObject['file_type'] = file_upload;
    this.fileName=file_name;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadeds.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderLoadeds(readerEvt) {

    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.operatingObject['file_content'] = base64textString;
    this.fileupload = true;
  }

  uploadOperatingDocument() {
    this.operatingObject['file_name'] = "OPERATING_ADDRESS";
    this.homeService.sendRegisterdAddressDocument(this.operatingObject).subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 1) {
        this.alert.error(res['data']['message']);
        this.authorityAddress=false;
      } else if (res['data']['status'] == 0) {
        this.application.getKYBStatus();
        this.alert.success(res['data']['message']);
        this.supportDocument = true;
        this.proofofOperating = false;
        this.activeClickOperating=true;
        this.getOperatingDocumets();
        this.authorityAddress=false;
      }
      } else if (res['status']==1){
        this.alert.error(res['message']);
      }
    });
    this.proofofOperating=false;
    this.proofOfShareHolder=false;
    this.fileupload = false;
    this.authorityAddress=false;
  }

  getOperatingDocumets() {
    let requestobj = {};
    var operatingCheckFile: any;
    this.homeService.getRegisterdAddressDocument().subscribe(response => {
    if (response['status'] == 1){
    for (let i = 0; i < response['data'].length; i++){
    if (response['data'][i].kyb_doc_type == 'OPERATING_ADDRESS') {
         this.opertingPhotoImage = response['data'][i]['kyb_doc_base64'];
         operatingCheckFile = response['data'][i]['kyb_doc_file_type'];
    }
    }
    if (operatingCheckFile) 
    {
       this.operatingcheckimage = true;
       this.operatingcheckfile = false;
    }
    else 
    {
       this.operatingcheckimage = false;
       this.operatingcheckfile = true;
    }
    }
    });
  }

  getOperatingAddress() {
    this.homeService.getRegisterdDetails().subscribe(res => {
    if (res['status'] == 0) {
      if(res['data']['status']==0){
        for (let i = 0; i < res['data']['addressDetails'].length; i++) {
          if (res['data']['addressDetails'][i].address_type == 'OPERATING_ADDRESS') {
            this.responseDataOperting = res['data']['addressDetails'][i];
          }
        }
      } else if(res['data']['status']==1){
        this.alert.error(res['message']);
      }
      } else if (res['status'] == 1){
        this.alert.error(res['message']);
      }

    })
  }

  
  handleFileSelectshare(evt) {

    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); 
    var file_name = file.name;
    this.shareholderFileName=file_name;
    this.shareholderObject['file_type'] = file_upload;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadedshare.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderLoadedshare(readerEvt) {

    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.shareholderObject['file_content'] = base64textString;
    this.fileupload = true;
  
  }

  uploadShareDocument() {
    this.shareholderObject['file_name'] = "SHAREHOLDER_DETAILS";
    this.homeService.sendRegisterdAddressDocument(this.shareholderObject).subscribe(res => {
      if(res['status']==0){
        if(res['data']['status'] == 1) {
        this.alert.error('Uploading failed');
        this.routerNavigate['/home/application/businessOwner'];
       }
       else if(res['data']['status'] == 0) {
        this.supportDocument = true;
        this.proofOfShareHolder = false;
        this.activeClickShareHolder=true;
        this.getshareholderDocumets();
        this.routerNavigate['/home/application/businessOwner'];
       }
     } else if(res['status']==1){
      this.alert.error(res['message']);
      this.routerNavigate['/home/application/businessOwner'];
     }
    });
    this.proofofOperating=false;
    this.proofOfShareHolder=false;
    this.authorityAddress=false;
    this.fileupload = false;
    this.routerNavigate['/home/application/businessOwner'];
  }

  getshareholderDocumets() {
    let requestobj = {};
    requestobj['business_id'] = this.business_Id;
    var shareHolderFile: any;
    this.homeService.getRegisterdAddressDocument().subscribe(response => {
    if (response['status'] == 1){
      for (let i = 0; i < response['data'].length; i++){
      if (response['data'][i].kyb_doc_type == 'SHAREHOLDER_DETAILS')
      {
            this.shareholder = response['data'][i]['kyb_doc_base64'];
            shareHolderFile = response['data'][i]['kyb_doc_file_type'];
      }
      }
      if (shareHolderFile) 
      {
           this.sharefolderchceckimage = true;
           this.sharefoldercheckfile = false;
      }
      else 
      {
           this.sharefoldercheckfile=true;
           this.sharefolderchceckimage=false;
      }
      }
     
    });
  }
  getdoumentImg(doc_type){
    this.homeService.getDocStatus().subscribe(res=>{
      if(res['status']==0){
      if(res['data']['status']==0){
      for(var i=0;i<=res['data']['documents'].length;i++){
        if(res['data']['documents'][i].kyb_doc_type==doc_type){
          this.imgValue=res['data']['documents'][i]['kyb_doc_base64']
        }
      }}
      else if(res['data']['status']==1){
        this.alert.error(res['message']);
      }
      }
      else if(res['status']==1){
        this.alert.error(res['message']);
      }
    })
      
  }


  //proof of shareholder end


  //proof of authority start


  handleFileAuthority(evt) {

    var files = evt.target.files;
    var file = files[0];
    var string = evt.target.files[0].type;
    var file_upload = string.slice(6).toUpperCase(); 
    var file_name = file.name;
    this.authorityFileName=file_name;
    this.authorityObject['file_type'] = file_upload;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderAuthority.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderAuthority(readerEvt) {

    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.authorityObject['file_content'] = base64textString;
    this.fileupload = true;
   

  }

   uploadAuthorityDocument() 
   {
    this.authorityObject['file_name'] = "SIGNING_AUTHORITY";
    this.homeService.sendRegisterdAddressDocument(this.authorityObject).subscribe(res => {
    if(res['status']==0){
    if(res['data']['status'] == 1){
        this.alert.error(res['data']['message']);
     } else if (res['data']['status'] == 0){
       this.application.loadContent=true;
       this.supportDocument=false;
       this.activeClickAuthority = true;
       this.application.getKYBStatus()
      this.alert.success(res['data']['message']);
      this.authorityAddress = false;
      this.getsAuthorityDocumets();
    }}
    else if(res['status']==1){
       this.alert.error(res['message']);
    }
    });
    this.proofofOperating=false;
    this.proofOfShareHolder=false;
    this.authorityAddress=false;
    this.fileupload = false;
  }

  getsAuthorityDocumets() {
    let requestobj = {};
    requestobj['business_id'] = this.business_Id;
    var checkAuthorityFile: any;
    this.homeService.getRegisterdAddressDocument().subscribe(response => {
      if (response['status'] == 1){
      for (let i = 0; i < response['data'].length; i++){
      if (response['data'][i].kyb_doc_type == 'SIGNING_AUTHORITY') 
      {
          this.authorityPhotoImage = response['data'][i]['kyb_doc_base64'];
          checkAuthorityFile = response['data'][i]['kyb_doc_file_type'];
      }
      }
      if (checkAuthorityFile) 
      {
          this.authoritycheckimage = true;
          this.authoritycheckfile = false;
      }
      else 
      {
          this.authoritycheckimage = false;
          this.authoritycheckfile = true;
      }
      }
    });
  }
 
  supportingDocument() {
    this.homeService.getDocStatus().subscribe(res=>{
    this.docData=res['data']['documents'];

      if((_.size(res["data"]['documents']) == _.size(_.filter(res["data"]['documents'],{status:0}))) && _.size(_.filter(res["data"]['documents'],{kyb_doc_type: "REGISTERED_ADDRESS"}))>0){
      this.activeclick=true;
       this.supportDocument = true;
      }
    if((_.size(res["data"]['documents']) == _.size(_.filter(res["data"]['documents'],{status:0}))) && _.size(_.filter(res["data"]['documents'],{kyb_doc_type: "SHAREHOLDER_DETAILS"}))>0){
      this.activeClickShareHolder=true;
      this.supportDocument = true;
   
    }
    if((_.size(res["data"]['documents']) == _.size(_.filter(res["data"]['documents'],{status:0}))) && _.size(_.filter(res["data"]['documents'],{kyb_doc_type: "OPERATING_ADDRESS"}))>0){
    this.activeClickOperating=true;
    this.supportDocument = true;
    }
    if((_.size(res["data"]['documents']) == _.size(_.filter(res["data"]['documents'],{status:0}))) && _.size(_.filter(res["data"]['documents'],{kyb_doc_type: "OPERATINGADDRESS"}))>0){
      this.activeClickOperating=true;
       this.supportDocument = true;
    }
    if((_.size(res["data"]['documents']) == _.size(_.filter(res["data"]['documents'],{status:0}))) && _.size(_.filter(res["data"]['documents'],{kyb_doc_type:"SIGNING_AUTHORITY"}))>0){
    this.activeClickAuthority=true;
    this.supportDocument = true;
    }
       else{
        this.supportDocBtn=true;   
        this.supportDocument = true;
       }
    
    })
  
  }


  registeredAddress() {
    if(this.KYBStatus.business_address==1 || this.KYBStatus.business_address==2){
      this.getRegisterdAddress();
      this.supportDocument = false;
      this.suppDocumRegistered = true;
    }
     else{
       this.alert.warn('Please, Submit or Verify your business address');
     }
  }

  proofOfOperatingAdd() {
    if(this.KYBStatus.business_address==1 || this.KYBStatus.business_address==2){
      this.getOperatingAddress();
      this.supportDocument = false;
      this.suppDocumRegistered = false;
      this.proofofOperating = true;
      this.proofOfShareHolder = false;
      this.authorityAddress = false;
    }
    else{
      this.alert.warn('Please, Submit or Verify your business address');
    }
  }

  proofOfShareAdd() {
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = true;
    this.authorityAddress = false;
  }

  proofOfOpenAcc()
  {
    this.supportDocument = false;
    this.suppDocumRegistered = false;
    this.proofofOperating = false;
    this.proofOfShareHolder = false;
    this.authorityAddress = true;
    this.updateContactDetails=false;
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
   SetCountryKYB(){
    this.selectedCountryId=this.updateContactForm.get('calling_code').value;
    for(var i=0;i<=this.countryData.length;i++){
          if(this.selectedCountryId==this.countryData[i].calling_code){
            this.personalAddress1.patchValue({
              'country_id':  this.countryData[i].country_id,
            });
          }
    }
   }

  /* supporting document end */
  
  // postal code start


  ValidatePostal(control:AbstractControl) {
    let postalValue = control.value;
    if(postalValue == null) return null;

    let regex = new RegExp(/^[A-Za-z0-9- ]+$/);
    if (!regex.test(postalValue)) {
      return { invalidPostal: true };
    }
    else{
    let  onlyNumeric = /^(?=.*[0-9- ])/;
      if(!postalValue.match(onlyNumeric)){
        return { invalidPostal: true };
      }
    }
    return null;
  }
 

  // postal code end

  busOwnerForm:FormGroup;
  personalAddress:FormGroup;
  personalAddress1:FormGroup;
  ngOnInit() {
    
    this.updateContactForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      dob: ["",Validators.required],
      mobile: ["",Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    //  email: ["",Validators.compose([ Validators.required,Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")])],
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])], 
      gender: ['', Validators.required],
      middle_name:[''],
      telephone:[null],
      calling_code: ['', Validators.required],
    })

    this.busAddrForm=this.fb.group({
    'country_id':['',Validators.required],
    'postal_code':['',Validators.compose([Validators.required,this.ValidatePostal])],
    'city':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
    'address_line1':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
    'address_line2':['',Validators.compose([Validators.pattern("^[a-zA-Z0-9' ,-]+$")])],
    'region':['',Validators.compose([Validators.required])],
    })

    this.operatingAddrForm=this.fb.group({
      'country_id':['',Validators.required],
      'postal_code':['',Validators.compose([Validators.required,this.ValidatePostal])],
      'city':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
      'address_line1':['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      'address_line2':['',Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      'region':['',Validators.compose([Validators.required])],
    });

    this.addDirectorForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
    })
     
    this.ultimateOwnForm=this.fb.group({
      type:['',Validators.required],
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
     email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])], 
     percentage: ["",Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(2),Validators.maxLength(3),Validators.min(25),Validators.max(100)])],

    })
  
    this.busOwnerForm=this.fb.group({
      first_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      last_name: [ "", Validators.compose([Validators.required,Validators.pattern("(?=.*[a-zA-Z-'])(?!.*[0-9])(?!.*[@#$%^&+=:;></?\|.,~{}_]).{1,}")])],   
      email: ["",Validators.compose([Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])],
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

    this.personalAddress1=this.fb.group({
      country_id:['',Validators.required],
      postal_code:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9- ]+$")])],
      city:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z- ']+$")])],
      address_line1:['',Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      address_line2:['',Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      region:['',Validators.compose([Validators.required])],
      })
  }
  navigateScreen() {
    this.supportDocument=false;
    this.proofofOperating=true;
    this.routerNavigate['/home/application/supportingdocument'];
    
    
  }
  formValidate(){
    this.shareholderFileName=''
    this.supportDocument=true;
    this.proofOfShareHolder=false;
  }
formValidate1(){
  this.authorityFileName=''
  this.supportDocument=true;
  this.authorityAddress=false;
}

formValidate2(){
  this.registeredFileName=''
  this.supportDocument=true;
  this.authorityAddress=false;
}

formValidate3(){
  this.fileName=''
  this.supportDocument=true;
  this.proofofOperating=false;
}

}

