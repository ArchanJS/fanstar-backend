const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/login/login');

//Generate OTP
//Route : '/api/login/generateotp'
//Method : POST
//Body : {phone}
//Params : N/A
//Token : No
router.post('/generateotp',generateOTP);

//Verify OTP
//route : '/api/login/verify'
//Method : POST
//Body : {phone,code}
//Params : N/A
//Token : No
router.post('/verify',verify);

module.exports=router;