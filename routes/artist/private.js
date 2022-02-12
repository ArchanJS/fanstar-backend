const router=require('express').Router();
const multer=require('multer');
const upload=multer({dest:'uploads/'});
const {protectArtist}=require('../../middlewares/protect');
const {getOwnProfile,createService,updateService,completePayment,getOwnServices,createAlbum,deleteFile,readFile,addEvent,deleteEvent,updateProfile,getService,getAllOwnFiles,getOwnPayments,changeTheme,getOwnPendingOrders,createWithdrawReq,getOwnWithdrawals,deleteService,updateAlbum,getAllOwnAlbums,getAParticularAlbum,uploadSingleImage,getOwnSingleImages,getParticularSingleImage}=require('../../controllers/artist/private');

//Get a own profile
//Route : '/api/artist/private/getownprofile'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownprofile',protectArtist,getOwnProfile);

//Get own payments
//Route : '/api/artist/private/getownpayments'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownpayments',protectArtist,getOwnPayments);

//Get own pending orders
//Route : '/api/artist/private/getownpendingorders'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownpendingorders',protectArtist,getOwnPendingOrders);

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

//Delete a service
//Route : '/api/artist/private/deleteservice/:serviceId'
//Method : DELETE
//Body : N/A
//Params : serviceId
//Token : Yes
router.delete('/deleteservice/:serviceId',protectArtist,deleteService);

//Complete a payment
//Route : '/api/artist/private/completepayment'
//Method : PUT
//Body : {paymentId,roomId}
//Params : N/A
//Token : Yes
router.put('/completepayment',protectArtist,completePayment);

//Get own services
//Route : '/api/artist/private/ownservices'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/ownservices',protectArtist,getOwnServices);

//Upload images
//Route : '/api/artist/private/createalbum'
//Method : POST
//Body : {file,albumName,caption,price}
//Params : N/A
//Token : Yes
router.post('/createalbum',protectArtist,upload.array('artistFile'),createAlbum);

//Upload an image
//Route : '/api/artist/private/uploadimage'
//Method : POST
//Body : {file,caption,price}
//Params : N/A
//Token : Yes
router.post('/uploadimage',protectArtist,upload.single('artistFile'),uploadSingleImage);

//Update an album
//Route : '/api/artist/private/updatealbum/:albumId'
//Method : PUT
//Body : {file,caption}
//Params : N/A
//Token : Yes
router.put('/updatealbum/:albumId',protectArtist,upload.array('artistFile'),updateAlbum);

//Get all own albums
//Route : '/api/artist/private/getallownalbums'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getallownalbums',protectArtist,getAllOwnAlbums);

//Get all own images
//Route : '/api/artist/private/getallownimages'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getallownimages',protectArtist,getOwnSingleImages);

//Get a particular album
//Route : '/api/artist/private/getaparticularalbum/:albumId'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getaparticularalbum/:albumId',protectArtist,getAParticularAlbum);

//Get a particular image
//Route : '/api/artist/private/getanimage/:imageId'
//Method : GET
//Body : N/A
//Params : imageId
//Token : Yes
router.get('/getanimage/:imageId',protectArtist,getParticularSingleImage);

//Read a file
//Route : '/api/artist/private/readfile/:fileKey'
//Method : GET
//Body : N/A
//Params : fileKey
//Token : Yes
router.get('/readfile/:fileKey',protectArtist,readFile);

//Read a file
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

//Change theme
//Route : '/api/artist/private/changetheme'
//Method : PUT
//Body : {theme}
//Params : N/A
//Token : Yes
router.put('/changetheme',protectArtist,changeTheme);

//Add event
//Route : '/api/artist/private/withdraw'
//Method : POST
//Body : {amount}
//Params : N/A
//Token : Yes
router.post('/withdraw',protectArtist,createWithdrawReq);

//Read a get
//Route : '/api/artist/private/getownwithdrawals'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getownwithdrawals',protectArtist,getOwnWithdrawals);

module.exports=router;