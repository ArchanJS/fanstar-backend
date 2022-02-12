const mongoose=require('mongoose');

const albumSchema=new mongoose.Schema({
    albumName:{
        type:String
    },
    description:{
        type:String
    },
    images:[{
        type:String
    }],
    price:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist'
    }
    ,
    accessedBy:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        time:{
            type:String
        }
    }]
},{timestamps:true})

const Album=new mongoose.model('album',albumSchema);

module.exports=Album;