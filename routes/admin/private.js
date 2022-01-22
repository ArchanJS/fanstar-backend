const router=require('express').Router();
const{protectAdmin}=require('../../middlewares/protect');
const {getAllArtists,getAllUsers,getAllEmployees, createArtist, blockUnblockArtist, getAnArtist, updateAnArtist, deleteAnArtist, createAnEmployee, blockUnblockEmployee, getAnEmployee, updateAnEmployee, deleteAnEmployee}=require('../../controllers/admin/private');

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

//Block-unblock artist
//Route : '/api/admin/private/blockunblockartist'
//Method : PUT
//Body : {artistId}
//Params : N/A
//Token : Yes
router.put('/blockunblockartist',protectAdmin,blockUnblockArtist);

//Get an artist
//Route : '/api/admin/private/getanartist/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getanartist/:artistId',protectAdmin,getAnArtist);

//Update an artist
//Route : '/api/admin/private/updateanartist/:artistId'
//Method : PUT
//Body : {username,phone,email,address,assignedEmployee,appName,accountNo,ifscCode,upiId}
//Params : {artistId}
//Token : Yes
router.put('/updateanartist/:artistId',protectAdmin,updateAnArtist);

//Delete an artist
//Route : '/api/admin/private/deleteanartist/:artistId'
//Method : DELETE
//Body : N/A
//Params : {artistId}
//Token : Yes
router.delete('/deleteanartist/:artistId',protectAdmin,deleteAnArtist);










//Create employee
//Route : '/api/admin/private/createemployee'
//Method : POST
//Body : {username,phone,email,address,accountNo,ifscCode,upiId}
//Params : N/A
//Token : Yes
router.post('/createemployee',protectAdmin,createAnEmployee);

//Block-unblock employee
//Route : '/api/admin/private/blockunblockemployee'
//Method : PUT
//Body : {employeeId}
//Params : N/A
//Token : Yes
router.put('/blockunblockemployee',protectAdmin,blockUnblockEmployee);

//Get an employee
//Route : '/api/admin/private/getanemployee/:employeeId'
//Method : GET
//Body : N/A
//Params : {employeeId}
//Token : Yes
router.get('/getanemployee/:employeeId',protectAdmin,getAnEmployee);

//Update an employee
//Route : '/api/admin/private/updateanemployee/:employeeId'
//Method : PUT
//Body : {username,phone,email,address,accountNo,ifscCode,upiId}
//Params : {employeeId}
//Token : Yes
router.put('/updateanemployee/:employeeId',protectAdmin,updateAnEmployee);

//Delete an employee
//Route : '/api/admin/private/deleteanemployee/:employeeId'
//Method : DELETE
//Body : N/A
//Params : {employeeId}
//Token : Yes
router.delete('/deleteanemployee/:employeeId',protectAdmin,deleteAnEmployee);

module.exports=router;