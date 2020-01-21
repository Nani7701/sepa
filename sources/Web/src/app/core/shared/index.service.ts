/**
* Index Service
* Allow you to define code that's accessible and reusable throughout multiple components.
* @package IndexService
* @subpackage app\core\shared\indexservice
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpclientService } from './httpclient.service'
import { HttpUrl } from './httpUrl.component'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IndexService {

  public isSmsVerified: boolean;

  constructor(private dataClient: HttpclientService,private http: HttpClient) { }

  getCountryDetails(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Countries_Details);
  }
  createOTP(val): Observable<any> {
    let obj={referenceValue  :val}
    return this.dataClient.post<any>(HttpUrl.Generate_OTP,obj);
  }
  
  verifyOTP(OTP,val): Observable<any> {
    let obj={otpReference:OTP,referenceValue  :val}
    return this.dataClient.post<any>(HttpUrl.Verify_OTP,obj);
  }

  registration(signUpData): Observable<any> {
    return this.dataClient.post(HttpUrl.Sign_Up, signUpData);
  }

  duplicateEmailMobile(obj): Observable<any> {
    return this.dataClient.post(HttpUrl.Check_Duplicate, obj);
  }
  
  getBusinessType(): Observable<any> {
     let headers = new HttpHeaders({
     'content-Type': 'application/json',
     'x-auth-token': sessionStorage.getItem('x-auth-token')
    });
    let options = {
      headers: headers,
    }
    return this.http.get(HttpUrl.Business_Type, options)
  }

  registerBusiness(formData): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' +sessionStorage.getItem('Token'),
      'api_access_key': sessionStorage.getItem('api_access_key'),
      'member_id':  sessionStorage.getItem('member_id'),
      'client_auth':sessionStorage.getItem('client_auth'),
    });
    let options = {
      headers: headers,
    }
    return this.http.post(HttpUrl.Register_Business,formData,options);
  }

  saveCompanywithoutKYB(obj): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' +sessionStorage.getItem('Token'),
      'api_access_key': sessionStorage.getItem('api_access_key'),
      'member_id':  sessionStorage.getItem('member_id'),
      'client_auth':sessionStorage.getItem('client_auth'),
    });
    let options = {
      headers: headers,
    }
    return this.http.post(HttpUrl.Reg_Without_KYB,obj,options);
  }

  forgotPassword(obj): Observable<any> {
    return this.dataClient.post(HttpUrl.Forgot_Password,obj);
  }

  checkPassword(obj):Observable<any> {
    return this.dataClient.post(HttpUrl.Reset_Password,obj)
  }
  getPersonalDetails(obj) {
    return this.dataClient.get(HttpUrl.Business_OwnerDetails+'/'+obj); 
  }

  isVerified() {
    this.isSmsVerified = true;
  }
 
}