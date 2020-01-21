import { AddMoneyComponent } from './../add-money.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { AuthService } from 'src/app/core/shared/auth.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cardDetailsForm: FormGroup
  profileData: any;
  applicant_id: any;
  type: any;
  flag: boolean = false;
  cardNumber: any;
  cardValidate:boolean=true;
  monthValudation:boolean=false;
  private subs=new SubSink();


  constructor(public authService: AuthService,private fb: FormBuilder, private homeService: HomeService,  private addMoneyComp: AddMoneyComponent,private alert:NotificationService) {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
  }
  submitCard(formData: any) {
    const copiedObj = Object.assign({}, formData);
    copiedObj.card_month=copiedObj.card_exp.substring(0,2);
    copiedObj.card_year=copiedObj.card_exp.slice(-2);
    copiedObj.card_year= 20+copiedObj.card_year
    delete copiedObj["card_exp"];
    this.homeService.submitCard(copiedObj).subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 0) {
        this.alert.success(res['data']['message']);
        this.cardDetailsForm.reset();
        this.type = ''
        this.addMoneyComp.getCardDetails();
       } else if (res['data']['status'] == 1) {
         this.alert.error(res['data']['message']);
      }
    }
    else{
      this.alert.error(res['message'])
    }
    })
  }
  getCardType(cardNumber) {
    if (cardNumber.length == 4) {
      this.subs.sink=this.homeService.getValidCardDetails(cardNumber).subscribe(res => {
      if(res['status']==0){
        if (res['data']['status'] == 0) {
          this.cardValidate=false;
          this.flag = true
          this.type = res['data']['type'];
          this.cardDetailsForm.patchValue({
            'card_type': this.type
          })
          setTimeout(() => {
            this.subs.unsubscribe();
          }, 100);
        }
        else if(res['data']['status']==1) {
        this.cardValidate=true;
        this.alert.error(res['data']['message'])
          this.type = '';
        }
      }
      else{
        this.alert.error(res['message'])
      }
      })
    }
    else {
      if (this.flag) {
        this.type = this.type;
      }
      if (cardNumber.length <= 4) {
        this.type = ''
      }

    }
  }

  ngOnInit() {
    this.cardDetailsForm = this.fb.group({
      card_number: ["", Validators.compose([Validators.required, Validators.pattern('^[0-9 ]*$')])],
      card_cvv: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      name_on_card:["", Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
      card_type: ['', Validators.required],
      card_exp: ['', Validators.required],
    })

    this.cardDetailsForm.controls['card_exp'].valueChanges.subscribe(value => {
      if(value.length==2 && value>12){
       this.monthValudation=true;
      }
      else if(value.length==3  || value.length==4){
       let month=value.substring(0, 2)
       if(month>12){
        this.monthValudation=true;
       }
       else{
        this.monthValudation=false;
       }

      }
      else{
        this.monthValudation=false;
      }
    });
  }

}
