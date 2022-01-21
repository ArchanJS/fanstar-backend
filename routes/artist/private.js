const router=require('express').Router();
const multer=require('multer');
const upload=multer({dest:'uploads/'});
const {protectArtist}=require('../../middlewares/protect');
const {getOwnProfile,createService,updateService,getOwnServices,uploadFile,deleteFile,readFile,addEvent,deleteEvent,updateProfile,getService,getAllOwnFiles}=require('../../controllers/artist/private');

//Get a own profile
//Route : '/api/artist/private/getownprofile'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownprofile',protectArtist,getOwnProfile);

//Update profile
//Route : '/api/artist/private/updateprofile'
//Method : PUT
//Body : {username,profilePhoto,bio}
//Params : N/A
//Token : Yes
router.put('/updateprofile',protectArtist,updateProfile);

//Create service
//Route : '/api/artist/private/createservice'
//Method : POST
//Body : {serviceName,amount,description}
//Params : N/A
//Token : Yes
router.post('/createservice',protectArtist,createService);

//Get a service
//Route : '/api/artist/private/getservice/:serviceId'
//Method : GET
//Body : N/A
//Params : serviceId
//Token : Yes
router.get('/getservice/:serviceId',protectArtist,getService);

//Update service
//Route : '/api/artist/private/updateservice'
//Method : PUT
//Body : {serviceName,amount,description}
//Params : serviceId
//Token : Yes
router.put('/updateservice/:serviceId',protectArtist,updateService);

//Get own services
//Route : '/api/artist/private/ownservices'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/ownservices',protectArtist,getOwnServices);

//Upload a file
//Route : '/api/artist/private/uploadfile'
//Method : POST
//Body : file
//Params : N/A
//Token : Yes
router.post('/uploadfile',protectArtist,upload.single('artistFile'),uploadFile);

//Read a file
//Route : '/api/artist/private/readfile/:fileKey'
//Method : GET
//Body : N/A
//Params : fileKey
//Token : Yes
router.get('/readfile/:fileKey',protectArtist,readFile);

//Read a get
//Route : '/api/artist/private/getownfiles'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownfiles',protectArtist,getAllOwnFiles);

//Delete a file
//Route : '/api/artist/private/deletefile/:fileKey'
//Method : DELETE
//Body : N/A
//Params : fileKey
//Token : Yes
router.delete('/deletefile/:fileKey',protectArtist,deleteFile);

//Add event
//Route : '/api/artist/private/addevent'
//Method : POST
//Body : {summary,startTime,endTime,location,description,colorId,attendees}
//Params : N/A
//Token : Yes
router.post('/addevent',protectArtist,addEvent);

//Delete an event
//Route : '/api/artist/private/deleteevent/:eventId'
//Method : DELETE
//Body : N/A
//Params : eventId
//Token : Yes
router.delete('/deleteevent/:eventId',protectArtist,deleteEvent);

module.exports=router;