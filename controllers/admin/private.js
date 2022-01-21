const Artist=require('../../models/Artist');
const User=require('../../models/User');
const Employee=require('../../models/Employee');

//Get artists
exports.getAllArtists=async(req,res)=>{
    try {
        const artists=await Artist.find();
        res.status(200).send(artists);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get users
exports.getAllUsers=async(req,res)=>{
    try {
        const users=await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get employees
exports.getAllEmployees=async(req,res)=>{
    try {
        const employees=await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}