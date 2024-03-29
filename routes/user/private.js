const router=require('express').Router();
const {buyServices,order,capture,buyImage,getArtist,getAService,readFile,getOwnDetails,getAlbum,giveFeedback,removeimageAccess,subscribe, unsubscribe,getServiceWithName,completePayment,getPaymentsOfAUser,dedudctBalanceWhileChatting,getAllImagesOfAnArtist,getAllAlbumsOfAnArtist,getAParticularAlbum, getImageTimestamp,checkIfSubscribed,getAParticularImage,getEmojies,giveEmoji,checkIfPendingAvailable}=require('../../controllers/user/private');
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

//Get all images of an artist
//Route : '/api/user/private/getallimages/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getallimages/:artistId',getAllImagesOfAnArtist);

//Get a particular imagee
//Route : '/api/user/private/getanimage/:imageId'
//Method : GET
//Body : N/A
//Params : {imageId}
//Token : Yes
router.get('/getanimage/:imageId',protectUser,getAParticularImage);

//Get all albums of an artist
//Route : '/api/user/private/getallalbums/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes
router.get('/getallalbums/:artistId',getAllAlbumsOfAnArtist);

//Get a particular album of an artist
//Route : '/api/user/private/getanalbum/:albumId'
//Method : GET
//Body : N/A
//Params : {albumId}
//Token : Yes
router.get('/getanalbum/:albumId',protectUser,getAParticularAlbum);

//Buy an image
//Route : '/api/user/private/buyimage'
//Method : POST
//Body : {imageId}
//Params : N/A
//Token : Yes
router.post('/buyimage',protectUser,buyImage);

//Get the timestamp, when the user accessed the album
//Route : '/api/user/private/getimagetimestamp/:imageId'
//Method : GET
//Body : N/A
//Params : {imageId}
//Token : Yes
router.get('/getimagetimestamp/:imageId',protectUser,getImageTimestamp);

//Remove album access
//Route : '/api/user/private/removeimageaccess'
//Method : PUT
//Body : {imageId}
//Params : N/A
//Token : Yes
router.put('/removeimageaccess',protectUser,removeimageAccess);

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

//Check if subscribed
//Route : '/api/user/private/checkifsubscribed'
//Method : PUT
//Body : {albumId}
//Params : N/A
//Token : Yes
router.put('/checkifsubscribed',protectUser,checkIfSubscribed);

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

//Get payments of a user
//Route : '/api/user/private/getpaymentsofauser'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getpaymentsofauser',protectUser,getPaymentsOfAUser);

//Deduct balance
//Route : '/api/user/private/deductbalance'
//Method : PUT
//Body : {roomId}
//Params : N/A
//Token : Yes
router.put('/deductbalance',protectUser,dedudctBalanceWhileChatting);


//Get emojies
//Route : '/api/user/private/getemojies'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/getemojies',protectUser,getEmojies);

//Give emoji
//Route : '/api/user/private/giveemoji'
//Method : POST
//Body : {emojiId,artistId}
//Params : N/A
//Token : Yes
router.post('/giveemoji',protectUser,giveEmoji);

//Check if pending payment is available
//Route : '/api/user/private/ispendingavailable'
//Method : GET
//Body : N/A
//Params : N/A
//Token : Yes
router.get('/ispendingavailable',protectUser,checkIfPendingAvailable);

module.exports=router;