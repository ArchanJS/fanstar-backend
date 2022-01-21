const router=require('express').Router();
const{protectAdmin}=require('../../middlewares/protect');
const {getAllArtists,getAllUsers,getAllEmployees, createArtist, blockUnblockArtist}=require('../../controllers/admin/private');

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

//Create artist
//Route : '/api/admin/private/createartist'
//Method : POST
//Body : {username,phone,email,address,assignedEmployee,appName,accountNo,ifscCode,services}
//Params : N/A
//Token : Yes
router.post('/createartist',protectAdmin,createArtist);

//Blcok artist
//Route : '/api/admin/private/blockunblockartist'
//Method : PUT
//Body : N/A
//Params : {artistId}
//Token : Yes
router.put('/blockunblockartist',protectAdmin,blockUnblockArtist);

module.exports=router;