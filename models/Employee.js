const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');

const employeeSchema=new mongoose.Schema({
    phone:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    balance:{
        type:String,
        default:"0.00"
    },
    profilePhoto:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    accountNo:{
        type:String
    },
    ifscCode:{
        type:String
    },
    upiId:{
        type:String
    },
    blocked:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,10);
    }
    next();
})

employeeSchema.methods.generateToken=async function(){
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES});
        return token;
    } catch (error) {
        throw new Error("Token is not generated!");
    }
}

employeeSchema.methods.comparePasswords=async function(password){
    try {
        return await bcryptjs.compare(password,this.password);
    } catch (error) {
        return false;
    }
}

const Employee=new mongoose.model('employee',employeeSchema);

module.exports=Employee;