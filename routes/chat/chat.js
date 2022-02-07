const router=require('express').Router();
const {createChat,getAChat,fetchAllChatsOfAnArtist}=require('../../controllers/chat/chat');

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


module.exports=router;