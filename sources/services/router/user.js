import { registerUser, kycEntry, isUserExists, sendSandboxDetails} from '../controller/signUp1';
import { forgotPassword, resetPassword, updatePassword } from '../controller/password1';
import {changePassword} from '../controller/password1'
import { loginUser } from '../controller/login1';
import { isTokenValid } from './interceptor'

// route for password
router.post("/service/user/forgotPassword",  forgotPassword)
router.post("/service/user/resetPassword",  resetPassword);
router.post("/service/user/forgotPassword/:type/:code", updatePassword);
router.post("/service/user/changePassword", isTokenValid, changePassword);

//Service for user registration.
router.post('/service/user/registration',isTokenValid, registerUser);
//Service for checking email or phone number given by user already exist or not
router.post('/service/user/isUserExists',isTokenValid, isUserExists);

// service for user Login
router.post('/service/user/login',isTokenValid, loginUser);
router.post('/service/user/kycEntry', kycEntry)

//route for sending email to send box user
router.post('/service/v1/sandBoxDetailsEmail',isTokenValid, sendSandboxDetails);

module.exports = router;
