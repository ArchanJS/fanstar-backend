const Chat=require('../../models/Chat');
const User = require('../../models/User');

//Create chat
exports.createChat=async(req,res)=>{
    try {
        const {user1,user2,paymentId}=req.body;
        let chat=await Chat.findOne({$and:[{userIds:{$all:[user1,user2]}},{paymentId}]});
        if(!chat) {
            chat=new Chat({userIds:[user1,user2],paymentId});
            await chat.save();
        }
        if(chat) res.status(201).send(chat._id);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Fetch a particular chat
exports.getAChat=async(req,res)=>{
    try {
        const {roomId}=req.params;
        let chat=await Chat.findOne({_id:roomId}).populate("paymentId");
        res.status(200).send(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Fetch all chats of an artist
exports.fetchAllChatsOfAnArtist=async(req,res)=>{
    try {
        const {artistId}=req.params;
        const chats=await Chat.find({userIds:{$in:[artistId]}});
        const users=await User.find();
        let messArr=[];
        for(let i=0;i<chats.length;i++){
            for(let j=0;j<users.length;j++){
                if(chats[i].userIds[0].toString().trim()==users[j]._id.toString().trim()){
                    messArr.push({roomId:chats[i]._id,userPhone:users[j].phone,username:users[j].username,email:users[j].email,paymentId:chats[i].paymentId,lastMessage:chats[i].allMessages&&chats[i].allMessages.length>0?chats[i].allMessages[chats[i].allMessages.length-1]:[]});
                }
                else if(chats[i].userIds[1].toString().trim()==users[j]._id.toString().trim()){
                    messArr.push({roomId:chats[i]._id,userPhone:users[j].phone,username:users[j].username,email:users[j].email,paymentId:chats[i].paymentId,lastMessage:chats[i].allMessages&&chats[i].allMessages.length>0?chats[i].allMessages[chats[i].allMessages.length-1]:[]});
                }
            }
        }
        res.status(200).send(messArr);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Fetch all chats of an user
exports.fetchAllChatsOfAnUser=async(req,res)=>{
    try {
        const userId=req.user._id;
        const chats=await Chat.find({userIds:{$in:[userId]}}).populate("paymentId");
        // const users=await User.find();
        // let messArr=[];
        // for(let i=0;i<chats.length;i++){
        //     for(let j=0;j<users.length;j++){
        //         if(chats[i].userIds[0].toString().trim()==users[j]._id.toString().trim()){
        //             messArr.push({roomId:chats[i]._id,userPhone:users[j].phone,username:users[j].username,email:users[j].email,paymentId:chats[i].paymentId,lastMessage:chats[i].allMessages&&chats[i].allMessages.length>0?chats[i].allMessages[chats[i].allMessages.length-1]:[]});
        //         }
        //         else if(chats[i].userIds[1].toString().trim()==users[j]._id.toString().trim()){
        //             messArr.push({userPhone:users[j].phone,username:users[j].username,email:users[j].email,paymentId:chats[i].paymentId,lastMessage:chats[i].allMessages&&chats[i].allMessages.length>0?chats[i].allMessages[chats[i].allMessages.length-1]:[]});
        //         }
        //     }
        // }
        const chatDetails={ownId:req.user._id,chats}
        res.status(200).send(chatDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}