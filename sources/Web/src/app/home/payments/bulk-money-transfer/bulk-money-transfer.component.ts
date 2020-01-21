import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HomeService } from 'src/app/core/shared/home.service';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from '../../home.component';
@Component({
  selector: 'app-bulk-money-transfer',
  templateUrl: './bulk-money-transfer.component.html',
  styleUrls: ['./bulk-money-transfer.component.scss']
})
export class BulkMoneyTransferComponent implements OnInit {
  modalRef: BsModalRef;
  modalAmount: BsModalRef;
  bulkPaymentList: any;
  profileData: any;
  accountData: any;
  euroCurrency: any;
  euroBalance: any;
  totalAmount: any;
  alert: any;
  userForm: FormGroup;
  selectedMyAcc: any;
  selectedAmount: any;
  bankBalance: any;
  bankCurrency: any;
  senderCurrency: any;
  balance: any;
  req: any;
  acc_type: any;
  kycStatus: any;
  arrayList: any=[];
  listAccounts: any;
  totalBalance: any;
  
  scheduleForm: FormGroup;
  notified: number;
  constructor(
    private loader:HomeComponent,
    private modalService: BsModalService,
    public homeService:HomeService,
    private f: FormBuilder,
    public router: Router
   ) 
   {
     
      }
  ngOnInit() {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
    this.kycStatus = this.profileData.data.userInfo.kycStatus;
    this.acc_type = this.profileData.data.userInfo.account_type;
    this.getAccounts();
    this.userForm = this.f.group({
      selectedOption: ['']
    });
    this.scheduleForm = this.f.group({
      dateYMD: [''],
      notify: [''],
    });
    this.bulkPaymentList = JSON.parse(sessionStorage.getItem('userDataList'));
    this.totalBalance = JSON.parse(sessionStorage.getItem('TotalBalance'));
   
  }
  getShortName(name: string) { 
    return name.charAt(0).toUpperCase()
  }
 
  onSubmit() {
   
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
       }else{
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
    this.senderCurrency = this.userForm.value.selectedOption;
    this.totalAmount =this.bankBalance;
  } 
  paymentDetailsModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  successfullySent(amount: TemplateRef<any>) {
    this.modalAmount = this.modalService.show(amount);
    this.modalRef.hide();
  }
  continue() {
    this.router.navigateByUrl('/home/payments_tab');
    sessionStorage.removeItem('UserListDetails');
    sessionStorage.removeItem('TotalBalance');
    sessionStorage.removeItem('userDataList');
    this.modalAmount.hide();
  }
  editPayment() {
    sessionStorage.setItem('UserListDetails', JSON.stringify(this.bulkPaymentList));
    this.router.navigateByUrl('/home/payments_tab/bulk-money-transfer');
  
  }
  bulkTransfer(amount) {

    // if (this.kycStatus === 'PENDING') {
    //     alert('kyc pending');
    // } else { 
      if(this.scheduleForm.value.notify == true) {
        this.notified = 1
      }
      else if (this.scheduleForm.value.notify == false) {
        this.notified = 0
      }
      this.bulkPaymentList.forEach(element => {
        this.listAccounts = {
          "from_currency": element.currency,
          "to_mobile": element.mobile,
          "to_currency": "EUR",
          "amount": element.balance
        }
        this.arrayList.push(this.listAccounts)
      });
      this.req = {        
          "from_currency" : "EUR",
          "total_amount" : "5",
          "transaction_list" : this.arrayList,
          "transfer_time" : this.scheduleForm.value.dateYMD,
          "time_zone" :"India/Hyderabsd",
          "do_notify" : this.notified,
          "description" : "Test Schedule transfer"
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
       this.alert.error(res['message']);
    }
    });
   }
}

