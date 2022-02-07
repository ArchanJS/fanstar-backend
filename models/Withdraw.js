const mongoose=require('mongoose');

const withdrawSchema=new mongoose.Schema({
    artistId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist',
        required:true
    },
    amount:{
        type:String
    },
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true});

const Withdraw=new mongoose.model('withdraw',withdrawSchema);

module.exports=Withdraw;