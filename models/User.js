const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');

const userSchema=new mongoose.Schema({
    phone:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true
    },
    balance:{
        type:String,
        default:"0.00"
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    insta:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,10);
    }
    next();
})

userSchema.methods.generateToken=async function(){
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES});
        return token;
    } catch (error) {
        throw new Error("Token is not generated!");
    }
}

userSchema.methods.comparePasswords=async function(password){
    try {
        return await bcryptjs.compare(password,this.password);
    } catch (error) {
        return false;
    }
}

const User=new mongoose.model('user',userSchema);

module.exports=User;