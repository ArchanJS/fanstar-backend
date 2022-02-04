const router=require('express').Router();
const{protectAdmin}=require('../../middlewares/protect');
const {getAllArtists,getAllUsers,getAllEmployees, createArtist, blockUnblockArtist, getAnArtist, updateAnArtist, deleteAnArtist, createAnEmployee, blockUnblockEmployee, getAnEmployee, updateAnEmployee, deleteAnEmployee,getAllPayments,getOrdersofAnArtist,getPaymentOfAnArtist, getListOfArtist, getArtistsOfAnEmployee,getTotalSubscribers,getTotalAppVisits,generateTokenOfAnArtist,getListOfEmployees,getPaymentsOfArtistsOfAnEmployee,getAllPaymentsOfUsers,updateArtistBalance}=require('../../controllers/admin/private');

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

//Get all payments
//Route : '/api/admin/private/getallpayments'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.post('/getallpayments',protectAdmin,getAllPayments);

//Get no. of total and pending orders of an artist
//Route : '/api/admin/private/getordersofartist/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getordersofartist/:artistId',protectAdmin,getOrdersofAnArtist);

//Get payments of a particular artist
//Route : '/api/admin/private/getpayments/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getpayments/:artistId',protectAdmin,getPaymentOfAnArtist);

//Get list of artists
//Route : '/api/admin/private/getlistofartists'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.post('/getlistofartists',protectAdmin,getListOfArtist);

//Get artists of an employee
//Route : '/api/admin/private/getartistofanemployee/:employeeId'
//Method : GET
//Body : N/A
//Params : {employeeId}
//Token : Yes
router.get('/getartistsofanemployee/:employeeId',protectAdmin,getArtistsOfAnEmployee);

//Get total subscribers
//Route : '/api/admin/private/gettotalsubscribers'
//Method : GET
//Body : N/A
//Params : {employeeId}
//Token : Yes
router.get('/gettotalsubscribers',protectAdmin,getTotalSubscribers);

//Get total app visits
//Route : '/api/admin/private/gettotalappvisits'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/gettotalappvisits',protectAdmin,getTotalAppVisits);

//Generate token of an artist
//Route : '/api/admin/private/generatetokenofanartist/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/generatetokenofanartist/:artistId',protectAdmin,generateTokenOfAnArtist);

//Get list of employees
//Route : '/api/admin/private/getlistofemployees'
//Method : POST
//Body : N/A
//Params : N/A
//Token : Yes
router.post('/getlistofemployees',protectAdmin,getListOfEmployees);

//Get payments of artists of an employee
//Route : '/api/admin/private/getpaymentsofartistsofemployee/:employeeId'
//Method : GET
//Body : N/A
//Params : {employeeId}
//Token : Yes
router.get('/getpaymentsofartistsofemployee/:employeeId',protectAdmin,getPaymentsOfArtistsOfAnEmployee);

//Get all payments of all users
//Route : '/api/admin/private/getallpaymentsofusers'
//Method : POST
//Body : {field}
//Params : N/A
//Token : Yes
router.post('/getallpaymentsofusers',protectAdmin,getAllPaymentsOfUsers);

//Update an artist's balance
//Route : '/api/admin/private/updateanartistbalance'
//Method : PUT
//Body : {artistId,amount}
//Params : N/A
//Token : Yes
router.put('/updateanartistbalance',protectAdmin,updateArtistBalance);



module.exports=router;