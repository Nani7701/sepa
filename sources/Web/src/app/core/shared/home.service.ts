/**
* home service
* Allow you to define code that's accessible and reusable throughout multiple components.
* @package HomeService
* @subpackage app\core\shared\homeservice
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
export class HomeService { 
  
  userData = JSON.parse(sessionStorage.getItem('userData'))
   headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'authorization': 'barra ' + this.userData.data.Token,
     'api_access_key': this.userData.data.api_access_key,
     'client_auth': this.userData.data.client_auth,
     'member_id':  this.userData.data.member_id,
   });
   options = {
     headers: this.headers,
   }
  constructor(private dataClient: HttpclientService, private http: HttpClient) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
   }

  SubmitForKYC(): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    let headers = new HttpHeaders({
      'authorization': 'barra ' + this.userData.data.Token,
      'api_access_key': this.userData.data.api_access_key,
      'client_auth': this.userData.data.client_auth,
      'member_id':  this.userData.data.member_id,
      
    });
    let options = {
      headers: headers,
    }
    return this.http.post(HttpUrl.Ident_Id,null,options);
  }

  Bus_SubmitForKYC(applicantId): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.data.Token,
      'api_access_key': this.userData.data.api_access_key,
      'client_auth': this.userData.data.client_auth,
      'member_id':  this.userData.data.member_id,
    });
    let options = {
      headers: headers,
    }
    var obj= { applicant_id: applicantId };
    return this.http.post(HttpUrl.Ident_Id, obj, options);
  }




  IdentId(obj): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.data.Token,
      'api_access_key': this.userData.data.api_access_key,
      'client_auth': this.userData.data.client_auth,
      'member_id':  this.userData.data.member_id,
    });
    let options = {
      headers: headers,
    }

    return this.http.post(HttpUrl.Ident_Id,obj,options);
  }

  Bus_SubmitForKYCInvitaion(appId,token,api_access_key,client_auth,member_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + token,
      'api_access_key': api_access_key,
      'client_auth': client_auth,
      'member_id':  member_id,
    });
    let options = {
      headers: headers,
    }
    var obj= { applicant_id: appId };
    return this.http.post(HttpUrl.Ident_Id, obj, options);
  }
  getKYCStatus( ): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.data.Token,
      'api_access_key': this.userData.data.api_access_key,
      'client_auth': this.userData.data.client_auth,
      'member_id':  this.userData.data.member_id,
    });
    let options = {
      headers: headers,
    }
   return this.http.get(HttpUrl.KYC_Status, options);
  }
  KYClinkToMobile(mobile, email, mobilePlatform, identId): Observable<any> {
    return this.dataClient.get(HttpUrl.KYC_Link + '/' + mobile + '/' + email + '/' + mobilePlatform + '/' + identId);
  }

  //business
  submitAddr(formData) {
    return this.dataClient.post(HttpUrl.Bus_Addr_Reg, formData);
  }
  getBusSectorTypes() {
    return this.dataClient.get(HttpUrl.Bus_Sectors_Types);
  }
  submitBusTypes(formData) {
    return this.dataClient.post(HttpUrl.Save_Bus_Types, formData);
  }
  transcationVolume(formData) {
    return this.dataClient.post(HttpUrl.Trnascation_Volume, formData);
  }
  
  insertKYB() {
    return this.http.post(HttpUrl.Insert_KYB,'');
  }
  getKYBStatus() {
    return this.dataClient.get(HttpUrl.KYB_Status);
  }
  getUpdatedStatus(obj) {
    return this.dataClient.patch(HttpUrl.Update_KYB_Status,obj);
  }
  getBusinessIndustries() {
    return this.dataClient.get(HttpUrl.Business_Industries);
  }
  receivesendFromCountry(obj) {
    return this.dataClient.post(HttpUrl.Send_Receive_Payment, obj);

  }
  getDirectors(type) {
    return this.dataClient.get(HttpUrl.DirectorsShareHolder_Details+'/'+type)
  }
  getShareHolders(bus_id,type){
    return this.dataClient.get(HttpUrl.DirectorsShareHolder_Details+'/'+bus_id+'/'+type)
  }
  getAllList(type){
    return this.dataClient.get(HttpUrl.DirectorsShareHolder_Details+'/'+type)
  }
  addDirShrHolder(obj) {
    return this.dataClient.post(HttpUrl.DirectorsShareHolder_Details, obj);
  }

  submitPersonalDetails(obj) {
    return this.dataClient.post(HttpUrl.PersonalDetails, obj);
  }
  updateContact(obj) {
    return this.dataClient.put(HttpUrl.Update_Contact,obj); 
  }

  IsVerifiedDirOwnr(obj) {
    return this.dataClient.patch(HttpUrl.DirectorsShareHolder_Details, obj);
  }
  deleteOwner(id,type){
    return this.dataClient.delete(HttpUrl.DirectorsShareHolder_Details+'/'+id+'/'+type);
  }
  sendRegisterdAddressDocument(obj) {
    return this.dataClient.post(HttpUrl.Reg_Document, obj); //supporting documentation 
  }
  getRegisterdAddressDocument() {
    return this.dataClient.get(HttpUrl.Reg_Document); //supporting documentation get by id 
  }
  getRegisterdDetails() {
    return this.dataClient.get(HttpUrl.Bus_Addr_Reg); //get registered details
  }
  getDocStatus() {
    return this.dataClient.get(HttpUrl.Doc_Status); //get registered details
  }
  sendInvitationLink(obj) {
    return this.dataClient.post(HttpUrl.Send_Invitation,obj); //send invitation link
  }
  submitCard(obj){
    return this.dataClient.post(HttpUrl.Cards_Details,obj); //save card details
  }
  getCardDetails() {
    return this.dataClient.get(HttpUrl.Cards_Details); //get card details
  }
  deleteCard(obj){
    return this.dataClient.patch(HttpUrl.Cards_Details,obj); //update card details
  }
  CreateAccount(data) {
    return this.http.post(HttpUrl.Account_Details, data);
  }

  getAccount(data) {
    return this.http.get(HttpUrl.Account_Details+'/'+ data);
  }

  // Exchange api's start @sirisha 
 getcurrency(targetCurrency,fromCurrency,fromAmount){
  return this.http.get(HttpUrl.Auto_Currency_Exchange+'/'+targetCurrency+'/'+fromCurrency+'/'+fromAmount);
  // return this.http.get(`${environment.serviceUrl}`+"/service/v1/currencyExchange/"+targetCurrency+'/'+fromCurrency+'/'+fromAmount);
}
getAccountById(){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token':  this.userData.data['x-auth-token'],
  });
  let options = {
    headers: headers,
  }
  return this.http.get(HttpUrl.Account_Details,options);
}
createTransactionByCurrency(obj){
  return this.http.post(HttpUrl.transactionDetails,obj);
}
createCurrencyConvertor(obj){
  return this.http.post(HttpUrl.currency_Rate,obj);
}
createSetAlertPrice(obj){
  //  return this.http.post(HttpUrl.Auto_Currency_Exchange,obj);
  return this.http.post(HttpUrl.priceList_Details,obj);
}
getCountryDetails(): Observable<any> {
  return this.dataClient.get<any>(HttpUrl.Countries_Details);
}
getCurrencyList(): Observable<any> {
  return this.dataClient.get<any>(HttpUrl.Curreyncy_List);
}
CreateCurrencycheckRate(obj){
  return this.http.post(HttpUrl.check_Rate,obj);
}
transactionById(applicant_id){
  return this.http.get(HttpUrl.transactionDetails+'/' +applicant_id+'/'+ 'all');
}
currenceExchangedByConvertor(obj){
  return this.http.post(HttpUrl.currency_Rate,obj);
}
deleteCurrencyRate(id){
  return this.http.delete(HttpUrl.currency_Rate+'/'+id);
}
// Exchange api's end @sirisha 
getCurrency(){
  return this.dataClient.get(HttpUrl.Account_Details);
}

 currentRate(fCurrency,tCurrency,id)
 {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token':  this.userData.data['x-auth-token'],
  });
  let options = {
    headers: headers,
  }
 return this.dataClient.get(HttpUrl.Auto_Currency_Exchange+'/'+fCurrency+'/'+tCurrency+'/'+id,options)
 }

   AddCurrMoney(obj): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData.data.Token,
      'api_access_key': this.userData.data.api_access_key,
      'client_auth': this.userData.data.client_auth,
      'member_id':  this.userData.data.member_id,
    });
    let options = {
      headers: headers,
    }
   return this.http.post(HttpUrl.Add_Money, obj, options);
  }

  sendEmail(email):Observable<any> {
    return this.http.post(HttpUrl.Send_Sandbox_Email,email);
  }

  storeAppIdforKYC(obj):Observable<any>{
    return this.dataClient.post(HttpUrl.Store_AppIdForKYC,obj); //ident id entry for kyc
  }
  autoCurrencyExhan(obj){
    return this.dataClient.post(HttpUrl.Auto_Currency_Exchange,obj); //update card details
  }
  getAutoCurrencyData() {
    //return this.http.get(HttpUrl.Auto_Currency_Exchange); 
    return this.http.get(HttpUrl.priceList_Details); 
  }

  getAutoExchangeCurrencyData() {
    return this.http.get(HttpUrl.Auto_Currency_Exchange); 
    
  }

  getAccounts(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Account_Details);
  }
  getAllTransctionList(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Transcation_Details);
  }
  getFilteredTransctionList(obj): Observable<any> {
    return this.dataClient.post<any>(HttpUrl.Filtered_Transcation_Details,obj);
  }

  
  statusCurrency(): Observable<any> {
    return this.dataClient.get<any>(HttpUrl.Status_Currency);
  }
  createAccount(obj):Observable<any>{
    return this.dataClient.post(HttpUrl.Account_Details,obj); //ident id entry for kyc
  }
  ActiveDeactiveacocunt(obj) {
    return this.dataClient.patch(HttpUrl.Account_Details, obj);
  }

  industryStatus(){
    return this.dataClient.get(HttpUrl.KYB_Status,''); //industry status
  }
  getAccountsCurrency(){
    return this.dataClient.get(HttpUrl.Curreyncy_List); //account currency
  }
  getValidCardDetails(cardNumber){
    return this.dataClient.get(HttpUrl.Card_Validate+'/'+cardNumber); //card validation 
  }
  deleteAutoExchangeRecord(id){
    return this.dataClient.delete(HttpUrl.Auto_Currency_Exchange+'/'+id);

  }
  deletepriceAlertRecord(id){
    return this.dataClient.delete(HttpUrl.priceList_Details+'/'+id);

  }

  postCouterparty(obj):Observable<any> {  // Add counterparty in single and bulk
    return this.dataClient.post(HttpUrl.Add_CouterPaty, obj);
  }
  
  verifyStatus(): Observable<any> {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'barra ' + this.userData['data']['Token'],
      'api_access_key': this.userData['data']['api_access_key'],
      'client_auth': this.userData['data']['client_auth'],
      'member_id':  this.userData['data']['member_id'],
      'x-auth-token':this.userData['data']['x-auth-token']
    });
    let options = {
      headers: headers,
    }
    return this.http.get(HttpUrl.Verify_KYC,options);
  }

  getCounterParty(){
    return this.http.get(HttpUrl.counterParty, this.options);
  }
  getCounterPartyCurrencyList(id) {   
    return this.http.get(HttpUrl.counterPartyCurrencyList+'/'+id, this.options)
  }
  singleTransfer(obj) {
    return this.http.post(HttpUrl.singleTransfer,obj)
  }
} 
