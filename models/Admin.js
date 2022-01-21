const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
},{timestamps:true})

adminSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,10);
    }
    next();
})

adminSchema.methods.generateToken=async function(){
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES});
        return token;
    } catch (error) {
        throw new Error("Token is not generated!");
    }
}

adminSchema.methods.comparePasswords=async function(password){
    try {
        return await bcryptjs.compare(password,this.password);
    } catch (error) {
        return false;
    }
}

const Admin=new mongoose.model('Admin',adminSchema);

module.exports=Admin;