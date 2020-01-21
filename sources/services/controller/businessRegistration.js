/**
 * businessRegistration Controller
 * businessRegistration is used to store business related data in business details table. 
 * @package businessRegistration
 * @subpackage controller\businessRegistration\businessRegistration
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu , Satyanarayana G
 */

"use strict";
import { config } from '../dbconfig/connection';
import { mariadb } from '../dbconfig/dbconfig';
import { BusinessRegistration } from '../model/businessRegistration';
import { getCompanyDetails, getCompanyId } from '../controller/commonCode';
import { langEngConfig as configVariable } from '../utility/lang_eng';
import { langEngConfig } from '../utility/lang_eng';
import { sqlConfig } from '../utility/sqlService';
import { BusinessSectorModel } from '../model/businessRegisterModel';
const businessSectorModel = new BusinessSectorModel();
var businessRegistration = new BusinessRegistration()

const STATUS = {
	SUCCESS: 0,
	FAILED: 1,
	EXISTS: 2
};




class Business {
	constructor(businessDetails) {
		this.country_of_incorporation = businessDetails.country_of_incorporation;
		this.business_legal_name = businessDetails.business_legal_name;
		this.trading_name = businessDetails.trading_name;
		this.registration_number = businessDetails.registration_number;
		this.incorporation_date = businessDetails.incorporation_date;
		this.business_type = businessDetails.business_type;
		this.business_sector = businessDetails.business_sector,
			this.range_of_service = businessDetails.range_of_service,
			this.website = businessDetails.website,
			this.restricted_business = businessDetails.restricted_business,
			this.selected_industries = businessDetails.selected_industries,
			this.restricted_industries = businessDetails.restricted_industries,
			this.column = businessDetails.column,
			this.value = businessDetails.value
	}
};

let _createResponse = (message, business_id, businessDetails) => {
	logger.info("_createResponse() initiated");
	return {
		message: message,
		business_country_of_incorporation: businessDetails.country_of_incorporation,
		business_legal_name: businessDetails.business_legal_name, status: STATUS.SUCCESS
	}
}

let _saveCompany = (businessInfo, arrayObj, data) => {
	logger.info("_saveCompany() initiated");
	return new Promise((resolve, reject) => {
		mariadb.createConnection(config).then(conn => {
			conn.beginTransaction().then(() => {
				logger.info("transaction initiated");
				businessRegistration.insertBusinessDetails(businessInfo).then(businessDetails => {
					let rowItems = [];
					if (_.size(arrayObj) > 0) {
						(arrayObj).forEach(function (obj) {
							let createObject = {};
							createObject.business_id = businessDetails.insertId;
							createObject.type = obj.type || " ";
							createObject.email = obj.email; 
							createObject.name = obj.name;
							createObject.status = 0;
							createObject.dob = obj.dateOfBirth || " ";
							createObject.percentage = obj.percentage || " ";
							rowItems.push(Object.values(createObject));
						});
						conn.batch(sqlConfig.signupSql.kyb_business_owner, rowItems).then((ownerInfo) => {
							if (data) {
								businessRegistration.getCompanyDetails(businessDetails.insertId, data).then((business) => {
									conn.commit();
									conn.close();
									resolve(_createResponse(langEngConfig.message.businessdetails.success, businessDetails.insertId, businessInfo));
								}, err => {
									conn.rollback(err);
									conn.close();
									logger.debug("error while get details of company");
									reject(err);
								});
							} else {
								resolve(_createResponse(langEngConfig.message.businessdetails.success, businessDetails.insertId, businessInfo));
							}
						}).catch(err => {
							conn.rollback(err);
							conn.close();
							logger.debug("error while storing data");
							reject(err);
						});
					} else {
						businessRegistration.getCompanyDetails(businessDetails.insertId, data).then(business => {
							conn.commit();
							conn.close();
							resolve(_createResponse(langEngConfig.message.businessdetails.success, businessDetails.insertId, businessInfo));
						}, err => {
							conn.rollback(err);
							conn.close();
							logger.debug("error while get details of company");
							reject(err);
						});
					}
				}, errorBusinessDetails => {
					conn.rollback(errorBusinessDetails);
					conn.close();
					logger.debug("error while storing data");
					reject(err);
				});
			});
		}).catch((err) => {
			logger.debug("error while creating connection");
			reject(err);
		});
	});
}


/**
* @desc this is for the creation of an object for bulk insert in business_owner table  
* @method _createObject 
* @param {Object} details - It contains details
* @return 
*/
let _createObject = (details) => {
	logger.info("_createObject() initiated")
	return new Promise((resolve, reject) => {
		logger.info("check the people details");
		if (details.people && (_.size(details.people.director) > 0 || _.size(details.people.shareholder) > 0)) {
			logger.info("successfully get the people details");
			var arrayObj = [];
			logger.info("check the director and shareholder details");
			if (_.size(details.people.director) > 0 || _.size(details.people.shareholder) > 0) {
				if (_.size(details.people.director) > 0) {
					logger.info("successfully get the director details");
					_.forEach(details.people.director, function (row) {
						arrayObj.push({
							"dateOfBirth": _.get(row, "dateOfBirth", ''),
							"name": _.get(row, "name", ''), "status": _.get(row, "status", ''),
							"type": "director", "email": _.get(row, "email", ''), "percentage": " "
						});
					});
				}
				if (_.size(details.people.shareholder) > 0) {
					logger.info("successfully get the shareholder details");
					_.forEach(details.people.shareholder, function (row) {
						arrayObj.push({
							"dateOfBirth": _.get(row, "dateOfBirth", ''), "name": _.get(row, "name", ''),
							"status": _.get(row, "status", ''), "type": "shareholder", "email": _.get(row, "email", ''),
							"percentage": _.get(row, "percentage", '')
						});
					});
				}
				if (_.size(details.people.director) + _.size(details.people.shareholder) == _.size(arrayObj)) {
					resolve({ "arrayObj": arrayObj, "details": details });
				}
			}
		} else {
			logger.debug("no data found");
			resolve({ "arrayObj": [], "details": details });
		}
	});
}

let _callKyb = (countryCode, legalName, businessInfo, request, response) => {
	logger.info("_callKyb() initiated");
	getCompanyId(countryCode, legalName, request).then(companyInfo => {
		logger.info("check the company data");
		if (Array.isArray(companyInfo.data) && _.size(companyInfo.data) > 0) {
			logger.info("successfully get the company id");
			getCompanyDetails(companyInfo.data[0].id, 'full', request).then((details) => {
				_createObject(details).then((arrayObj) => {
					_saveCompany(businessInfo, arrayObj.arrayObj, JSON.stringify(arrayObj.details)).then((message) => {
						return response.send(ResponseHelper.buildSuccessResponse(message, configVariable.message.businessdetails.success, STATUS.SUCCESS));
					}).catch((error) => {
						return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
					});
				});
			}).catch((error) => {
				return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
			});
		} else {
			if (companyInfo.status != 1) {
				logger.debug("failed while  get the company id");
				return response.send(ResponseHelper.buildSuccessResponse({}, companyInfo.message, STATUS.FAILED));
			} else {
				return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.businessdetails.businessInvalid, STATUS.FAILED));
			}
		}
	}).catch(errorInCountryId => {
		return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
	});
}


/**
* @desc for business registration with Kyb 
* @method businessSignUp 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code.
*/
let businessSignUp = (request, response) => {
	logger.info("businessSignUp initiated()");
	const business = new Business(request.body);
	let applicantId = request.params.applicant_id;
	business["applicant_id"] = applicantId;
	businessRegistration.checkUniqueCompany(applicantId).then(companyInfo => {
		logger.info("check the company information");
		if (_.size(companyInfo) > 0) {
			logger.info("successfully get the results");
			logger.info("company already registered");
			logger.info("resoponse send");
			return response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.registeredBusiness, STATUS.EXISTS));
		} else {
			logger.info("company not registered");
			businessRegistration.getCountryCode(business.country_of_incorporation).then(countryInfo => {
				if (countryInfo.length == 0) {
					logger.info("country not found");
					return response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.country_notfound, STATUS.FAILED));

				} else {
					logger.info("country found");
					return _callKyb(countryInfo[0].country_code, business.business_legal_name, business, request, response);
				}
			}, errorInCountryInfo => {
				return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
			});
		}
	}, (errorInCompanyInfo => {
		return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
	}));
}

/**
* @desc for business registration with Kyb
* @method businessSignUpWithoutKyb 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code.
*/
let businessSignUpWithoutKyb = (request, response) => {
	logger.info('businessSignUpWithoutKyb() initiated');
	const applicantId = request.params.applicant_id;
	const business = new Business(request.body);
	business.applicant_id = applicantId;
	logger.info('checkUniqueCompany() called');
	businessRegistration.checkUniqueCompany(applicantId).then((details) => {
		if (_.size(details) > 0) {
			response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.businessOwner.company_already_exist, STATUS.EXISTS));
		} else {
			logger.info('_saveCompany() called');
			_saveCompany(business, [], null).then(companyDetails => {
				logger.info('businessSignUpWithoutKyb() execution completed');
				response.send(ResponseHelper.buildSuccessResponse(companyDetails, langEngConfig.message.businessOwner.success, STATUS.SUCCESS));
			}, err => {
				logger.error('error businessSignUpWithoutKyb()');
				response.send(ResponseHelper.buildFailureResponse(companyDetails, langEngConfig.message.businessOwner.business_reg_error, STATUS.FAILED));
			});
		}
	}, (error) => {
		logger.error('error businessSignUpWithoutKyb()');
		response.send(ResponseHelper.buildFailureResponse(new Error(companyDetails, langEngConfig.message.businessOwner.business_reg_error)));
	});
}

/**
* @desc This function is used to get country details by country name 
* @method typeOfBusiness 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return It returns the type of business list
*/
export const typeOfBusiness = function (request, response) {
	logger.info('typeOfBusiness intiated');
	businessRegistration.typeOfBusiness()
		.then(result => {
			if (result != 0) {
				let data = _.reject(result, (resultObj) => {
					return resultObj.business_type_name == "SANDBOX";
				});
				logger.info('typeOfBusiness excution completed');
				response.send(ResponseHelper.buildSuccessResponse({ "Type Of Business": data }, langEngConfig.message.business_type.success, STATUS.SUCCESS));
			} else {
				logger.info('typeOfBusiness excution completed');
				response.send(ResponseHelper.buildSuccessResponse({ "Type Of Business": data }, langEngConfig.message.business_type.error, STATUS.FAILED));
			}
		})
		.catch(error => {
			logger.error(error)
			response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
		})
}

/**
* @desc for geting business sectors. 
* @method typeOfSector 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return It returns the type of sector list
*/
export const typeOfSector = function (request, response) {
	logger.info('typeOfSector intiated')
	businessRegistration.typeOfSector()
		.then(result => {
			logger.info('typeOfSector excution completed');
			if (result) {
				response.send(ResponseHelper.buildSuccessResponse({ "Type Of Sector": result }, langEngConfig.message.sector_list.success, STATUS.SUCCESS));
			} else {
				logger.info('typeOfSector excution completed');
				response.send(ResponseHelper.buildSuccessResponse({ "Type Of Sector": result }, langEngConfig.message.sector_list.error, STATUS.FAILED));
			}
		})
		.catch(error => {
			logger.error(error)
			response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
		})
}

/**
* @desc This function is used to get typeOfSectorAndIndustries 
* @method typeOfSectorAndIndustries 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return It returns type of sector and industries list
*/
export const typeOfSectorAndIndustries = function (request, response) {
	logger.info('typeOfSectorAndIndustries intiated')
	let applicant_id = request.params.applicant_id;
	businessRegistration.getBusinessId(applicant_id).then(result => {
		if (_.size(result) > 0) {
			businessRegistration.typeOfSectorAndIndustries(result[0].business_id)
				.then(industryData => {
					logger.info('typeOfSectorAndIndustries excution completed');
					if (_.size(industryData) > 0) {
						let data = {
							business_sector: industryData[0].business_sector,
							range_of_service: industryData[0].range_of_service,
							website: industryData[0].website,
							restricted_business: industryData[0].restricted_business,
							selected_industries: industryData[0].selected_industries
						}
						response.send(ResponseHelper.buildSuccessResponse({ "typeOfSectorAndIndustries": data }, langEngConfig.message.businessdetails.fetchsuccess, STATUS.SUCCESS));
					} else {
						logger.info('typeOfSectorAndIndustries excution completed');
						response.send(ResponseHelper.buildSuccessResponse({ "typeOfSectorAndIndustries": {} }, langEngConfig.message.businessdetails.fetcherror, STATUS.FAILED));
					}
				})
				.catch(error => {
					logger.error(error)
					response.send(ResponseHelper.buildFailureResponse(langEngConfig.message.error.ErrorHandler));
				})
		}
		else {
			logger.info('Business Id not found');
			response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.businessdetails.businessId_notFound, STATUS.FAILED));
		}
	}).catch(error => {
		logger.error(error)
		response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
	})
}

/**
* @desc This function is used  for storing sector,website,industries and services related data  
* @method postSectorAndIndustries 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return It returns message and status code
*/
let postSectorAndIndustries = (request, response) => {

	let newBusinessSectorDetails = new Business(request.body);
	let applicant_id = request.params.applicant_id;
	businessSectorModel.getBusinessId(applicant_id).then(businessId => {
		if (businessId.length > 0) {
			let business_id = businessId[0].business_id;
			businessSectorModel.postSectorAndIndustries(newBusinessSectorDetails, business_id)
				.then(result => {
					let data = {
						restricted: result.restricted
					}
					response.send(ResponseHelper.buildSuccessResponse(data, result.message, STATUS.SUCCESS));
				}).catch(error => {
					response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
				})
		}
		else {
			logger.debug('Bussiness details not found');
			response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.businessFail, STATUS.FAILED));
		}
	})
}

/**
* @desc This function is used for geting business industries.  
* @method typeOfIndustries 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return It returns business industries
*/
export const typeOfIndustries = function (request, response) {
	logger.info('typeOfIndustries initiated');
	businessRegistration.typeOfIndustries()
		.then(result => {
			if (result.length > 0) {
				logger.info('execution completed');
				response.send(ResponseHelper.buildSuccessResponse({ "Type Of Industries": result }, langEngConfig.message.industries.success, STATUS.SUCCESS));
			} else {
				logger.info('execution completed');
				response.send(ResponseHelper.buildSuccessResponse({ "Type Of Industries": result }, langEngConfig.message.industries.industriesEmpty, STATUS.FAILED));
			}
		})
		.catch(error => {
			logger.error(error)
			response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
		})

}

/**
* @desc This function is used for updating business sector details table data. 
* @method patchSectorAndIndustries 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return It returns message and status code
*/
export const patchSectorAndIndustries = function (request, response) {
	let applicant_id = request.params.applicant_id;
	let newBusinessSectorDetails = new Business(request.body);
	businessSectorModel.getBusinessId(applicant_id).then(businessId => {
		if (businessId.length > 0) {
			let business_id = businessId[0].business_id;
			businessSectorModel.patchSectorAndIndustries(newBusinessSectorDetails, business_id)
				.then(res => {
					response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.signUp.data_update, STATUS.SUCCESS));
				}).catch(err => {
					response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
				})
		}
		else {
			logger.debug('Bussiness details not found');
			response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.businessFail, STATUS.FAILED));
		}
	})



}

export {
	businessSignUp,
	businessSignUpWithoutKyb,
	postSectorAndIndustries,
	patchSectorAndIndustries
}

