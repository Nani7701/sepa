import {
  Beneficiary
} from "../model/counterParty";

/**
 * lang_eng config
 * This is a config file, where english message responses are stored.
 * @package lang_eng
 * @subpackage sources/services/utility/lang_eng
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu
 */

export const langEngConfig = {
  message: {
    signUp: {
      success: "registratiton successfully",
      fail: "registratiton failed",
      address_update: "Status updated successfully.",
      data_update: "Data updated successfully",
      signUpError: "Something went wrong",
      contactError: "Something went wrong",
      applicant_notFound: "Applicant not found"

    },
    indexCountry: {
      error: "you have an database error in fetch country detail.",
      operationError: "Database operation error ",
      inputError: "Wrong request parameter passed or Country does not exist.",
      connError: "Error in DB connection",
      countryError: "you have an database error in fetch country detail.",
      checkRequest: "Wrong request parameter passed.",
      checkValue: "Null data passed from front end.",
      emailExist: "email already exist",
      mobileExist: "mobile already exist",
      emailAndMobileExist: "email and mobile already exist",
      fetchfail: "Fail to fetch countries currency status"
    },
    indexCurrency: {
      error: "You have an database error in fetch currency detail.",
      success: "Successfully fetched currency list",
      inputError: "Wrong request parameter passed or currencies does not exist.",
      fetchfail: "Fail to fetch currencies",
      nodata: "No currencies found"
    },
    mail: {
      subject: "Welcome to PayVoo",
      from: "sekharasahu@gmail.com",
      email_failure: "Email sending failure",
    },
    password: {
      succ: `New Password Updated successfully`,
      passchange_succ: `Password changed successfully`,
      valid_pass: `Please enter valid old password`,
      valid_new_pass: `Please enter valid  password`,
    },
    industries: {
      success: "Industries fetched successfully.",
      error: "Error while fetching restricted business list.",
      industriesEmpty: "No Industries Found",
      checklistSuccess: "Business industries checklist posted successfully",
      operationError: `Business industries checklist insertion fail`,
      operationFailure: `Business industries checklist batchInsertion fail`,
      operationConnectionFail: `Business industries checklist connection failure`,
      selectedListSuccess: `Selected business industries list fetched successfully.`,
      checklistSectorSuccess: `Business sector and selected industries detail inserted successfully.`,
      restrictedBusinessSuccess: `This industry is treated with special attention. Our support team will additionally contact you to advise what would be the next steps for opening an account.`

    },
    businessdetails: {
      success: "Company Registered successfully.",
      fail: "Company Registration failed.",
      dberror: "Error in connection",
      fetchsuccess: "Business Sector detail fetched for business",
      fetcherror: "Data not found based upon the business ",
      withoutKYB: "registered without KYB",
      businessId_notFound: "business not found",
      businessInvalid: "Company does not exist"
    },
    business_type: {
      error: "Error in type of business data fetching.",
      query_error: "No data found.",
      conn_error: "Error in database connection.",
      insert_error: "Errror in data inserting",
      success: "Type od business list fetched successfully"
    },
    sector_list: {
      success: "Business sector list fetched successfully",
      error: "Error while fetching business sector list"
    },
    kyb_status: {
      success: "Status inserted successfully.",
      error: "Error in status insertion.",
      status_error: "Error occurred while status updation. Please check business exists or column name is correct",
      isert_status: "Status does not exist for respective business. Please call the /service/post/statusInsert API first."
    },
    country: {
      status_suc: "Currency data fectched",
      status_fail: "Error while fetching.",
      success: "getCountriesList fetched successfully",
      nocountry: "There is no countries by name",
      successbyname: "get countries by name fetched successfully",
      fail: "Fail to fetch countries by name",
      invalidinput: "Invalid input details for get countries by name"

    },
    loginMessage: {
      emailNotFound: "Please, enter a valid email",
      passwordInvalid: "Please, enter a valid password",
      connectionError: "connection error ",
      mpinNotFound: "unable to login due to mpin does not exist",
      emailSuccess: "Please Verify , SandBox details sent successfully to ",
      emailFail: "Email sending Fail",
      noDataError: "Invalid Input Data",
      errorMessage: "No data found with this email",
      invalidAccountType: "invalid account type"

    },
    userDetailsMessage: {
      success: "User data found",
      fail: "Data not found",
      inValidEmail: "Username not valid"

    },
    upload: {
      fail: `Failed to upload`,
      success: `File uploded`,
      invalid: `Invalid data`

    },
    getFail: {
      fail: `Data not found`,
      success: `Data found`
    },
    transaction: {
      operationError: `Transaction countries insertion fail`,
      operationSuccess: `Transaction countries inserted successfully`,
      operationFailure: `Transaction countries batchInsertion fail`,
      operationConnectionFail: `Transaction connection failure`,
      dataEmpty: `Please provide valid business transaction details`,
      businessId_error: `Business not found`


    },

    transactionVolume: {
      success: `Data stored successfully`,
      fail: `Data failed to store`,
      error: `Connection Error`,
      fetchsuccess: "Transaction volume fetched",
      fetcheerror: "No transaction volume found based upon the businessId. ",
      country_transaction_success: "Transaction country detail fethced successfully",
      country_transaction_failed: "Transaction country detail fetching failed.",
      businessId_error: `Business not found`

    },

    payment: {
      failure: `Payment details insertion fail`,
      success: `Payment details insert successfully`,
      noDataError: `No data found with selected user `,
      successPayment: `Payment successfully done`,
      card_fail: "Some thing went wrong , fetching user card details",
      cvv_fail: "Invalid cvv",
      apiError: `Failure for api response `,
      inputError: `Payment User invalid `,
      authError: `You are unauthorized`,
      headerError: `Please provide authorization header`,
      wallet_balance_success: `Wallet balance fetched successfuly`,
      wallet_balance_error: `Error while fetching  Wallet balance`,
      wallet_applicant_id_error: `applicant not found`,
      exchange_success: "exchange rate set successfully",
      exchange_error: "Error while seting exchange.",
      alert_success: "alert rate set successfully",
      alert_error: "error while set the alert rate",
      get_alert_success: "price alert details fetched successfully",
      get_alert_fail: "failed to fetch the price alert details",
      update_alert_success: "successfully updated",
      update_alert_fail: "failed while update the record",
      delete_alert_success: "deleted successfully",
      delete_alert_fail: "failed while delete the record",
      get_success: " currency exchange details fetched succesfully",
      get_fail: "record doesn't exist with userId",
      get_id: "Error while fetching currency exchange details",
      delete_success: "currency exchange details deleted sucesfully",
      delete_fail: "Record not found ",
      delete_id: "something went wrong",
      update_success: " record updated successfully",
      update_fail: " record not updated ",
      update_data: "please enter valid data",
      card_cvv_invalid: "Please enter valid cvv",
      acc_upd_succ: 'Account Updated Successfully',
      card_success: "Card data inserted successfuly",
      err: "Error occured while inserting.",
      cardDeactiveSuccess: "Card deactivated successfuly",
      cardActiveSuccess: "Card activated successfuly",
      cardFailure: "Error while deactivating the card.",
      getcardSuccess: "Card detail fetched sucesfuly",
      getcardError: "no card found against the applican id",
      noCardFound: "No card details found against the applicant",
      trans_success: "Money transferred successfully.",
      trans_failed: "Amount addition failed",
      insufficient_balance: "Insufficient balance",
      account_deactive: "Account is deactive",
      enough_balance: "Enough balance",
      amount_deduction_success: "Amount deducted successfuly",
      amount_deduction_fail: "Amount deduction failed",
      amount_addition_success: "Amount added succesfuly",
      amount_addition_failed: "Amount addition failed",
      transaction_detail_fetch_success: "Transaction details fetched successfuly",
      transaction_detail_fetch_error: "Account OR Transaction not found",
      receiver_applicantid_success: "Receivers applicant fetched successfuly",
      receiver_applicantid_error: "Error while fetching receivers applicant",
      fullname_success: "Full name fetched successfuly",
      fullname_error: "Error while fetching Full name",
      trans_record_succ: "Transaction created successfuly",
      trans_record_fail: "Error while creating transaction record.",
      check_rate_succ: "Record created successfuly",
      check_rates_fail: "Record creation failed",
      check_rates_fail1: "Record already inserted",
      check_rates_fail2: "Please send valid data",
      check_rate_del_succ: " Record deleted successfuly",
      check_rate_del_fail: "Record not found ",
      duplicate_card_succ: "Card already added for this user",
      duplicate_card_fail: " Card not found",
      duplicate_card_query_err: "error while fetching duplicate query error",
      invalidInput: "Invalid input data for add money to walet",
      transactionFailInsert: "Some thing went wrong , While inserting transation details",
      updateAccountFail: "Some thing went wrong , While updating account details",
      failurePayment: "Not a successfull transaction",
      paymentInsertFail: "Some thing went wrong , While inserting payments details",
      errorPayment: "Some thing went wrong ,Payment Failure",
      internalError: "Some thing went wrong , service side",
      currencyConverterError: "Some thing went wrong , Fail while currency convert",
      modelsuccess: 'payment successfully done',
      modelfail: 'payment failure',
      accounterror: `Error while updating account details`,
      accounterror2: `Error while inserting account details`,
      walleterror: `Fail to add walet amount`,
      exchangeSuccessMsg: 'Successfully exchanged',
      exchangeFailMsg: 'unable to exchanged',
      noAccount: 'No account for this currency'
    },

    otp: {

      sendEmailError: "Problem While Sending otp through Email ",
      sendMobileError: "Problem While Sending otp through mobile ",
      checkValidMobile: "Please enter a correct mobile number ",
      checkEmailMobile: "Please enter email or mobile number",
      emailOtpSent: "Email Sent With Varification OTP",
      mobileOtpSent: "Message Sent With Varification OTP",
      otpsent: "OTP Sent , Please Varify",
      otpFailed: "Opt generation fail",
      otpVerified: "OTP already verified  ",
      otpExpire: "Your OTP Expired , Please request for new OTP",
      updateOtpFail: "Fail to update Otp_Status",
      otpVerifiedTrue: "OTP Successfully Verified",
      otpVerifiedFalse: "OTP Verification Fail",
      checkInput: "Please, enter a correct 6-digit code",
      checkOtp: "Please check your Otp, and Try again",
      mobile_exit: "mobile number is already registered",
      email_exit: "email is already registered"
    },

    mockingConfig: {
      success: "Sandbox user fetched successfully",
      fail: "Fail to retrive Sandbox user",
      paymentDataSuccess: "Payment details fetched successfully",
      paymentDataFail: "Payment details not found",
      paymentDataError: "Error while fetching payment details"
    },

    kycEntry: {

      success: "Successfully stored",
      fail: "Failed to store",
      failcase: "No data found",
      modelsuccess: 'successfully fetched user details',
      error: 'Error while getting user details'

    },

    kyc: {
      success: 'YOUR KYC STATUS IS : ',
      operationError: `Update kyc failure `,
      serverResponseError: `No data response from muse `,
      noDataError: `No data found with selected user `,
      apiError: `Failure for api response `,
      inputError: `User invalid `,
      authError: `You are unauthorized`,
      headerError: `Please provide authorization header`,
      internalError: `Somthing went wrong while getting response`,
      emptyResponse: `Data response empty`,
      statusMessage: `Status successfuly return`,
      invalidInput: `Input details validation failure`,
      successKyc: `Successfully return kyc details`,
      updateSuccess: `Identity process status response updated`,
      updateFail: `Identity process status response updation failure`
    },

    ident: {
      success: `IdentId already exit `,
      successIdent: `Identity response successfull`,
      failure: `IdentId not exit `,
      error: `Failure for api response `,
      authError: `You are unauthorized`,
      sanctionError: `Your KYC not procced, Due to Sanction detected`,
      noDataError: `No data found with selected user `,
      headerError: `Please provide authorization header`,
      internalError: `Somthing went wrong while getting response`,
      operationError: `Update kyc failure `,
      internalErrorUpdate: `Some thing went wrong , While updating kyc details`,
      invalidInput: `Input details validation failure`,
      userFound: `You already submitted kyc proccess`
    },

    email: {
      success: ``,
      failure: `Problem while sending OTP through email `,
      messageInitiated: `Hi, Your Kyc Process Initiated`
    },

    mobile: {
      success: `Status send to mobile number `,
      failure: `Problem while sending OTP through mobile `
    },
    notification: {
      success: `Status success while send email and mobile `,
      failure: `Status fail while send email and mobile `,
      internalError: `Fail to send notification`
    },
    currency: {
      success: `Data found`,
      fail: `No data found`,
      success1: `record deleted successfully`,
      fail1: `record not found`,
      fail2: `Please send valid data`,
      fail3: `No data found,Please add currency`,
      fail4: `Please add another currency`,
      fail5: `Currency already selected`,
      fail6: `From currency and to currency can not be same`,
      fail7: `Same exchange record exists`,
      fail8: `same alert rate record exists`
    },

    update: {
      success: `updated successfully`,
      fail: `Unable to update`,
      error: `Record is not existed.unable to update`,
      info: `Please send valid data`

    },

    insert: {
      success: `Currency account created successfully.`,
      alredy_exist: 'Currency account already exist for the user.',
      fail: `Unable to insert`,
      error: `record is already existed.unable to insert`,
      peer_contact: " record inserted",
      applicant_id_not_found: "application Id not found",
      error1: `Please send valid data`,
      error2: `Please,Enter contact details first`,
      error3: `Something went wrong`
    },
    get: {
      success: `Address Details found`,
      fail: `Data not found`,
      error: `Please give valid id`,
    },
    error: {
      error: `Connected Error`,
      invalid_user: `The user access has been revoked`,
      ErrorHandler: "Something Went Wrong",
      insertError: "error while insert the data",
      getError: "error while getting data",
      updateError: "error while update the data",
      noRecordFound: "No records found",
      contactError: "contactId doesn't exist for given businessId"
    },

    businessOwner: {
      ErrorHandler: "Something went wrong",
      success: "Registered successfully.",
      contactEmpty : "No results found with selected user",
      fail: "BusinessOwner Registration failed.",
      dberror: "Error in connection",
      getDirectorError: "Unable to get director details ",
      recordNotFound: "no record found ",
      connectionError: 'Connection Error',
      getshareHolderError: "Unable to get shareholder details ",
      directorAdded: "director added ",
      businessOwner: "business owner  added ",
      updateError: "business owner not found for update status",
      company_not_found: `company not found `,
      country_notfound: `country not found `,
      company_already_exist: `company already registered with applicant (token).  `,
      deleteError: "unable to delete",
      deleteSuccessfully: "document deleted successfully",
      shareholderAdded: "shareholder added",
      deleted: " deleted successfully",
      emailExists: "An account with this email already exists",
      inputPercentageError: "shareholder percentage must be in integer ",
      percentageError: `Maximum Percentage exceeded to add `,
      errorShareholderRange: "percentage of shareholder could not greater than 100",
      errorPercentage: "sumOf percenatge of shareholder or owner could not greater than 100",
      successPercentage: "sum of the percentage is lessthan or equal to  100",
      already_added: 'business owner already added ',
      business_reg_error: "Error while registering business without kyb.",
      StakeholderSuccess: 'Stakeholders details fetched successfully',
      StakeholderFail: 'Stakeholders details not found',
      updatebusinessOwnerStatusSuccess: 'status updated',
      registeredBusiness: 'already registered business',
      ownerSuccess: 'updated successfully',
      businessFail: 'There is no business found',
      kybidFail: 'failure fetching kyb business'
    },
    businessOwnerList: {
      success: "Fetched business owners",
      fail: "Fail to fetch business owners.",
      success1: "Business owners empty."
    },
    moneyTransfer: {
      req_objerr: 'Error in request object. Please check the keys in request object.',
      no_account_found: 'Recipient curreny wallet not found. Please make sure recipient is a PayVoo user and has required currency account.'
    },
    businessOwnerContact: {
      success: "Business owner contact",
      fail: "Fail to fetch business owner contact.",
      success1: "Business owner contact not exist.",
      businessId_not_found: "business id not found"
    },
    businessApplicant: {
      fail: "Error While insert businessApplicant ."

    },
    businessContact: {
      fail: "Error While insert businessContact .",
      selectFail: "Error While selecting businessContact ."
    },
    address_type: {
      success: "address_type fetched successfully.",
      businessAddressSuccess: "Address inserted successfully",
      businessAddressFail: "Fail to insert address",
      businessAddress: "Address missmatch , please provide valid details"
    },

    accountStatus: {
      success1: `Currency account Activated`,
      success2: `Currency account Dectivated`,
      getAccount: `Account details fetched successfully`,
      fail: `Unable to fetch account`,
      error: `Error `,
      account_notfound: " Currency accounts not found for the user.",
      defultAccError : 'Can not delete default currency account Euro (EUR).'
    },
    logger: {
      updateSuccess: 'Logger values updated successfully',
      updateFail: 'Logger values updation fail',
      internalError: 'Somthing went wrong while getting response',
      invalidInput: `Input details validation failure`,
    },
    token: {
      tokenExpired: "Your token expired, please logout and login again",
      invalid: "Please provide valid token"
    },
    contact: {
      contactSuccess: "Contact inserted successfully",
      contactFail: "Fail to insert contact",
      getContactSuccess : " Contact details found",
    },
    setting: {
      no_personal_data: 'No user data found. Please check the auth token',
      data_found: 'Personal data found',
      businessNotFound: 'No registered business found for the user.',
      businessProfileSucc: 'Business profile details fetched successfully.',
      passSucc: `Password updated successfully`,
      passMismatch: `Given password is a missmatch`
    },
    countrparty: {
      getSuccess: `Successfully get the results`,
      getFail: `No data found`,
      success: `Successfully created`,
      success1: `successfully deleted`,
      fail: `failed to create a counterParty`,
      fail1: `Invalid data`,
      fail2: `CounterParty already exist in your wallet`,
      fail3: `failed to delete`,
      info: `No data found`,
      counterPartyFailInfo:`No data found with counterParty`,
      getaccountsFailInfo:`No accounts found`      
    },
    bulkTransfer: {
      invalidTransArray: "Invalid bulk transfer array. Please chek the array_of_transaction key.",
      bulkTransferSucc: "The bulk transfer request has been successfully completed.",
      singlePayment : 'Single payment request has been successfully completed.',
      countryPartyNotAdded : `Please add the receipient user as your countryparty before making a payment.`
    },
    schedulrTrans : {
      scheduleTransSucc : `PAYMENT CREATED! {0} PAYMENTS FOR A TOTAL OF {1} {2} SCHEDULED FOR {3}`,
    }
  }
}
