const router=require('express').Router();
const {login}=require('../../controllers/admin/public');

//Login
//Route : '/api/admin/public/login'
//Method : POST
//Body : {email,password}
//Params : N/A
//Token : N/A
router.post('/login',login);

module.exports=router;