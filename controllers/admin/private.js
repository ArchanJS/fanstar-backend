const Artist=require('../../models/Artist');
const User=require('../../models/User');
const Employee=require('../../models/Employee');
const Service=require('../../models/Service');

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

//Create artist
exports.createArtist=async(req,res)=>{
    try {
        const {username,phone,email,address,assignedEmployee,appName,accountNo,ifscCode,upiId,services}=req.body;
        const exists=await Artist.findOne({phone});
        if(exists) res.status(400).json({error:"Artist already exists!"});
        else{
            const artist=new Artist({username,phone,email,address,assignedEmployee,appName,accountNo,upiId,ifscCode});
            await artist.save();
            services.forEach(async e=>{
                let service=new Service({serviceName:e.serviceName,amount:e.amount,description:e.description,createdBy:artist._id});
                await service.save();
            })
            res.status(201).json({message:"Artist created!"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Block artist
exports.blockArtist=async(req,res)=>{
    try {
        await findOneAndUpdate({_id:req.params.artistId},{
            $set:{
                blocked:true
            }
        })
        res.status(200).json({message:"Artist blocked!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Unblock artist
exports.blockUnblockArtist=async(req,res)=>{
    try {
        const artist=await Artist.findOne({_id:req.body.artistId});
        let blocked=artist.blocked?false:true;
        let message=artist.blocked?"Artist unblocked":"Artist blocked";
        await Artist.findOneAndUpdate({_id:req.body.artistId},{
            $set:{
                blocked
            }
        })
        res.status(200).json({message});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}