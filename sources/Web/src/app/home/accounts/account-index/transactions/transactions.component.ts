import { Component,ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import * as html2pdf from 'html2pdf.js';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transList: any;
  profileData: any;
  amount: any;
  transDate: any;
  opositeOwner: any;
  currencyData: any;
  currencyType: any;
  selCurType: any;
  selAccNo: any;
  selCurId: any = 0;
  lastMonth:any;
  sixMonth:any;
  setYear:any;
  transForm:any;
  search_currencies:any;
  from_date:any=this.addMonths(1);

  @ViewChild('content',null) content: ElementRef;
  
  filterDate = [{
      "months": "This Month",
      "date": this.addMonths(1)
    },
    {
      "months": "Last Month",
      "date": this.addMonths(1)
    },{
      "months": "Last 6 Months",
      "date": this.addMonths(6)
    },{
      "months": "Last  Year",
      "date": this.addMonths(12)
    }];
  transaction_type: any;
  currency_type: any;

 
  constructor(public _router: Router, private homeService: HomeService, private alert: NotificationService) {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
   // this.getAllTransctionList();
    this.getFilteredTransctionList()
    this.getCurrencyList();
  }
 
  getCurrencyList(){
    this.homeService.getCurrency().subscribe(res => {
      if(res['status']==0){
      if(res['data']['status']==0){
        this.currencyType = res['data']['account'];
      } else if(res['data']['status']==1){
        this.alert.error(res['data']['message']);
      } } else {
        this.alert.error(res['message'])
      }
    })
  }
  getAllTransctionList() {
    this.homeService.getAllTransctionList().subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 0) {
        this.transList = res['data']['transaction_details'];
       } else if(res['data']['status']==1) {
         this.alert.warn(res['data']['message'])
      }
      } else {
       this.alert.error(res['message']);
      }
    });
  }

  getFilteredTransctionList() {

    let obj={
      "from_date" : this.from_date,
      "currency_type" : this.selCurId==0 ? null:this.selCurId
  }
    this.homeService.getFilteredTransctionList(obj).subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 0) {
        this.transList = res['data']['transaction_details'];
       } else if(res['data']['status']==1) {
        
      }
      } else {
       this.alert.error(res['message']);
      }
    });
  }
  getCurrentTransDetails(item) {
    this.transaction_type=item.transaction_type
    this.transDate = item.created_on;
    this.amount = item.amount;
    this.opositeOwner = item.counterparty
    this.currency_type=item.currency_type
  }

  makePdf(){
    var element = document.getElementById('content');
    var opt = {
      margin:       1,
      filename:     'statement.pdf',
      image:        { type: 'pdf', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf(element, opt);
}

makealldataPdf(){

  var element = document.getElementById('contentall');
 $('.modal-scroll').css({'height':'auto'})

  // let sub = element.getElementsByClassName('modal-scroll');
  
 // element

  var opt = {
    margin:       1,
    filename:     'statement.pdf',
    image:        { type: 'pdf', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait', }
  };
  html2pdf(element, opt);


    

}

getallCurrentTransDetails(){
  $('.modal-scroll').css({'height':'57vh'})

}


setDate(datevalue){
 //  let date=Date.parse('07-12-2000')
 if(datevalue!=undefined){
  var numbers = datevalue.match(/\d+/g); 
  var date = new Date(numbers[2], numbers[1]-1, numbers[0]);
   return date.toLocaleDateString(undefined, {day:'2-digit'}) + ' ' + date.toLocaleDateString(undefined, {month:'short'}) + ' ' + date.toLocaleDateString(undefined, {year:'numeric'})
 
 }

}

addMonths(months)
{
        let perday=86400000 ;
        let dif=Date.now()-months*30*perday;
        let present= new Date(dif);
        return present.getFullYear()+'-'+ (present.getMonth()+1 )+ '-'+present.getDate();
}

}

