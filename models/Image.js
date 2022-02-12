const mongoose=require('mongoose');

const imageSchema=new mongoose.Schema({
    url:{
        type:String
    },
    caption:{
        type:String
    },
    price:{
        type:String
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist'
    },
    accessedBy:[{
        userId:{
            type:String
        },
        time:{
            type:String
        }
    }]
},{timestamps:true});

module.exports=new mongoose.model("image",imageSchema);