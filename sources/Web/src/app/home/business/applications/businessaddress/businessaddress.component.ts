
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
import { IndexService } from 'src/app/core/shared/index.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { ApplicationsComponent } from '../applications.component';

declare var $: any;


@Component({
  selector: 'app-businessaddress',
  templateUrl: './businessaddress.component.html',
  styleUrls: ['./businessaddress.component.scss']
})
export class BusinessaddressComponent implements OnInit {

  loadContent: boolean = true;
  busAddrTemp: boolean = true;
  operatingAddrTemp: boolean = false;
  busAddrForm: FormGroup;
  operatingAddrForm: FormGroup;
  countryData: any;
  businessSectorData: any;
  KYBStatus: any;
  userData: any;

  constructor(private fb: FormBuilder, private indexService: IndexService, private homeService: HomeService, private alert: NotificationService, private routerNavigate: Router, private application:ApplicationsComponent) {
    this.application.loadContent=false;
    this.getCountryDetails();
    this.userData=JSON.parse(sessionStorage.getItem('userData'));
  }
  getCountryDetails() {
    this.indexService.getCountryDetails().subscribe(res => {
      if(res['status']==0){
      if (res['data']['status'] == 0) {
        this.countryData = res['data']['country list'];
        let obj =  this.countryData.filter(({country_id}) => country_id == this.userData['data']['userInfo']['business_country_of_incorporation']);
        let list=obj[0];
        this.busAddrForm.patchValue({
          'country_id':list['country_id']
        })
       
      }
      else if(res['data']['status'] == 1) {
        this.alert.error(res['data']['message'])
      }
    }
    else{
      this.alert.error(res['message'])
    }
    });
  }

  submitBusAddr(formData: any) {
    formData.address_type_id = 2,
      this.homeService.submitAddr(formData).subscribe(res => {
        if (res['status'] == 0) {
          if (res['data']['status'] == 0) {
            this.alert.success(res['data']['message']);
            this.busAddrTemp = false;
            this.operatingAddrTemp = true;
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

  submitOperatingAddr(formData: any) {
    formData.address_type_id = 3;
    this.homeService.submitAddr(formData).subscribe(res => {
      if (res['status'] == 0) {
        if (res['data']['status'] == 0) {
          this.loadContent = true;
          this.operatingAddrTemp = false;
          this.alert.success(res['data']['message']);
          this.getUpdatedStatus('business_address', 2);
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

  setBusAddr(value) {
    if (value.currentTarget.checked == true) {
      this.operatingAddrForm.patchValue({
        country_id: this.busAddrForm.get('country_id').value,
        postal_code: this.busAddrForm.get('postal_code').value,
        city: this.busAddrForm.get('city').value,
        address_line1: this.busAddrForm.get('address_line1').value,
        address_line2: this.busAddrForm.get('address_line2').value,
        region: this.busAddrForm.get('region').value,
      });
    }
    else if (value.currentTarget.checked == false) {
      this.operatingAddrForm.reset();

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
          this.application.getKYBStatus();
          this.application.loadContent=true;
          this.routerNavigate.navigate(['home/application'])
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
  personalTemplate(){
    this.operatingAddrTemp=false;
    this.busAddrTemp=true;
  }

  ValidatePostal(control: AbstractControl) {
    let postalValue = control.value;
    if (postalValue == null) return null;

    let regex = new RegExp(/^[A-Za-z0-9- ]+$/);
    if (!regex.test(postalValue)) {
      return { invalidPostal: true };
    }
    else {
      let onlyNumeric = /^(?=.*[0-9- ])/;
      if (!postalValue.match(onlyNumeric)) {
        return { invalidPostal: true };
      }
    }
    return null;
  }
  ngOnInit() {
    this.busAddrForm = this.fb.group({
      'country_id': ['', Validators.required],
      'postal_code': ['', Validators.compose([Validators.required, this.ValidatePostal])],
      'city': ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z- ']+$")])],
      'address_line1': ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      'address_line2': ['', Validators.compose([Validators.pattern("^[a-zA-Z0-9' ,-]+$")])],
      'region': ['', Validators.compose([Validators.required])],
    })
    this.operatingAddrForm = this.fb.group({
      'country_id': ['', Validators.required],
      'postal_code': ['', Validators.compose([Validators.required, this.ValidatePostal])],
      'city': ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z- ']+$")])],
      'address_line1': ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      'address_line2': ['', Validators.compose([Validators.pattern("^[a-zA-Z0-9', -]+$")])],
      'region': ['', Validators.compose([Validators.required])],
    });
  }
}

