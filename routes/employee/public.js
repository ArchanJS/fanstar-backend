const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/employee/public');

//Generate OTP
//Route : '/api/employee/public/generateotp'
//Method : POST
//Body : {phone}
//Params : N/A
//Token : No
router.post('/generateotp',generateOTP);

//Verify OTP
//Route : '/api/employee/public/verify'
//Method : POST
//Body : {phone,code}
//Params : N/A
//Token : No
router.post('/verify',verify);

module.exports=router;