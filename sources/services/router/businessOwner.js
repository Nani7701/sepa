
/**
 * businessOwner route
 * This is a route file, where all the businessOwner related services are defined. 
 * @package businessOwner
 * @subpackage sources\services\router\businessOwner
 * @author SEPA Cyber Technologies, Tarangini Dola , Satyanarayana G
 */

"use strict";

import { saveBusinessOwner, getStakeholdersInfo, getBusinessOwnersById, addBusinessOwner, getBusinessOwnersByCId, updateBusinessOwnerStatus, updateBusinessOwner, deleteBusinessOwnerKyb, getBusinessOwnerDetails } from '../controller/businessOwner';
import { isTokenValid } from './interceptor'

router.post('/service/businessOwner',isTokenValid, saveBusinessOwner);
router.get('/service/businessOwners/:type', isTokenValid, getStakeholdersInfo);
router.get('/service/businessOwnersList', isTokenValid, getBusinessOwnersById);
router.post('/service/businessOwners', isTokenValid, addBusinessOwner);// by list
router.get('/service/businessOwnersContact', isTokenValid, getBusinessOwnersByCId);
router.patch('/service/businessOwners', isTokenValid, updateBusinessOwnerStatus);
router.put('/service/businessOwners', isTokenValid, updateBusinessOwner);
router.delete('/service/businessOwners/:bo_id/:type', isTokenValid, deleteBusinessOwnerKyb);
router.post('/service/businessOwnerDetails', getBusinessOwnerDetails);

//router.get('/service/businessOwners/:id/:type',isTokenValid, getStakeholdersInfo);
//router.get('/service/businessOwners/:business_id',isTokenValid, getBusinessOwnersById);
//router.post('/service/businessOwners',isTokenValid, addBusinessOwner);
//router.get('/service/businessOwnersContact/:contact_id',isTokenValid, getBusinessOwnersByCId);
//router.patch('/service/businessOwners', updateBusinessOwnerStatus);
//outer.put('/service/businessOwners', updateBusinessOwner);
//router.delete('/service/businessOwners/:kyb_document_id/:type', deleteBusinessOwnerKyb);

module.exports = router;
