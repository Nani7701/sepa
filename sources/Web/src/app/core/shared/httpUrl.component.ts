/**
* http urls
* API list
* @package HttpUrl
* @subpackage app\core\shared\httpurl
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { environment } from '../../../environments/environment';
export class HttpUrl {
  public static Login_PayVoo = `${environment.serviceUrl}service/user/login`;  //login to the application
  public static Countries_Details = `${environment.serviceUrl}service/country`;  // get country details
  public static Sign_Up = `${environment.serviceUrl}service/user/registration`; // singup for personal
  public static Register_Business = `${environment.serviceUrl}service/businessRegistration`;
  public static Ident_Id = `${environment.serviceUrl}service/kyc/identity`; //submit profile for kyc varification
  public static Generate_OTP = `${environment.serviceUrl}service/generateOtp`; // create otp
  public static Verify_OTP = `${environment.serviceUrl}service/verifyOtp`; //otp varification
   public static KYC_Status = `${environment.serviceUrl}service/kyc/status`//get kyc status
  public static Verify_KYC = `${environment.serviceUrl}service/kyc/verifyKyc`//verify kyc
  public static KYC_Link = `${environment.serviceUrl}service/downloadKycLink`//send kyc link to mobile
  public static Check_Duplicate = `${environment.serviceUrl}service/user/isUserExists`//send kyc link to mobile
  public static check_Rate=`${environment.serviceUrl}service/v1/checkRate`; // create checkrate record 
  public static currency_Rate=`${environment.serviceUrl}service/v1/currencyRate`;//currency rate
  public static Reg_Without_KYB = `${environment.serviceUrl}service/businessRegistrationWithOutKyb`;//business registration own company
  public static Business_Type = `${environment.serviceUrl}service/businessType`; //business type(business)
  public static Bus_Addr_Reg = `${environment.serviceUrl}service/address`; //all types of address save
  public static Bus_Sectors_Types = `${environment.serviceUrl}service/sectorType`;//get business sectors type
  public static Save_Bus_Types = `${environment.serviceUrl}service/businessSectorIndustriesDetails`;//submit business types data
  public static Trnascation_Volume = `${environment.serviceUrl}service/transactionVolume`;//transcation volume
  public static KYB_Status = `${environment.serviceUrl}service/status`;//get dashbaord kyb status
  public static Insert_KYB = `${environment.serviceUrl}service/statusInsert`;//insert kyb status initially
  public static Update_KYB_Status = `${environment.serviceUrl}service/status`;//update kyb dashboard status
  public static Business_Industries = `${environment.serviceUrl}service/businessIndustries`;//get business industries
  public static Update_Contact = `${environment.serviceUrl}service/contact`;//update contact
  public static Send_Receive_Payment=`${environment.serviceUrl}service/countryTransaction`;//send/receive payments
  public static DirectorsShareHolder_Details=`${environment.serviceUrl}service/businessOwners`;//get direcotrs details
  public static PersonalDetails=`${environment.serviceUrl}service/businessOwner`;//add personal details
  public static Doc_Status = `${environment.serviceUrl}service/uploadstatus`;//status of supporting documenets   
  public static Reg_Document = `${environment.serviceUrl}service/upload`; // reg supporting  documentation
  public static Send_Sandbox_Email = `${environment.serviceUrl}service/v1/sandBoxDetailsEmail`; //send email sandbox
  public static Forgot_Password = `${environment.serviceUrl}service/user/forgotPassword`; //forgot password
  public static Change_password= `${environment.serviceUrl}service/changePassword`; //change password
  public static Reset_Password = `${environment.serviceUrl}service/user/resetPassword`; //reset password
  public static Send_Invitation = `${environment.serviceUrl}service/sendInvitation`; //send invitation link
  public static Business_OwnerDetails = `${environment.serviceUrl}service/businessOwnerDetails`; //business owner details send invitaion link
  public static Cards_Details = `${environment.serviceUrl}service/v1/card`; //get card details
  public static Add_Money = `${environment.serviceUrl}service/payment/addMoney`; //add money
  public static Auto_Currency_Exchange = `${environment.serviceUrl}service/v1/currencyExchange`; //save/update card details
  public static Store_AppIdForKYC = `${environment.serviceUrl}service/user/kycEntry`; //stored applicant id for kyc
  public static Account_Details = `${environment.serviceUrl}service/v1/account`; //get account details
  public static Transcation_Details = `${environment.serviceUrl}service/v1/transfer/all/web`; //get currency with datewise
  public static Status_Currency = `${environment.serviceUrl}service/v1/statusCurrency`; //currency status
  public static transactionDetails = `${environment.serviceUrl}service/v1/transfer/walletToWallet`; //without datewise
  public static Card_Validate=`${environment.serviceUrl}service/v1/validateCard`; // validating the card type
  public static Curreyncy_List =`${environment.serviceUrl}service/v1/currency`; //get currencies list
  public static Filtered_Transcation_Details = `${environment.serviceUrl}service/webTransactionDetails`; //get transaction details based on filter
  public static priceList_Details = `${environment.serviceUrl}service/v1/pricealert`; //get price alerts list

  public static Search_CouterParty = `${environment.serviceUrl}service/v1/globalsearch/0/`; // CouterParty global search

  public static Add_CouterPaty = `${environment.serviceUrl}service/v1/counterparty`; // add couterParty in single and bulk paymemts

  public static counterParty= `${environment.serviceUrl}service/v1/counterparty`; //get counterparty list
  public static counterPartyCurrencyList= `${environment.serviceUrl}service/v1/counterPartyCurrency` //get counterparty currency list
  public static singleTransfer = `${environment.serviceUrl}service/transfer/walletPayments` //single transfer
}

