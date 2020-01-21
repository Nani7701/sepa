 /**
   * Login Component
   * @package LoginComponent
   * @subpackage app\index\login\personal-login\LoginComponent
   * @author SEPA Cyber Technologies, Sayyad M.
  */
import { AuthService } from '../../../core/shared/auth.service';
import { Component, OnInit, OnDestroy } from "@angular/core";
import {Validators, FormBuilder,FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import { SubSink } from 'subsink';


@Component({
  selector: "personal-login",
  templateUrl: "./personal-login.component.html",
  styleUrls: ["./personal-login.component.scss"]
})
export class PersonalLoginComponent implements OnInit,OnDestroy {
  private subs=new SubSink()
  loginForm:FormGroup;
  loginActionActive=false;
  constructor(private fb:FormBuilder,private authService:AuthService,private routerNavigate:Router) {}
  eye=false;
  slasheye=true;
  type="password";

  eyeHide(){
    if(this.eye==false){
      this.eye=true;
      this.slasheye=false;
      this.type="text";
    }
    else{
      this.eye=false;
      this.slasheye=true;
      this.type="password";
    }
  }
  LoginAction(formData:any){
      // let data:any={
      //   "userId":formData.email,
      //   "password":formData.password,
      //   "account_type":"personal"
      // }
   
   if(this.authService.loginAction(formData)){
    this.loginActionActive=true;
  //  this.routerNavigate.navigate(['dashboard']);
   }
  }
  navigateToDashboard(){
    if(this.loginActionActive){
      this.routerNavigate.navigate(['home/account-index/getaccount']);
    }
   
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'userId': ['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'password': [null,Validators.compose([Validators.required,Validators.minLength(8)])],
      'account_type':['personal',Validators.required],
    });

    this.subs.sink=this.authService.logindata.subscribe(data => {
      this.navigateToDashboard();
    });
  }

  
  password()
  {
    this.routerNavigate.navigate(['index/forgot/personal']);
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
 

}
