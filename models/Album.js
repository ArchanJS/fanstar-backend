const mongoose=require('mongoose');

const albumSchema=new mongoose.Schema({
    fileUrl:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        maxlength:500,
        required:true
    },
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
        },
        subscriber:{
            type:Boolean,
            default:false
        }
    }]
},{timestamps:true})

const Album=new mongoose.model('album',albumSchema);

module.exports=Album;