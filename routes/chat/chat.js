const router=require('express').Router();
const {createChat,getAChat,fetchAllChatsOfAnArtist,fetchAllChatsOfAnUser}=require('../../controllers/chat/chat');
const {protectUser}=require('../../middlewares/protect');

//Create chat
//Route : '/api/chat/createchat'
//Method : POST
//Body : N/A
//Params : N/A
//Token : Yes

router.post('/createchat',createChat);

//Get a chat
//Route : '/api/chat/getachat/:roomId'
//Method : GET
//Body : N/A
//Params : {roomId}
//Token : Yes

router.get('/getachat/:roomId',getAChat);

//Get all chats of an artist
//Route : '/api/chat/getallchats/:artistId'
//Method : GET
//Body : N/A
//Params : {artistId}
//Token : Yes

router.get('/getallchats/:artistId',fetchAllChatsOfAnArtist);

//Get all chats of an user
//Route : '/api/chat/getallchatsofuser'
//Method : GET
//Body : N/A
//Params : {userId}
//Token : Yes

router.get('/getallchatsofuser',protectUser,fetchAllChatsOfAnUser);


module.exports=router;