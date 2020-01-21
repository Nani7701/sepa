import { Component, OnInit, TemplateRef, ɵConsole } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HomeService } from 'src/app/core/shared/home.service';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { HomeComponent } from '../../home.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-single-money-transfer',
  templateUrl: './single-money-transfer.component.html',
  styleUrls: ['./single-money-transfer.component.scss']
})
export class SingleMoneyTransferComponent implements OnInit {

  modalRef: BsModalRef;
  modalAmount: BsModalRef;
  accountData: any;
  selectedOption: any;
  selectedAmount: any;
  bankBalance: any;
  bankCurrency: any;
  currencyType: any;
  counterPartyMember: any;

  fee: any;
  selectedMyAcc: any;
  selectedBenificiary: any;
  benificiaryCurrency: any;
  bCurrencyCode: any;
  balance: any;
  defaultCurrency: any;
  euro: any;
  euroBalance: any;
  euroCurrency: any;
  currencyList: any;
  phone: number;
  bCurrencyCurrency: any;
  benDefaultCurrency: any;
  euroDefCurrency: any;
  euroDefBalance: any;
  benCurrency: any;
  selectBen: string;
  profileForm: FormGroup;
  req: any;
  senderCurrency: any;
  receiverCurrency: string;
  totalAmount: string;
  SuccessModal: boolean;
  balanceError: boolean;
  kycStatus: any;
  profileData: any;
  scheduleForm: FormGroup;
  notified: number;
  transaction_list: any;
  acc_type: any;
  givenBalance: any;

  constructor(private form: FormBuilder, private modalService: BsModalService, private homeService: HomeService,
     private fb: FormBuilder, private router:Router, private alert: NotificationService, private loader:HomeComponent) {
     
    }

  ngOnInit() {   
   this.getAccounts()
   this.getCounterPartyCurrencies();
   this.getBeneficiaryAccounts();
   this.profileForm = this.fb.group({
    selectedOption: [''],
    balance: ['', Validators.required],
    selectBen: [''],
    dateYMD: ['']
  });
  this.scheduleForm = this.fb.group({
    dateYMD: [''],
    reference:[''],
    notify:['']
  });
  this.senderCurrency = 'EUR';
  this.receiverCurrency = 'EUR'; 
  this.profileData = JSON.parse(sessionStorage.getItem('userData'));
  this.kycStatus = this.profileData.data.userInfo.kycStatus;
  this.acc_type = this.profileData.data.userInfo.account_type; 
  }

  // check_bal(e) {
  //   this.givenBalance = this.profileForm.controls['balance'].value;
  //   if(this.bankBalance < this.givenBalance) {
  //       this.balanceError = true;
  //   } else if (this.euroBalance < this.givenBalance) {
  //     this.balanceError = true;
  //   } 
  //   else {
  //     this.balanceError = false;
  //   }
  // }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  onSubmit() {
  }

  getBeneficiaryAccounts() {
    this.counterPartyMember=JSON.parse(sessionStorage.getItem('UserDetails'));
    this.phone = this.counterPartyMember.mobile;
  }
 
  paymentDetailsModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getAccounts(){
    this.loader.apploader=true;
    this.homeService.getAccounts().subscribe(res => {
      if(res['status']==0){
        if(res['data']['status']==0){
          this.accountData = res['data']['account'];
          this.euroCurrency = this.accountData[0].currency;
          this.euroBalance = this.accountData[0].balance;
          this.totalAmount =this.euroBalance;
          this.loader.apploader=false;
        } else if(res['data']['status']==1){
          this.loader.apploader=false;
        }
       } else {
        this.loader.apploader=false;
        this.alert.error(res['message'])
      }
    });
  }

  getCounterPartyCurrencies() {
    this.getBeneficiaryAccounts();
    this.loader.apploader=true;
    this.homeService.getCounterPartyCurrencyList(this.phone).subscribe(res => {
      if(res['status'] == 0) {
        if(res['data']['status'] == 0){
          this.currencyList = res['data']['currencyList'];
          this.euroDefCurrency = this.currencyList[0].currency; 
          this.loader.apploader=false;
        } else if(res['data']['status'] == 1){
          this.loader.apploader=false;
        }
      } else {
        this.loader.apploader=false;
        this.alert.error(res['message'])
      }
    });
  }
  
  changeAcc(e) {
    this.selectedMyAcc= e.target.value;
    this.selectedAmount = this.accountData.filter((item)=> item.currency == this.selectedMyAcc);
    this.bankBalance = this.selectedAmount[0].balance;
    this.bankCurrency = this.selectedAmount[0].currency;
    this.senderCurrency = this.profileForm.value.selectedOption;
    this.totalAmount =this.bankBalance;
  }

  changeBen(e) {
    this.selectedBenificiary = e.target.value;
    this.benificiaryCurrency = this.currencyList.filter((item)=> item.currency == this.selectedBenificiary);
    this.benCurrency = this.benificiaryCurrency[0].currency;
    this.receiverCurrency = this.profileForm.value.selectBen;
  }

  continue() {
    this.modalAmount.hide();
    if(this.acc_type === 'Personal') {
      this.router.navigateByUrl('/home/payments');
    } else if(this.acc_type === 'Business'){
      this.router.navigateByUrl('/home/payments_tab');
    }
    sessionStorage.removeItem('UserDetails')
  }

  singleTransfer(amount) {
    // if (this.kycStatus === 'PENDING') {
    //     alert('kyc pending');
    // } else {  
  
      if(this.scheduleForm.value.notify == true) {
        this.notified =1
      }
      else if (this.scheduleForm.value.notify == false) {
        this.notified =0
      }

      this.req = {
      "from_currency" : this.senderCurrency,
      "total_amount" : this.totalAmount,
      "transaction_list" : [ {
          "from_currency": this.senderCurrency,
          "to_mobile": this.counterPartyMember.mobile,
          "to_currency": this.receiverCurrency,
          "amount": this.profileForm.value.balance
        } 
      ],
        "transfer_time" : this.scheduleForm.value.dateYMD,
        "time_zone" : '',
        "do_notify" : this.notified,
        "description" : this.scheduleForm.value.reference
      }   
      this.homeService.singleTransfer(this.req).subscribe(res=>{
        if(res['status'] === 0) {
          if(res['data']['status'] === 0) { 
            if(res['data']['total_fail_trans'] === 1) {
              this.alert.error(res['data'].list_of_fail_trans[0].TransRes.message);
              this.modalRef.hide();
            } else {            
              this.modalAmount = this.modalService.show(amount);
              this.modalRef.hide();
            }          
        } else if(res['data']['status'] === 1) {       
          this.alert.warn(res['data']['message']); 
        }
      } else if(res['status'] === 1) {
        this.alert.error(res['data']['message']);
      }
    });
  }
}


