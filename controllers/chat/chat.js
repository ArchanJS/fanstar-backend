const Chat=require('../../models/Chat');

//create chat
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