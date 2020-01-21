import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/core/shared/home.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as _ from "lodash";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { AuthService } from 'src/app/core/shared/auth.service';


@Component({
  selector: 'app-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.scss']
})
export class AddpaymentsComponent implements OnInit {
  countryData: any;
  applicant_id: any;
  profileData: any;
  cardData: any;
  CardDetails: any;
  id: any;
  amountTransForm:FormGroup;
  currTransForm:FormGroup;
  addPaymentemplate:boolean=false;
  hideCurrBtn:boolean=true;
  amount: any;
  currency: any;
  currAmountTmpl:boolean=true;
  currencyData: any;
  prevcurrTransForm:boolean=false;
  loader:boolean=false;
  currencyDataValues: any=[];

  
  constructor(private authService:AuthService,private routerNavigate:Router,private route: ActivatedRoute,private homeService:HomeService,private fb:FormBuilder,private alert:NotificationService) { 
    this.profileData=JSON.parse(sessionStorage.getItem('userData'));
    this.getAccounts();
  }
  getAccounts() {
    this.homeService.getAccounts().subscribe(res => {
      if(res['status']==0){
      if(res['data']['status']==0){
      this.currencyDataValues = res['data']['account'];
      this.currencyData=  this.currencyDataValues.filter(({status}) =>status== 1);

    }
    else if(res['data']['status']==1){
       this.alert.warn(res['data']['message'])
    }
    }
    else{
      this.alert.error(res['message'])
    }
    });
  }
  addPaymentemp(formData:any){
    let obj=this.CardDetails.card_year.toString().slice(-2);
    this.amount=formData.amount;
    this.currency=formData.currency;
    this.addPaymentemplate=true;
    this.hideCurrBtn=false;
    this.currTransForm.patchValue({
      card_number:this.creditCardMask(this.CardDetails['card_number']),   
      name_on_card:this.CardDetails.name_on_card,
      card_type:this.CardDetails.card_type,
      card_exp:+ this.CardDetails.card_month.length==1? '0'+this.CardDetails.card_month.toString()+obj :this.CardDetails.card_month.toString()+obj
    })
  }
  AddCurrMoney(formData:any){
    const copiedObj = Object.assign({}, formData);
    this.loader=true;
    this.prevcurrTransForm=true
    let fixedAmount=parseFloat(this.amountTransForm.get('amount').value).toFixed(2)
    copiedObj.amount=fixedAmount;
    copiedObj.currency=this.amountTransForm.get('currency').value; 
    copiedObj.payment_cards_id=parseInt(this.id);
    copiedObj.orderDescriptor="test";
    let obj=this.currencyData.filter(({currency}) => currency == this.currency);
    copiedObj.account_number=obj[0]['account_no'];


    delete copiedObj["card_name"];
    delete copiedObj["card_number"];
    delete copiedObj["card_exp"];
    this.homeService.AddCurrMoney(copiedObj).subscribe(res => {
      if(res['status']==0){
      if(res['data']['status']==0){
          this.loader=false;
          this.prevcurrTransForm=false;
           
          this.profileData.data.userInfo.initialPayment=false;    /* for stoping pop modal after adding money*/
          sessionStorage.setItem('userData',JSON.stringify(this.profileData));    /* for stoping pop modal after adding money*/


          this.alert.success(res['data']['transactionInfo']['description'])
          if(this.authService.accountMatch(['Personal'])){
            this.routerNavigate.navigate(['/home/account-index/transactions']);
          }
          if(this.authService.accountMatch(['Business'])){
            this.routerNavigate.navigate(['/home/business-account-index/transactions']);
          }
         
      }
      else if(res['data']['status']==1){
          this.loader=false;
          this.prevcurrTransForm=false;
          this.alert.error(res['data']['transactionInfo']['description'])
      }
    }
    else{
      this.alert.error(res['message'])
    }
     
    });
  }
  creditCardMask(credNumber){
  if(credNumber!=null){
    let char = "*"
    let hypen=' '
    credNumber = credNumber.replace(/[^0-9]+/g, ''); /*ensureOnlyNumbers*/
    let l = credNumber.length;
//credNumber.substring(0,0) + char.repeat(l-4)+ credNumber.substring(l-4,l)
     let cord=credNumber.substring(0,0) + char.repeat(l-4)+ credNumber.substring(l-4,l)

    return cord.replace(/(.{4})/g, '$1 ').trim();
    
  }
   

  }
  PreDiv(){
   this.currAmountTmpl=true; 
   this.addPaymentemplate=false;
   this.hideCurrBtn=true;
   this.currTransForm.reset();
   this.amountTransForm.reset();
  }
  ngOnInit() {
    this.route.params.subscribe(param =>{
    this.id=this.route.snapshot.paramMap.get('id');
    this.homeService.getCardDetails().subscribe(res=>{
      if(res['status']==0){
      if(res['data']['status']==0){
        this.addPaymentemplate=false;
        this.hideCurrBtn=true;
         this.loader=false;
        this.prevcurrTransForm=false;
        this.currTransForm.reset();
        this.amountTransForm.reset();
         this.cardData=res['data']['cards'];
         var obj =  this.cardData.filter(({payment_cards_id}) => payment_cards_id == this.id);
        this.CardDetails=obj[0];
      }
       else if(res['data']['status']==1){
       this.alert.error(res['data']['message'])
       }
      }
      else{
        this.alert.error(res['message'])
      }
    })
     });

  this.amountTransForm=this.fb.group({
    amount  : ['', Validators.compose([Validators.required,Validators.min(10), Validators.pattern('^[0-9]*$')])],
    currency:['',Validators.required],
    })
   this.currTransForm=this.fb.group({
      card_number: ["",Validators.required],   
      card_cvv:['', Validators.compose([Validators.required,Validators.pattern('^[0-9]*$')])],
      name_on_card:["", Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
      card_type:['',Validators.required],
      card_exp:['',Validators.required],
    })
}
}
