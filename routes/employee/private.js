const router=require('express').Router();
const {protectEmployee}=require('../../middlewares/protect');
const {getOwnProfile,updateProfile}=require('../../controllers/employee/private');

//Get a own profile
//Route : '/api/employee/private/getownprofile'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownprofile',protectEmployee,getOwnProfile);

//Update profile
//Route : '/api/employee/private/updateprofile'
//Method : PUT
//Body : {username,email,gender,profilePhoto}
//Params : N/A
//Token : Yes
router.put('/updateprofile',protectEmployee,updateProfile);


module.exports=router;