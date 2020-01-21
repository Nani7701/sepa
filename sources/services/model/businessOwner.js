/**
 * businessModel
 * this is used for the insert  the business details of person in database and get the data from database
 * @package businessModel
 * @subpackage model/businessModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */


import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class BusinessOwner {
  constructor() {

  }
  // this method is used for creating different types of business owners like(Director/Shareholder/Ultimate Benificial Owner)

  saveApplicant(type) {
    return new Promise((resolve, reject) => {
      logger.info('initialize saveApplicant() ');
      let sql = `insert into applicant (account_type) values ('${type}')`;
      DbInstance.executeQuery(sql).then(userData => {
        logger.info('success in  saveApplicant() ');
        resolve(userData);
      }).catch(err => {
        logger.error('error  in  saveApplicant() ');
        reject(err);
      });
    });
  }

  saveContact(applicant_id, ownerDetails) {
    return new Promise((resolve, reject) => {
      logger.info('initialize saveContact() ');
      let sql = `insert into contact (applicant_id,first_name,last_name,email,gender,dob,mobile) values (${applicant_id},'${ownerDetails.first_name}','${ownerDetails.last_name}','${ownerDetails.email}','${ownerDetails.gender}','${ownerDetails.dob}','${ownerDetails.mobile}')`;
      DbInstance.executeQuery(sql).then(userData => {
        logger.info('success in  saveContact() ');
        resolve(userData);
      }).catch(err => {
        logger.error('error in  saveContact() ');
        reject(err);
      });
    });
  }

  saveBusinessOwner(contact_id, ownerDetails) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  saveBusinessOwner() ');
      let sql = `insert into business_owner (business_id ,contact_id ,business_owner_type,percentage) values(${ownerDetails.business_id},${contact_id},'${ownerDetails.business_owner_type}','${ownerDetails.percentage}')`;
      DbInstance.executeQuery(sql).then(userData => {
        logger.info('success in  saveBusinessOwner() ');
        resolve(userData);
      }).catch(err => {
        logger.error('error in  saveBusinessOwner() ');
        reject(err);
      });
    });
  }

  // this method is used for get all the director 
  getStakeholdersInfo(id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getStakeholdersInfo() ');
      let sql = `select * from kyb_business_owner where business_id = ${id}`;
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in  getStakeholdersInfo() ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in  getStakeholdersInfo() ');
        reject(err);
      });
    });
  }

  // this method is used for get all the director 
  getStakeholdersContactInfo(id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getStakeholdersContactInfo() ');
      let sql = `select applicant_id , email , contact_id from contact where contact_id IN (select contact_id from business_owner where business_id = ${id})`;
      DbInstance.executeQuery(sql).then(contactDetails => {
        logger.info('success in  getStakeholdersContactInfo() ');
        resolve(contactDetails);
      }).catch(err => {
        logger.error('error in  getStakeholdersContactInfo() ');
        reject(err);
      });
    });
  }
  // kyc details all
  getKycDetails(applicants) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getKycDetails() ');
      let sql = `select applicant_id , kyc_status ,kyc_transaction_id , kyc_vendor_id from kyc where applicant_id  ${applicants.length > 0 ? 'IN ('+ applicants +')' : '= 0'} `;
      DbInstance.executeQuery(sql).then(contactDetails => {
        logger.info('success in  getKycDetails() ');
        resolve(contactDetails);
      }).catch(err => {
        logger.error('error in  getKycDetails() ');
        reject(err);
      });
    });
  }
// address details 
  getAddressDetails(applicants) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getAddressDetails() ');
      let sql = `select applicant_id , contact_id from address where applicant_id  ${applicants.length > 0 ? 'IN ('+ applicants +')' : '= 0'} `;
      DbInstance.executeQuery(sql).then(addressDetails => {
        logger.info('success in  getAddressDetails() ');
        resolve(addressDetails);
      }).catch(err => {
        logger.error('error in  getAddressDetails() ');
        reject(err);
      });
    });
  }

  // get business owners list by contact_id
  getBusinessOwnersById(id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getBusinessOwnersById() ');
      let sql = `SELECT bo.business_id , CONCAT_WS(' ',c.first_name,c.last_name) as fullName ,c.contact_id
        FROM business_owner bo JOIN contact c ON c.contact_id = bo.contact_id WHERE bo.business_id = ${id} ORDER BY c.contact_id`;
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in  getBusinessOwnersById() ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in  getBusinessOwnersById() ');
        reject(err);
      });
    });
  }

  getKybBusinessOwner(id, mail) {
    return new Promise((resolve, reject) => {
      logger.info('initialize getKybBusinessOwner() ');
      var sql;
      if (mail) {
        sql = `select email, type from kyb_business_owner where email = '${mail}' and business_id = ${id}`;
      } else {
        sql = `select email, percentage from kyb_business_owner where business_id = ${id} and type = 'shareholder'`
      }
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in  getKybBusinessOwner() ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in  getKybBusinessOwner() ');
        reject(err);
      });
    });
  }

  saveKybBusinessOwner(businessId, type, email, name, status, dob, percentage) {
    return new Promise((resolve, reject) => {
      logger.info('initialize saveKybBusinessOwner ');
      let sql = `insert into kyb_business_owner (business_id,type,email,name,status,dob, percentage) values(${businessId},'${type}','${email}','${name}',${status},'${dob}','${percentage}')`;
      DbInstance.executeQuery(sql).then(ownerDetails => {
        logger.info('success in saveKybBusinessOwner ');
        resolve(ownerDetails);
      }).catch(err => {
        logger.error('error in saveKybBusinessOwner ');
        reject(err);
      });
    });
  }

  //get business owners list by contact_id
  getBusinessOwnersByCId(id) {
    return new Promise((resolve, reject) => {
      logger.info(' initialize getBusinessOwnersByCId()');
      let sql = `SELECT  bo.business_owner_type , c.first_name ,c.last_name ,c.contact_id
    FROM business_owner bo JOIN contact c ON c.contact_id = bo.contact_id WHERE bo.contact_id = ${id}`;
      DbInstance.executeQuery(sql).then(getContact => {
        logger.info('success in getBusinessOwnersByCId()');
        resolve(getContact);
      }).catch(err => {
        logger.error('error in getBusinessOwnersByCId()');
        reject(err);
      });
    });
  }

  // update status of shareholder and directors
  updateBusinessOwnerStatus(id, type) {
    return new Promise((resolve, reject) => {
      logger.info('initialize updateBusinessOwnerStatus() ');
      let sql = `update kyb_business_owner set status='${type}' where kyb_bo_id = ${id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in  updateBusinessOwnerStatus() ');
        resolve(status);
      }).catch(err => {
        logger.error('error in  updateBusinessOwnerStatus() ');
        reject(err);
      });
    });
  }

  // update  status of shareholder and directors in the list
  updateBusinessOwner(ownerDetails, kyb_owner_id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize updateBusinessOwner() ');
      let sql = `update kyb_business_owner set type = '${ownerDetails.business_owner_type}' , email ='${ownerDetails.email}' , name='${ownerDetails.name}',status= '${ownerDetails.status}', dob='${ownerDetails.dob}', percentage ='${ownerDetails.percentage}' where kyb_bo_id = ${kyb_owner_id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in updateBusinessOwner() ');
        resolve(status);
      }).catch(err => {
        logger.error('error  in updateBusinessOwner() ');
        reject(err);
      });
    });
  }

  // this method is used to add shareholder
  deleteBusinessOwnerKyb(id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize   deleteBusinessOwnerKyb() ');
      let sql = `delete from kyb_business_owner  where kyb_bo_id = ${id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in  deleteBusinessOwnerKyb() ');
        resolve(status);
      }).catch(err => {
        logger.error('error in  deleteBusinessOwnerKyb() ');
        reject(err);
      });
    });
  }

  getKybBoId(business_id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getKybBoId() ');
      let sql = `select business_id from kyb_business_owner where business_id= ${business_id}`;
      DbInstance.executeQuery(sql).then(kyb_business_id => {
        logger.info('success in  getKybBoId() ');
        resolve(kyb_business_id);
      }).catch(err => {
        logger.error('error in  getKybBoId() ');
        reject(err);
      });
    })
  }

  getBusinessOwnerDetails(kyb_bo_id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getBusinessOwnerDetails() ');
      let sql = `select type, email, name, dob, percentage, type from kyb_business_owner where kyb_bo_id = ${kyb_bo_id}`;
      DbInstance.executeQuery(sql).then(status => {
        logger.info('success in  getBusinessOwnerDetails() ');
        resolve(status);
      }).catch(err => {
        logger.error('error in  getBusinessOwnerDetails() ');
        reject(err);
      });
    });
  }

  getBusinessId(applicant_Id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getBusinessId() ');
      let sql = `SELECT business_id FROM business_details WHERE applicant_id = ${applicant_Id}`;
      DbInstance.executeQuery(sql).then(businessInfo => {
        logger.info('success in  getBusinessId() ');
        resolve(businessInfo);
      }).catch(err => {
        logger.error('error in  getBusinessId() ');
        reject(err);
      });
    });
  }

  getBusinessOwnerId(applicant_Id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getBusinessOwnerId() ');
      let sql = `SELECT business_id FROM business_owner WHERE contact_id = ${applicant_Id}`;
      DbInstance.executeQuery(sql).then(businessInfo => {
        logger.info('success in  getBusinessOwnerId() ');
        resolve(businessInfo);
      }).catch(err => {
        logger.error('error in  getBusinessOwnerId() ');
        reject(err);
      });
    });
  }


  getContactId(applicant_Id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getContactId() ');
      let sql = `SELECT contact_id FROM contact WHERE applicant_id = ${applicant_Id}`;
      DbInstance.executeQuery(sql).then(businessInfo => {
        logger.info('success in  getContactId() ');
        resolve(businessInfo);
      }).catch(err => {
        logger.error('error in  getContactId() ');
        reject(err);
      });
    });
  }

  getContactByUser(email) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getContactByUser() ');
      let sql = `SELECT contact_id,applicant_id FROM contact WHERE  email = '${email}'`;
      DbInstance.executeQuery(sql).then(cantactInfo => {
        logger.info('success in  getContactByUser() ');
        resolve(cantactInfo);
      }).catch(err => {
        logger.error('error in  getContactByUser() ');
        reject(err);
      });
    });
  }


  getPercentage(business_id) {
    return new Promise((resolve, reject) => {
      logger.info('getPercentage() intiated ');
      let sql = `select sum(percentage) as 'percentage' from kyb_business_owner where business_id=${business_id} and type != 'director'`;
      DbInstance.executeQuery(sql).then(percentageSum => {
        logger.info('query executed');
        resolve(percentageSum);
      }).catch(err => {
        logger.error('error while getting sum of percentage');
        reject(err);
      })
    })
  }

  getCompanyDetails(businessId) {
    return new Promise((resolve, reject) => {
      logger.info('getCompanyDetails() Initiated')
      let sql = `select company_details from kyb_company_details where kyb_business_id  = ${businessId}`;
      DbInstance.executeQuery(sql)
        .then(result => {
          logger.info('getCompanyDetails() Successfully Exited')
          resolve(result);
        })
        .catch(err => {
          logger.info('getCompanyDetails() Exited')
          reject(err);
        })
    })
  }

  insertKycDetails(applicantId) {
		return new Promise((resolve, reject) => {
			let sql = `insert into kyc (applicant_id) values (${applicantId})`;
			DbInstance.executeQuery(sql).then(kycResult => {
				resolve(kycResult);
			}).catch(err => {
				reject(err);
			})
		})
	}
}

// getKybBusinessDetails(business_id) {
//   return new Promise((resolve, reject) => {
//     logger.info('getKybBusinessDetails() intiated ');


//     let sql = `select sum(percentage) as 'percentage' from kyb_business_owner where business_id=${business_id} and type != 'director'`;
//     DbInstance.executeQuery(sql).then(percentageSum => {
//       logger.info('query executed');
//       resolve(percentageSum);
//     }).catch(err => {
//       logger.error('error while getting getKybBusinessDetails');
//       reject(err);
//     })
//   })
// }
//}



// 4913db20-f3e1-11e9-b117-91ac0161f2371571648453