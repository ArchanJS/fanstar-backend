const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    artistId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'service'
    },
    albumId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'album'
    },
    serviceName:{
        type:String
    },
    serviceDescription:{
        type:String
    },
    amount:{
        type:String,
        required:true
    },
    isChat:{
        type:String,
        default:false
    },
    isAlbum:{
        type:Boolean,
        default:false
    },
    doneForArtist:{
        type:Boolean,
        default:false
    },
    doneForUser:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        requierd:true
    }
},{timestamps:true})

const Payment=new mongoose.model("payment",paymentSchema);

module.exports=Payment;