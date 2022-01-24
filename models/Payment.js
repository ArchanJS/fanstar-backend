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
    amount:{
        type:String,
        required:true
    },
    isAlbum:{
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