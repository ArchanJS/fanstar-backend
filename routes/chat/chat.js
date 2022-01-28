const router=require('express').Router();
const {createChat}=require('../../controllers/chat/chat');

//Create chat
//Route : '/api/chat/createchat'
//Method : POST
//Body : N/A
//Params : N/A
//Token : Yes

router.post('/createchat',createChat);

module.exports=router;