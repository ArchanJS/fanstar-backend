const Admin=require('../../models/Admin');

//Login
exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        let admin=await Admin.findOne({email});
        if(!admin){
            // admin=new Admin({email,password});
            // await admin.save();
            // const token=await admin.generateToken();
            // res.status(201).send(token);
            res.status(400).json({error:"Admin not found!"});
        }
        else{
            const matched=await admin.comparePasswords(password);
            if(!matched) res.status(400).json({error:"Invalid credentials!"});
            else{
                const token=await admin.generateToken();
                res.status(200).send(token);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}