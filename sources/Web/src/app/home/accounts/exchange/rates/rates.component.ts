import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../../../../core/shared/home.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { SubSink } from 'subsink';
import { HomeComponent } from 'src/app/home/home.component';

declare var $:any;

@Component({
  selector: 'rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit,OnDestroy{
  private subs=new SubSink();
  CountryDetails: any;
  exchangeCurrencyResult: any;
  userData: any;
  convertObj: any;
  result: any;
  ratesData: any;
  to_currency: any;
  from_currency: any;
  currencyFB: FormGroup;
  currentPage = 1;
  rateExchangeData:any;
  applicant_id:any;
  currencyDataValues: any;
  
  constructor(private homeService: HomeService,private formBuilder: FormBuilder,private alert:NotificationService,private loader:HomeComponent) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.ratesList();
  }
  getCountrydetails() {
      this.homeService.getAccountsCurrency().subscribe(res => {
        if(res['status']==0){
        if(res['data']['status']==0){
        this.currencyDataValues = res['data']['currency'];
        this.CountryDetails=  this.currencyDataValues;
       // console.log(this.CountryDetails)
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
  CreateRates(){
    var request = {
      "from_currency": this.currencyFB.get('from_currency').value,
      "to_currency": this.currencyFB.get('to_currency').value,
      "isConvert": 0
    }
    if(request.from_currency == request.to_currency){
      this.alert.warn("please Select different Currencies");
    }
    else if(request.from_currency != request.to_currency){
      this.subs.sink= this.homeService.CreateCurrencycheckRate(request).subscribe(res => {
        if(res['status']==0){
          if(res['data']['status']==0){
          $("#createCurrency").modal("hide");
          this.alert.success(res['data']['message']);
          this.ratesList();
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
    this.currencyFB.reset();
  }
  deleteRate(id) {
    this.subs.sink=this.homeService.deleteCurrencyRate(id).subscribe((res: any) => {
      if(res['status']==0){
      if(res['data']['status'] == 0) {
        this.alert.success(res['data']['message']);
        this.ratesList();
        } else if(res['data']['status'] == 1){
      //  this.alert.error(res['data']['message']);
     }
    }
    else{
      this.alert.error(res['message'])
    }
    })
  }
  ratesList(){
    this.loader.apploader=true;
    this.convertObj = {
      "isConvert": 0
    }
    this.subs.sink=this.homeService.createCurrencyConvertor(this.convertObj).subscribe(res => {
      if(res['status']==0){
      if(res['data']['status'] == 0) {
      this.ratesData = res['data']['rates'];
      this.loader.apploader=false;
      } else if (res['data']['status']==1){
        this.loader.apploader=false;
        this.ratesData = [];
      }
    }
    else{
      this.loader.apploader=false;
      this.alert.error(res['message'])
    }
    
      });
  }
  ngOnInit() {
    this.currencyFB = this.formBuilder.group({
      from_currency: ['', Validators.required],
      to_currency: ['', Validators.required],
    });
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}

