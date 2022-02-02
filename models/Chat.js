const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    userIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'payment'
    },
    allMessages:[{
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        message:{
            type:String
        },
        time:{
            type:String
        }
    }]
},{timestamps:true})

module.exports=mongoose.model("chat",chatSchema);