const Employee=require('../../models/Employee');

//Get own profile
exports.getOwnProfile=async(req,res)=>{
    try {
        res.status(200).send(req.employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Update profile
exports.updateProfile=async(req,res)=>{
    try {
        const {username,email,gender,profilePhoto}=req.body;
        await Employee.updateOne({_id:req.employee._id},{
            $set:{username,email,gender,profilePhoto}
        })
        res.status(200).json({message:"Profile updated!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}