const User=require('../models/User');
const Artist=require('../models/Artist');
const Employee=require('../models/Employee');
const Admin=require('../models/Admin');
const jwt=require('jsonwebtoken');

//User's Middleware
exports.protectUser=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            throw new Error("User unauthorized!");
        }
        const verifiedToken=await jwt.verify(token,process.env.SECRET_KEY);
        const user= await User.findOne({_id:verifiedToken._id});
        if(!user){
            throw new Error("User unauthorized!");
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        next(new Error("Something went wrong!"));
    }
}

//Artist's Middleware
exports.protectArtist=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            throw new Error("User unauthorized!");
        }
        const verifiedToken=await jwt.verify(token,process.env.SECRET_KEY);
        const artist= await Artist.findOne({_id:verifiedToken._id});
        if(!artist){
            throw new Error("User unauthorized!");
        }
        req.artist=artist;
        next();
    } catch (error) {
        console.log(error);
        next(new Error("Something went wrong!"));
    }
}

//Employee's Middleware
exports.protectEmployee=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            throw new Error("User unauthorized!");
        }
        const verifiedToken=await jwt.verify(token,process.env.SECRET_KEY);
        const employee= await Employee.findOne({_id:verifiedToken._id});
        if(!employee){
            throw new Error("User unauthorized!");
        }
        req.employee=employee;
        next();
    } catch (error) {
        console.log(error);
        next(new Error("Something went wrong!"));
    }
}

//Admin's Middleware
exports.protectAdmin=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            throw new Error("User unauthorized!");
        }
        const verifiedToken=await jwt.verify(token,process.env.SECRET_KEY);
        const admin= await Admin.findOne({_id:verifiedToken._id});
        if(!admin){
            throw new Error("User unauthorized!");
        }
        req.admin=admin;
        next();
    } catch (error) {
        console.log(error);
        next(new Error("Something went wrong!"));
    }
}