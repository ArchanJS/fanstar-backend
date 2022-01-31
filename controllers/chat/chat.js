const Chat=require('../../models/Chat');

//Create chat
exports.createChat=async(req,res)=>{
    try {
        const {user1,user2}=req.body;
        let chat=await Chat.findOne({userIds:{$all:[user1,user2]}});
        if(!chat) {
            chat=new Chat({userIds:[user1,user2]});
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
        let chat=await Chat.findOne({_id:roomId});
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
        let chats=await Chat.find({userIds:{$in:[artistId]}});
        res.status(200).send(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}