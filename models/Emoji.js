const mongoose=require('mongoose');

const emojiSchema=new mongoose.Schema({
    emoji:{
        type:String
    },
    price:{
        type:String
    }
},{timestamps:true});

const Emoji=new mongoose.model("emoji",emojiSchema);

module.exports=Emoji;