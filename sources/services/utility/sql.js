/**
 * sql utility
 * This file contains all the SQL query used in this application.
 * @package utility
 * @subpackage utility/sql
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */

export const sqlObj = {
  login: {
    authenticateQuery: `select applicant_id, {0} from applicant where {1} = '{2}' AND lower(account_type) = '{3}'`,
    getUserData: `SELECT applicant.user_id, applicant.mobile, applicant.account_type,contact.phone, contact.first_name, contact.last_name, contact.gender,
                  address.address_line1, address.address_line2, address.city, address.postal_code,
                  address.country_id, kyc.kyc_status, country.country_name from applicant
                  join contact on applicant.applicant_id = contact.applicant_id
                  join address on contact.applicant_id = address.applicant_id
                  join kyc on address.applicant_id = kyc.applicant_id
                  join country on address.country_id = country.country_id
                  where applicant.applicant_id = '{0}';`,
    getCompanyData: `select country_of_incorporation, business_legal_name from business_details where 
                      applicant_id = {0}`,
    checkInitialPayment: `select transaction_id from transactions where applicant_id = {0}`,
  },
  otp: {
    saveOtp: `insert into OTPValidator (emailOrMobile, otp, created_on) values ('{0}','{1}','{2}')`,
    updateOtp: `update OTPValidator set otp = '{0}', isVerified = 0 , created_on = '{1}' where emailOrMobile = '{2}'`,
    isExist: `select id from OTPValidator where emailOrMobile = '{0}'`,
    isExpire: `select otp, isVerified, created_on from OTPValidator where emailOrMobile = '{0}'`,
    verifyOtp: `update OTPValidator set isVerified = 1, isExpired = 0, updated_on = '{0}' where emailOrMobile = '{1}'`,
    doExpireOtp: `update OTPValidator set isExpired = 1 where emailOrMobile = '{0}'`
  },
  webTransaction: {
    getWebTrans: `SELECT transaction_id,transaction_number, transaction_type, from_account ,to_account,currency_type ,counterparty , account_type, amount, created_on FROM transactions 
                   WHERE applicant_id = {0} AND created_on BETWEEN {1} AND {2} ORDER BY created_on DESC`,
    getWebTransByAcc: `select transaction_id,transaction_number, transaction_type, from_account ,to_account,currency_type ,counterparty , account_type, amount, created_on from transactions
                        where from_account = {0} and transaction_type='DB' and created_on BETWEEN {1} AND {2}
                        UNION
                        select transaction_id,transaction_number, transaction_type, from_account ,to_account,currency_type ,counterparty , account_type, amount, created_on from transactions
                        where to_account = {3} and transaction_type='CR' and created_on BETWEEN {4} AND {5}
                        ORDER BY created_on DESC`,
  },
  settings: {
    getPersonalInfo: `SELECT applicant.user_id, applicant.mobile, contact.dob,
                       address.postal_code,address.address_line1,address.city, country.country_name, role.role_name from applicant
                       JOIN contact on applicant.applicant_id = contact.applicant_id
                       JOIN address on contact.applicant_id = address.applicant_id
                       join country on address.country_id = country.country_id
                       join role on applicant.role_id = role.role_id
                       WHERE applicant.applicant_id = {0}`,
    getBusinessId: `SELECT business_id from business_details where applicant_id = {0}`,

    getBusinessProfile: `SELECT country.country_name, business_details.business_legal_name, business_details.registration_number,
                       business_details.incorporation_date, business_type.business_type_name, business_details.trading_name,
                       business_sector_lov.business_sector_name, business_sector_details.range_of_service, business_sector_details.website
                       from business_details
                       JOIN business_sector_details ON business_details.business_id = business_sector_details.business_id
                       JOIN country ON business_details.country_of_incorporation = country.country_id
                       JOIN business_type ON business_details.business_type = business_type.business_type_id
                       JOIN business_sector_lov ON business_sector_details.business_sector = business_sector_lov.business_sector_id
                       WHERE business_details.business_id = {0}`,
    getBusinessAddress: `select address.postal_code, address.address_line1, address.city, country.country_name, address.address_type_id from address
                        JOIN country ON address.country_id = country.country_id
                        where address.applicant_id = {0}`,
    getBusinessStruct: `select count(TYPE) as total, name, email, percentage, type from kyb_business_owner 
                       where business_id = {0} AND type = 'director'
                       UNION
                       select COUNT(TYPE) as total, name, email, percentage, type from kyb_business_owner 
                       where business_id = {0} AND type = 'businessowner'`,
    getPassWord: `select password from applicant where applicant_id = '{0}'`,
    update: `update applicant set password = '{0}' where applicant_id = '{1}'`,
  },
  passwordSettings: {
    getUserId: `SELECT user_id FROM {0} WHERE user_id  = '{1}'`,
    resetpassword: `update {0} set password = '{1}' where user_id = '{2}'`,
    updatepassword: `update {0} set password = '{1}' where user_id = {2}`,
    getapplicantId: `SELECT password FROM {0} WHERE applicant_id = {1}`,
    savenewPassword: `update {1} set password = '{1}' where applicant_id = {2}`,

  },
  walletTransfer : {
    isAddedCounterparty : `select counterparty_id from user_counterparty where userId = '{0}' AND mobile = '{1}'`,
  },
  scheduleTransfer : {
    saveScheduleTransfer : `insert into scheduled_transfer (refference_number, applicant_id,transfer_time, from_currency, list_of_transaction, total_amount, do_notify, created_on)
    values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}')`,
  },
  counterparty:{
    globalSearch: `select * from (      
      SELECT DISTINCT CONCAT_WS(' ',c.first_name,c.middle_name,c.last_name) as full_name,
      c.contact_id,c.mobile ,ad.country_id,ct.country_name,c.email
      FROM contact c
      INNER JOIN applicant a ON c.applicant_id = a.applicant_id AND a.account_type ='{1}' AND a.status='{3}' AND a.applicant_id != '{6}' 
      INNER JOIN address ad ON c.applicant_id = ad.applicant_id
      INNER JOIN country ct ON ad.country_id = ct.country_id
      WHERE (CONCAT_WS(' ',c.first_name,c.middle_name,c.last_name) LIKE "%{0}%" 
      OR c.mobile LIKE "%{0}%" OR c.email LIKE "%{0}%")      
      UNION
      SELECT DISTINCT CONCAT_WS('',b.business_legal_name) as full_name,
      c.contact_id,c.mobile,ad.country_id,ct.country_name,c.email
      FROM business_details b 
      INNER JOIN applicant a ON b.applicant_id = a.applicant_id AND a.account_type = '{2}' AND a.status = '{3}' AND a.applicant_id != '{6}'
      INNER JOIN contact c ON b.applicant_id = c.applicant_id
      INNER JOIN address ad ON c.applicant_id = ad.applicant_id
      INNER JOIN country ct ON ad.country_id = ct.country_id
      WHERE (CONCAT_WS('',b.business_legal_name) LIKE "%{0}%" 
      OR c.mobile LIKE "%{0}%"  OR c.email LIKE "%{0}%")
     ) a ORDER BY full_name LIMIT {4},{5}`,
     createBeneficiary:`insert into user_counterparty (userId,counterparty,full_name,mobile,email,country,status,created_on) values ('{4}','{5}','{0}','{1}','{2}','{3}','{7}','{6}')`,
     getApplicantId:`select applicant_id from contact where mobile = '{0}' AND email = '{1}'`,
     checkData:`select counterparty_id from user_counterparty where mobile = '{0}' AND status = '{1}' AND userId = '{2}'`,
     counterPartyInfo:`select u.counterparty_id,u.full_name,u.mobile,u.email,c.country_name,a.account_no,a.currency from user_counterparty u
     INNER JOIN country c ON c.country_id = u.country
     INNER JOIN accounts a ON u.counterparty = a.applicant_id AND a.currency = '{2}' AND a.status ='{1}'
     where u.status = '{1}' AND u.userId ='{3}' AND (u.full_name LIKE '%{0}%' OR u.mobile LIKE '%{0}%' OR u.email LIKE '%{0}%') LIMIT {4},{5}`,
     deleteCounterParty:`UPDATE user_counterparty SET status='{3}',updated_on='{2}' WHERE counterparty_id='{0}' AND userId = '{1}'`,
     getCounterparty_id:`select userId from user_counterparty where counterparty_id='{0}' AND status='{2}' AND userId = '{1}'`,
     counterpartyList: `select u.counterparty_id,u.full_name,u.mobile,u.email,c.country_name,a.account_no,a.currency from user_counterparty u
     INNER JOIN country c ON c.country_id = u.country
     INNER JOIN accounts a ON u.counterparty = a.applicant_id AND a.currency = '{1}' AND a.status ='{2}'
     where u.status = '{2}' AND u.userId ='{0}'`,
     getCounterPartyId:`select counterparty_id from user_counterparty where status = '{1}' AND userId = '{0}'`,
     checkCounterParty:`select counterparty from user_counterparty where status = '{2}' AND userId = '{0}' AND mobile = '{1}'`,
     getAccounts:`select currency from accounts where applicant_id = '{0}' and status = '{1}'`
  }
}