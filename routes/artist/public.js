const router=require('express').Router();
const {generateOTP,verify}=require('../../controllers/artist/public');

//Generate OTP
//Route : '/api/artist/public/generateotp'
//Method : POST
//Body : {phone}
//Params : N/A
//Token : N/A
router.post('/generateotp',generateOTP);

//Verify OTP
//route : '/api/artist/public/verify'
//Method : POST
//Body : {phone,code}
//Params : N/A
//Token : N/A
router.post('/verify',verify);

module.exports=router;