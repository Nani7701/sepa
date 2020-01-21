/**
 * personalSettings route
 * This is a route file, which contains routes for personal profile settings.
 * @subpackage sources\services\router\personalSettings
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */
import { isTokenValid } from '../router/interceptor';
import { getPersonaProfile, getBusinessProfile, settingChangePass } from '../controller/personalSettings';

 //Route for getting personal info
router.get('/service/settings/personalProfile', isTokenValid, getPersonaProfile);

//Route for getting business profile data
router.get('/service/settings/businessProfile', isTokenValid, getBusinessProfile);

//Route for changepassword in setting
router.post('/service/settings/changePassword', isTokenValid, settingChangePass);

//Router for demo GET
router.get('/', (req, res)=>{ res.send('Server is Accessable')});

 module.exports = router;