/**
 * address Controller
 * address Controller is used for the user will able to enter the address details either
  business or operating or shipping
 * @package address
 * @subpackage controller/address/address
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */

"use strict";
import { AddressModel } from '../model/addressModel';
import { langEngConfig as configVariable, langEngConfig } from '../utility/lang_eng';
import { UserModel } from '../model/signUp';
import { BusinessOwner } from '../model/businessOwner';

const registerBusinessOwner = new BusinessOwner();

const STATUS = {
	SUCCESS: 0,
	FAILURE: 1
};

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const timeStamp = date + ' ' + time;
const userModel = new UserModel();

/**
* @desc this is for the create address. 
* @method createAddress 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code
*/
export let createAddress = (request, response) => {
	let applicant_id = request.params.applicant_id
	let addressModel = new AddressModel(request.body);
	logger.info('createAddress() initiated')
	if (applicant_id == '' || applicant_id == 'undefined') {
		logger.debug('invalid request');
		response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.info, STATUS.FAILURE));
	} else {
		if (_.toLower(request.body.account_type) == "business" && request.body.user_id) {
			userModel.getApplicantContact(request.body.user_id)
				.then(contact => {
					logger.info('getApplicantContact() success');
					if (contact[0] && contact[0].applicant_id && _.size(contact) > 0) {
						logger.info('insertAddress() triggered');
						addressModel.insertAddress(contact[0].applicant_id, addressModel.address_type_id, request.body.user_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
							if ((results.affectedRows) > 0) {
								logger.info('successfully fetech the results');
								logger.info("sent the response");
								response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddressSuccess, STATUS.SUCCESS));
							} else {
								logger.dubug("failed to insert");
								response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddressFail, STATUS.FAILURE));
							}
						}).catch(err => {
							logger.error("error while insert the data");
							return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
						});
					}
					else {
						logger.info('Applicant not found');
						response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.signUp.applicant_notFound, STATUS.FAILED));
					}
				}).catch(err => {
					response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.contactError)));
				})
		}
		else {
			logger.info("getContactId() called");
			addressModel.getContactId(applicant_id).then(results => {
				if (results.length > 0) {
					logger.info("successfully fetch the results");
					let contactId = results[0].contact_id;
					addressModel.getAddressTypeId(applicant_id, contactId, addressModel.address_type_id).then(results => {
						if (results.length > 0) {
							logger.info("successfully fetch the data");
							registerBusinessOwner.getBusinessId(applicant_id).then(data => {
								if (_.size(data[0]) > 0 && data[0].business_id) {
									registerBusinessOwner.getKybBoId(data[0].business_id).then(kycBoObj => {
										if (_.size(kycBoObj[0]) > 0 && kycBoObj[0].business_id && _.toLower(request.body.account_type) == "business") {
											registerBusinessOwner.getCompanyDetails(kycBoObj[0].business_id).then(kycBoObj => {
												if (_.size(kycBoObj) > 0) {
													let compareDetails = JSON.parse(kycBoObj[0].company_details);
													if (compareDetails && compareDetails.formattedAddress) {
														let addressCompare = compareDetails.formattedAddress;
														if (_.toLower((addressModel.postal_code).replace(' ', '')) == _.toLower((addressCompare.zip).replace(' ', '')) && _.toLower((addressModel.city).replace(' ', '')) == _.toLower((addressCompare.city).replace(' ', '')) && _.toLower((addressModel.country).replace(' ', '')) == _.toLower((addressCompare.cc).replace(' ', ''))) {
															addressModel.updateAddress(applicant_id, addressModel.address_type_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
																if ((results.affectedRows) > 0) {
																	logger.info("updated data successfully");
																	logger.info("sent the response");
																	response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.success, STATUS.SUCCESS));
																} else {
																	logger.dubug("failed to updated");
																	response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.fail, STATUS.FAILURE));
																}
															}).catch(err => {
																logger.error("error while update the data");
																response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
															});
														}
														else {
															response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddress, STATUS.FAILURE));
														}
													}
												}
											}).catch(r => {
												response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.kybidFail)));
											})
										}
										else {
											addressModel.updateAddress(applicant_id, addressModel.address_type_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
												if ((results.affectedRows) > 0) {
													logger.info("updated data successfully");
													logger.info("sent the response");
													response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.success, STATUS.SUCCESS));
												} else {
													logger.dubug("failed to updated");
													response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.fail, STATUS.FAILURE));
												}
											}).catch(err => {
												logger.error("error while update the data");
												response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
											});
											//response.send(ResponseHelper.buildFailureResponse({}, configVariable.message.businessOwner.kybidFail, STATUS.FAILED));
										}
									}).catch(r => {
										response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.kybidFail)));
									})
								}
								else {
									addressModel.updateAddress(applicant_id, addressModel.address_type_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
										if ((results.affectedRows) > 0) {
											logger.info("updated data successfully");
											logger.info("sent the response");
											response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.success, STATUS.SUCCESS));
										} else {
											logger.dubug("failed to updated");
											response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.fail, STATUS.FAILURE));
										}
									}).catch(err => {
										logger.error("error while update the data");
										response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
									});
									//response.send(ResponseHelper.buildFailureResponse({}, configVariable.message.businessOwner.businessFail, STATUS.FAILED));
								}
							}).catch(r => {
								response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.businessFail)));
							})
						} else {
							registerBusinessOwner.getBusinessId(applicant_id).then(data => {
								if (_.size(data[0]) > 0 && data[0].business_id && results.length > 0) {
									registerBusinessOwner.getKybBoId(data[0].business_id).then(kycBoObj => {
										if (_.size(kycBoObj[0]) > 0 && kycBoObj[0].kyb_bo_id) {
											registerBusinessOwner.getCompanyDetails(kycBoObj[0].kyb_bo_id).then(kycBoObj => {
												if (_.size(kycBoObj[0]) > 0 && kycBoObj[0].company_details) {
													let compareDetails = JSON.parse(kycBoObj[0].company_details);
													if (compareDetails && compareDetails.formattedAddress && (compareDetails.formattedAddress).length > 0) {
														let addressCompare = compareDetails.formattedAddress;
														if (_.toLower((addressModel.postal_code).replace(' ', '')) == _.toLower((addressCompare.zip).replace(' ', '')) && _.toLower((addressModel.city).replace(' ', '')) == _.toLower((addressCompare.city).replace(' ', '')) && _.toLower((addressModel.country).replace(' ', '')) == _.toLower((addressCompare.cc).replace(' ', ''))) {
															addressModel.insertAddress(applicant_id, addressModel.address_type_id, contactId, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
																if ((results.affectedRows) > 0) {
																	logger.info('successfully fetech the results');
																	logger.info("sent the response");
																	response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddressSuccess, STATUS.SUCCESS));
																} else {
																	logger.dubug("failed to insert");
																	response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddressFail, STATUS.FAILURE));
																}
															}).catch(err => {
																logger.error("error while insert the data");
																return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
															});
														}
														else {
															logger.dubug("Faile to add address missmatch");
															response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddress, STATUS.FAILURE));
														}
													}
												}
											}).catch(r => {
												response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.kybidFail)));
											})
										}
										else {
											addressModel.updateAddress(applicant_id, addressModel.address_type_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
												if ((results.affectedRows) > 0) {
													logger.info("updated data successfully");
													logger.info("sent the response");
													response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.success, STATUS.SUCCESS));
												} else {
													logger.info("failed to updated");
													response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.fail, STATUS.FAILURE));
												}
											}).catch(err => {
												logger.error("error while update the data",err);
												response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
											});
										//	response.send(ResponseHelper.buildFailureResponse({}, configVariable.message.businessOwner.kybidFail, STATUS.FAILED));
										}
									}).catch(r => {
										response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.kybidFail)));
									})
								}
								else {
									addressModel.insertAddress(applicant_id, addressModel.address_type_id, contactId, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
										if ((results.affectedRows) > 0) {
											logger.info('successfully fetech the results');
											logger.info("sent the response");
											response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddressSuccess, STATUS.SUCCESS));
										} else {
											logger.dubug("failed to insert");
											response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.address_type.businessAddressFail, STATUS.FAILURE));
										}
									}).catch(err => {
										logger.error("error while insert the data");
										return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
									});

									//response.send(ResponseHelper.buildFailureResponse({}, configVariable.message.businessOwner.businessFail, STATUS.FAILED));
								}
							}).catch(r => {
								response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.businessFail)));
							})
						}
					}).catch(err => {
						logger.error("error while getting data");
						return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
					});
				}
			}).catch(err => {
				logger.error("error while getting data");
				return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
			});
		}
	}
};

/**
* @desc get the details of respective person. 
* @method getAddressDetails 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return address details of person
*/
export let getAddressDetails = (request, response) => {
	let addressModel = new AddressModel(request.params);
	logger.info('getDetails initiated');
	let applicantId = addressModel.applicant_id;
	if (applicantId == '' && applicantId != 'undefined') {
		logger.debug('invalid request');
		return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.info, STATUS.FAILURE));
	} else {
		logger.info("getAddressDetails() initiated")
		addressModel.getAddressDetails(applicantId).then(results => {
			if ((_.size(results)) > 0) {
				logger.info("successfully fetch the data");
				response.send(ResponseHelper.buildSuccessResponse({ addressDetails: results }, langEngConfig.message.get.success, STATUS.SUCCESS));
			} else {
				logger.dubug("failed while getting data");
				response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.get.fail, STATUS.FAILURE));
			}
		}).catch(err => {
			logger.error("error while getting data");
			response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
		});
	}
}

/**
* @desc Update address of the respective person.
* @method updateAddress 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code.
*/
export let updateAddress = (request, response) => {
	let applicant_id = request.params.applicant_id;
	let addressModel = new AddressModel(request.body);
	logger.info('updateAddress() initiated')
	if (applicant_id != 'undefined' && applicant_id && addressModel.address_type_id && addressModel.address_type_id != 'undefined') {
		addressModel.updateAddress(applicant_id, addressModel.address_type_id, addressModel.country_id, addressModel.postal_code, addressModel.address_line1, addressModel.address_line2, addressModel.city, addressModel.region, timeStamp).then(results => {
			if ((results.affectedRows) > 0) {
				logger.info("data updated successfully");
				logger.info("sent the response");
				response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.success, STATUS.SUCCESS));
			} else {
				logger.info("unable to update");
				response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.fail, STATUS.FAILURE));
			}
		}).catch(err => {
			logger.error("error while update the data")
			return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
		});
	} else {
		logger.debug("invalid request");
		response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.update.info, STATUS.FAILURE));
	}
}

/**
* @desc Method for fetching all the address_type available.
* @method getAddressType 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return list of address types.
*/
export let getAddressType = (request, response) => {
	let addressModel = new AddressModel(request);
	logger.info('getAddressType() initiated')
	addressModel.getAddressType().then(res => {
		logger.info("response sent")
		response.send(ResponseHelper.buildSuccessResponse({ address_type: res }, langEngConfig.message.address_type.success, STATUS.SUCCESS))
	}).catch(err => {
		logger.error("error while getting data");
		response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
	})
}