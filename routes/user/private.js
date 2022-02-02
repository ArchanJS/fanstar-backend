const router=require('express').Router();
const {buyServices,order,capture,buyAlbum,getArtist,getAService,readFile,getOwnDetails,getAlbum,giveFeedback,removeAlbumAccess,getAlbumTimestamp,subscribe, unsubscribe,getServiceWithName,completePayment}=require('../../controllers/user/private');
const {protectUser}=require('../../middlewares/protect');

//Get own details
//Route : '/api/user/private/getowndetails'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getowndetails',protectUser,getOwnDetails);

//Get an artist
//Route : '/api/user/private/getartist/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getartist/:artistId',getArtist);

//Get an album
//Route : '/api/user/private/getalbum/:albumId'
//Method : GET
//Body : N/A
//Params : {albumId}
//Token : Yes
router.get('/getalbum/:albumId',protectUser,getAlbum);

//Get a service
//Route : '/api/user/private/getaservice/:serviceId'
//Method : GET
//Body : N/A
//Params : {serviceId}
//Token : Yes
router.get('/getaservice/:serviceId',protectUser,getAService);

//Buy service
//Route : '/api/user/private/buyservice'
//Method : PUT
//Body : { serviceId,username,email,phone,insta }
//Params : N/A
//Token : Yes
router.put('/buyservice',protectUser,buyServices);

//Recharge wallet (order)
//Route : '/api/user/private/order/:amount'
//Method : GET
//Body : N/A
//Params : {amount}
//Token : Yes
router.get('/order/:amount',protectUser,order);

//Recharge wallet (capture)
//Route : '/api/user/private/capture/:paymentId'
//Method : POST
//Body : {amount}
//Params : {paymentId}
//Token : Yes
router.post('/capture/:paymentId',protectUser,capture);

//Read image of an artist
//Route : '/api/user/private/readimage/:fileKey'
//Method : GET
//Body : N/A
//Params : {fileKey}
//Token : Yes
router.get('/readimage/:fileKey',protectUser,readFile);

//Buy an album
//Route : '/api/user/private/buyalbum'
//Method : POST
//Body : {albumId}
//Params : N/A
//Token : Yes
router.post('/buyalbum',protectUser,buyAlbum);

//Get the timestamp, when the user accessed the album
//Route : '/api/user/private/getalbumtimestamp'
//Method : GET
//Body : N/A
//Params : {albumId}
//Token : Yes
router.get('/getalbumtimestamp/:albumId',protectUser,getAlbumTimestamp);

//Remove album access
//Route : '/api/user/private/removealbumaccess'
//Method : PUT
//Body : {albumId}
//Params : N/A
//Token : Yes
router.put('/removealbumaccess',protectUser,removeAlbumAccess);

//Give feedback
//Route : '/api/user/private/givefeedback'
//Method : PUT
//Body : {artistId,stars,message}
//Params : N/A
//Token : Yes
router.post('/givefeedback',protectUser,giveFeedback);

//Subscribe to a user's album
//Route : '/api/user/private/subscribe'
//Method : PUT
//Body : {artistId}
//Params : N/A
//Token : Yes
router.put('/subscribe',protectUser,subscribe);

//Unsubscribe to a user's album
//Route : '/api/user/private/unsubscribe'
//Method : PUT
//Body : {artistId}
//Params : N/A
//Token : Yes
router.put('/unsubscribe',protectUser,unsubscribe);

//Get particular service with name of an artist
//Route : '/api/user/private/getservicewithname/:artistId/:serviceName'
//Method : GET
//Body : N/A
//Params : {artistId,serviceName}
//Token : Yes
router.get('/getservicewithname/:artistId/:serviceName',protectUser,getServiceWithName);

//Complete a payment
//Route : '/api/user/private/completepayment'
//Method : PUT
//Body : {paymentId,roomId}
//Params : N/A
//Token : Yes
router.put('/completepayment',protectUser,completePayment);

module.exports=router;