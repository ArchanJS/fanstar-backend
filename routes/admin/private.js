const router=require('express').Router();
const{protectAdmin}=require('../../middlewares/protect');
const {getAllArtists,getAllUsers,getAllEmployees}=require('../../controllers/admin/private');

//Get all artists
//Route : '/api/admin/private/getallartists'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getallartists',protectAdmin,getAllArtists);

//Get all users
//Route : '/api/admin/private/getallusers'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getallusers',protectAdmin,getAllUsers);

//Get all employees
//Route : '/api/admin/private/getallemployees'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getallemployees',protectAdmin,getAllEmployees);

module.exports=router;