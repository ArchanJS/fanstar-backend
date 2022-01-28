const router=require('express').Router();
const {protectEmployee}=require('../../middlewares/protect');
const {getOwnProfile,updateProfile,getOrdersofAnArtist, getOwnArtists,getAParticularArtist}=require('../../controllers/employee/private');

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

//Get own artists
//Route : '/api/employee/private/getownartists'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownartists',protectEmployee,getOwnArtists);

//Get particular artist
//Route : '/api/employee/private/getparticularartist/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getparticularartist/:artistId',protectEmployee,getAParticularArtist);

//Get no. of total and pending orders of an artist
//Route : '/api/employee/private/getordersofartist/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getordersofartist/:artistId',protectEmployee,getOrdersofAnArtist);


module.exports=router;