const Artist=require('../../models/Artist');
const User=require('../../models/User');
const Employee=require('../../models/Employee');
const Service=require('../../models/Service');
const Album=require('../../models/Album');
const Payment=require('../../models/Payment');
const Withdraw=require('../../models/Withdraw');

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
        const {username,phone,email,address,commission,chatPrice,assignedEmployee,appName,accountNo,ifscCode,upiId,services}=req.body;
        console.log(username);
        const exists=await Artist.findOne({phone});
        if(exists) res.status(400).json({error:"Artist already exists!"});
        else{
            const artist=new Artist({username,phone,email,address,commission,chatPrice,assignedEmployee,appName,accountNo,upiId,ifscCode});
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

//Block-unblock artist
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

//Get an artist
exports.getAnArtist=async(req,res)=>{
    try {
        const artist=await Artist.findOne({_id:req.params.artistId});
        if(!artist) res.status(400).json({error:"No artist found!"});
        else res.status(200).send(artist);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get no. of total and pending orders of an artist
exports.getOrdersofAnArtist=async(req,res)=>{
    try {
        const totalOrders=await Payment.find({artistId:req.params.artistId});
        const pendingOrders=await Payment.find({artistId:req.params.artistId,status:"pending"});
        res.status(200).json({totalOrders:totalOrders.length,pendingOrders:pendingOrders.length});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get payments of a particular artist
exports.getPaymentOfAnArtist=async(req,res)=>{
    try {
        const servicePayments=await Payment.find({artistId:req.params.artistId,isAlbum:false}).populate("userId").populate("serviceId");
        const albumPayments=await Payment.find({artistId:req.params.artistId,isAlbum:true}).populate("userId");
        const payments=[...servicePayments,...albumPayments];
        res.status(200).send(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Update an artist
exports.updateAnArtist=async(req,res)=>{
    try {
        const {username,phone,email,address,assignedEmployee,appName,accountNo,ifscCode,upiId}=req.body;
        await Artist.findOneAndUpdate({_id:req.params.artistId},{
            $set:{
                username,phone,email,address,assignedEmployee,appName,accountNo,ifscCode,upiId
            }
        })
        res.status(200).json({message:"User updated!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somehting went wrong!"});
    }
}

//Delete an artist
exports.deleteAnArtist=async(req,res)=>{
    try {
        await Album.deleteMany({postedBy:req.params.artistId});
        await Service.deleteMany({createdBy:req.params.artistId});
        await Artist.deleteOne({_id:req.params.artistId});
        res.status(200).json({message:"Artist's account deleted!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somehting went wrong!"});
    }
}

//Get an employee
exports.getAnEmployee=async(req,res)=>{
    try {
        const employee=await Employee.findOne({_id:req.params.employeeId});
        if(!employee) res.status(400).json({error:"No employee found!"});
        else res.status(200).send(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somehting went wrong!"});
    }
}

//Create employee
exports.createAnEmployee=async(req,res)=>{
    try {
        const {username,phone,email,address,accountNo,ifscCode,upiId}=req.body;
        let employee=await Employee.findOne({phone});
        if(employee) res.status(400).json({error:"Employee already exists!"});
        else {
            employee=new Employee({username,phone,email,address,accountNo,ifscCode,upiId});
            await employee.save();
            res.status(201).json({message:"Employee account created!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somehting went wrong!"});
    }
}

//Update an Employee
exports.updateAnEmployee=async(req,res)=>{
    try {
        const {username,phone,email,address,accountNo,ifscCode,upiId}=req.body;
        await Employee.findOneAndUpdate({_id:req.params.employeeId},{
            $set:{
                username,phone,email,address,accountNo,ifscCode,upiId
            }
        })
        res.status(200).json({message:"Employee profile updated!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somehting went wrong!"});
    }
}

//Delete an employee
exports.deleteAnEmployee=async(req,res)=>{
    try {
        await Employee.deleteOne({_id:req.params.employeeId});
        res.status(200).json({message:"Employee account deleted!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somehting went wrong!"});
    }
}

//Block-unblock employee
exports.blockUnblockEmployee=async(req,res)=>{
    try {
        const employee=await Employee.findOne({_id:req.body.employeeId});
        let blocked=employee.blocked?false:true;
        let message=employee.blocked?"Employee unblocked":"Employee blocked";
        await Employee.findOneAndUpdate({_id:req.body.employeeId},{
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

//Get payments
exports.getAllPayments=async(req,res)=>{
    try {
        let payments=[];
        if(req.body.field&&req.body.field!=""){
            if(req.body.field.trim().length==24){
                payments=await Payment.find({
                    _id: req.body.field
                }).populate("artistId");
            }
            if(payments.length==0){
                const artists=await Artist.find({
                    username: { $regex: req.body.field, $options: "i" }
                })
                // console.log(artists);
                const allPayments=await Payment.find().populate("artistId");
                payments=[];
                for(let i=0;i<artists.length;i++){
                    for(let j=0;j<allPayments.length;j++){
                        // console.log(allPayments[j].artistId.toString().trim())
                        if(artists[i]._id.toString().trim()==allPayments[j].artistId._id.toString().trim()) {
                            // console.log(j);
                            payments.push(allPayments[j]);
                        }
                    }
                }
            }
        }
        else {
            payments=await Payment.find().populate("artistId");
        }
        res.status(200).send(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get all payments of users
exports.getAllPaymentsOfUsers=async(req,res)=>{
    try {
        let payments=[];
        if(req.body.field&&req.body.field!=""){
            if(req.body.field.trim().length==24){
                payments=await Payment.find({
                    _id: req.body.field
                }).populate("userId");
            }
            if(payments.length==0){
                const users=await User.find({
                    username: { $regex: req.body.field, $options: "i" }
                })
                // console.log(artists);
                const allPayments=await Payment.find().populate("userId");
                payments=[];
                for(let i=0;i<users.length;i++){
                    for(let j=0;j<allPayments.length;j++){
                        // console.log(allPayments[j].artistId.toString().trim())
                        if(users[i]._id.toString().trim()==allPayments[j].userId._id.toString().trim()) {
                            // console.log(j);
                            payments.push(allPayments[j]);
                        }
                    }
                }
            }
        }
        else {
            payments=await Payment.find().populate("userId");
        }
        res.status(200).send(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get list of artists
exports.getListOfArtist=async(req,res)=>{
    try {
        const retArr=[];
        let artists;
        if(req.body.field&&req.body.field!=""){
            artists=await Artist.find({
                username: { $regex: req.body.field, $options: "i" }
            })
        }
        else artists=await Artist.find();
        const payments=await Payment.find();
        for(let i=0;i<artists.length;i++){
            let totalOrders=0;
            let pendingOrders=0;
            for(let j=0;j<payments.length;j++){
                if(artists[i]._id.toString().trim()==payments[j].artistId.toString().trim()){
                    totalOrders++;
                    if(payments[j].status=="pending") pendingOrders++;
                }
            }
            retArr.push({
                artistId:artists[i]._id,
                artistName:artists[i].username,
                startDate:artists[i].createdAt,
                address:artists[i].address,
                totalOrders,
                pendingOrders,
                blocked:artists[i].blocked
            });
        }
        // artists.forEach(async e=>{
        //     // const totalOrders=await Payment.find({artistId:e._id});
        //     // const pendingOrders=await Payment.find({artistId:e._id,status:"pending"});
        //     const artist={
        //         artistId:e._id,
        //         artistName:e.username,
        //         startDate:e.createdAt,
        //         address:e.address,
        //         // totalOrders:totalOrders.length,
        //         // pendingOrders:pendingOrders.length
        //     }
        //     console.log(artist);
        //     retArr.push(artist);
        // })
        res.status(200).send(retArr);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get artists of an employee
exports.getArtistsOfAnEmployee=async(req,res)=>{
    try {
        const artists=await Artist.find({assignedEmployee:req.params.employeeId});
        res.status(200).send(artists);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get total no. of subscribers
exports.getTotalSubscribers=async(req,res)=>{
    try {
        const users=await User.find();
        res.status(200).send(users.length.toString());
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get total app visits
exports.getTotalAppVisits=async(req,res)=>{
    try {
        const artists=await Artist.find();
        let totalAppVisits=0;
        artists.forEach(a=>{
            totalAppVisits+=a.appVisits;
        })
        res.status(200).send(totalAppVisits.toString());
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Generate token of an artist
exports.generateTokenOfAnArtist=async(req,res)=>{
    try {
        const artist=await Artist.findOne({_id:req.params.artistId});
        const token=await artist.generateToken();
        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get list of employees
exports.getListOfEmployees=async(req,res)=>{
    try {
        let employees;
        if(req.body.field&&req.body.field!=""){
            employees=await Employee.find({
                username: { $regex: req.body.field, $options: "i" }
            })
        }
       else employees=await Employee.find();
        const artists=await Artist.find();
        const retArr=[];
        for(let i=0;i<employees.length;i++){
            let arts=0;
            for(let j=0;j<artists.length;j++){
                if(employees[i]._id.toString().trim()==artists[j].assignedEmployee.toString().trim()) arts++;
            }
            retArr.push({employeeId:employees[i]._id,employeeName:employees[i].username,address:employees[i].address,startDate:employees[i].createdAt,totalArtists:arts,blocked:employees[i].blocked});
        }
        res.status(200).send(retArr);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get all payments of artists of an employee
exports.getPaymentsOfArtistsOfAnEmployee=async(req,res)=>{
    try {
        const artists=await Artist.find({assignedEmployee:req.params.employeeId});
        const payments=await Payment.find();
        const retArr=[];
        for(let i=0;i<artists.length;i++){
            let paymentsOfArtist=[];
            for(let j=0;j<payments.length;j++){
                if(artists[i]._id.toString().trim()==payments[j].artistId.toString().trim()){
                    paymentsOfArtist.push(payments[j]);
                }
            }
            retArr.push({artist:artists[i],paymentsOfArtist});
        }
        res.status(200).send(retArr);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Update an artist's balance
exports.updateArtistBalance=async(req,res)=>{
    try {
        const withdraw=await Withdraw.findOne({_id:req.body.withdrawId})
        const artist=await Artist.findOne({_id:withdraw.artistId});
        const artistBalance=parseInt(artist.balance);
        let balance=(artistBalance-parseInt(req.body.amount))>0?artistBalance-parseInt(req.body.amount):0;
        const artistPaid=parseInt(artist.paid);
        let paid=artistPaid+parseInt(req.body.amount);
        paid.toString();
        balance=balance.toString();
        await Artist.findOneAndUpdate({_id:withdraw.artistId},{
            $set:{balance,paid}
        });
        await Withdraw.findOneAndUpdate({_id:req.body.withdrawId},{
            $set:{status:"completed"}
        });
        res.status(200).json({message:"Artists balance updated!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get withdrawals of an artists
exports.getWithdrawalsOfAnArtist=async(req,res)=>{
    try {
        const withdrawals=await Withdraw.find({artistId:req.params.artistId});
        res.status(200).send(withdrawals);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}