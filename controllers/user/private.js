const User = require('../../models/User');
const Artist = require('../../models/Artist');
const Service = require('../../models/Service');
const Album=require('../../models/Album');
const Payment=require('../../models/Payment');
const Chat=require('../../models/Chat');
const {readImage}=require('../../controllers/artist/aws');
const Razorpay = require('razorpay');
const request = require('request');
const { nanoid } = require('nanoid');
const moment=require('moment');

const razorInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
})

//Get own details
exports.getOwnDetails=async(req,res)=>{
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong!"});
  }
}

//Get an artist
exports.getArtist=async(req,res)=>{
  try {
    let artist=await Artist.findOne({_id:req.params.artistId});
    artist=await Artist.findOneAndUpdate({_id:req.params.artistId},{
      $set:{
        appVisits:artist.appVisits+1
      }
    },{new:true})
    res.status(200).send(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Order
exports.order = async (req, res) => {
  try {
    const { amount } = req.params;
    const options = {
      amount: parseInt(amount) * 100,
      currency: "INR",
      receipt: nanoid(),
      payment_capture: 0, //1

    };
    razorInstance.orders.create(options, async function (err, order) {
      if (err) {
        res.status(500).json({
          error: "Something went wrong!"
        })
      }
      else res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Capture
exports.capture = async (req, res) => {
  try {
    let { amount } = req.body;
    amount=parseInt(amount);
    return request(
      {
        method: "POST",
        url: `https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: amount * 100,
          currency: "INR"
        },
      },
      async function (err, response, body) {
        if (err) {
          res.status(500).json({
            error: "Something went wrong!"
          })
        }
        else {
          let uBalance = parseFloat(req.user.balance);
          uBalance = uBalance + amount;
          uBalance = uBalance.toString();
          await User.updateOne({ _id: req.user._id }, {
            $set: {
              balance: uBalance
            }
          })
          res.status(200).json(body)
        }
      }
    )
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Get an album
exports.getAlbum=async(req,res)=>{
  try {
    const album=await Album.findOne({_id:req.params.albumId});
    res.status(200).send(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Somehing went wrong!"});
  }
}

//Buy service
exports.buyServices = async (req, res) => {
  try {
    const { serviceId,username,email,phone,insta } = req.body;
    const service = await Service.findOne({ _id: serviceId });
    if (!service) res.status(400).json({ error: "Service not found!" });
    else {
      let uBalance = parseFloat(req.user.balance);
      let servicePrice = parseFloat(service.amount);
      if (uBalance >= servicePrice) {
        await Service.updateOne({ _id: serviceId }, {
          $push: {
            users: {
              userId:req.user._id,
            username,email,phone,insta}
          }
        })
        const artist = await Artist.findOne({ _id: service.createdBy });
        let aBalance = parseFloat(artist.balance);
        aBalance = aBalance + (servicePrice * 70.00 / 100.00);
        aBalance = aBalance.toString();
        await Artist.updateOne({ _id: artist._id }, {
          $set: {
            balance: aBalance
          }
        })
        uBalance = uBalance - servicePrice;
        uBalance = uBalance.toString();
        await User.updateOne({ _id: req.user._id }, {
          $set: {
            balance: uBalance
          }
        })
        const payment=new Payment({artistId:service.createdBy,userId:req.user,amount:service.amount,serviceId:service._id,status:"pending"});
        await payment.save();
        await User.findOneAndUpdate({phone:req.user.phone},{
          $set:{username,email,insta}
        });
        
        let chat=await Chat.findOne({$and:[{userIds:{$all:[artist._id,req.user._id]}},{paymentId:payment._id}]});
        if(!chat) {
            chat=new Chat({userIds:[artist._id,req.user._id],paymentId:payment._id});
            await chat.save();
        }


        res.status(200).json({ message: "Service added!" });
      }
      else res.status(400).json({ error: "User doesn't have enough balance!" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Get a service
exports.getAService=async(req,res)=>{
  try {
    const service=await Service.findOne({_id:req.params.serviceId});
    res.status(200).send(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong!"});
  }
}

//Read Image
exports.readFile = async (req, res) => {
  try {
      const { fileKey } = req.params;
      const data = await readImage(fileKey);
      const receivedFile = Buffer.from(data).toString('base64');
      // console.log(receivedFile);
      res.status(200).send(receivedFile);

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong!" });
  }
}

//Buy album
exports.buyAlbum=async (req, res) => {
  try {
    const { albumId } = req.body;
    const album = await Album.findOne({ _id: albumId });
    if (!album) res.status(400).json({ error: "Album not found!" });
    else {
      let uBalance = parseFloat(req.user.balance);
      let albumPrice = parseFloat(album.price);
      if (uBalance >= albumPrice) {
        await Album.updateOne({ _id: albumId }, {
          $push: {
            accessedBy: {userId:req.user._id,time:moment().format()}
          }
        })
        const artist = await Artist.findOne({ _id: album.postedBy });
        let aBalance = parseFloat(artist.balance);
        aBalance = aBalance + (albumPrice * 70.00 / 100.00);
        aBalance = aBalance.toString();
        await Artist.updateOne({ _id: artist._id }, {
          $set: {
            balance: aBalance
          }
        })
        uBalance = uBalance - albumPrice;
        uBalance = uBalance.toString();
        await User.updateOne({ _id: req.user._id }, {
          $set: {
            balance: uBalance
          }
        })
        const payment=new Payment({artistId:album.postedBy,userId:req.user._id,amount:albumPrice,isAlbum:true,status:"completed"});
        await payment.save();
        res.status(200).json({ message: "Album accessed!" });
      }
      else res.status(400).json({ error: "User doesn't have enough balance!" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Subscribe
exports.subscribe=async (req, res) => {
  try {
    const { artistId } = req.body;
    const albums = await Album.find({ postedBy: artistId });
    if (albums.length==0) res.status(400).json({ error: "No album exists!" });
    else {
      let uBalance = parseFloat(req.user.balance);
      let albumPrice = 0;
      albums.forEach(e=>{
        albumPrice+=parseFloat(e.price);
      })
      if (uBalance >= albumPrice) {
        await Album.updateMany({ postedBy: artistId }, {
          $push: {
            accessedBy: {userId:req.user._id,time:moment().format(),subscriber:true}
          }
        })
        const artist = await Artist.findOne({ _id: artistId });
        let aBalance = parseFloat(artist.balance);
        aBalance = aBalance + (albumPrice * 70.00 / 100.00);
        aBalance = aBalance.toString();
        await Artist.updateOne({ _id: artistId }, {
          $set: {
            balance: aBalance
          }
        })
        uBalance = uBalance - albumPrice;
        uBalance = uBalance.toString();
        await User.updateOne({ _id: req.user._id }, {
          $set: {
            balance: uBalance
          }
        })
        albumPrice=albumPrice.toString();
        const payment=new Payment({artistId,userId:req.user._id,amount:albumPrice,isAlbum:true,status:"pending"});
        await payment.save();
        res.status(200).json({ message: "Subscription added!" });
      }
      else res.status(400).json({ error: "User doesn't have enough balance!" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Remove album access
exports.removeAlbumAccess=async(req,res)=>{
  try {
    await Album.findOneAndUpdate({_id:req.body.albumId},{
      $pull:{
        accessedBy:{userId:req.user._id}
      }
    })
    res.status(200).json({message:"Access removed!"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong!"});
  }
}

//Unsubscribe
exports.unsubscribe=async(req,res)=>{
  try {
    await Album.updateMany({postedBy:req.body.artistId},{
      $pull:{
        accessedBy:{userId:req.user._id}
      }
    })
    await Payment.updateMany({artistId:req.body.artistId,userId:req.user._id,isAlbum:true},{
      $set:{
        status:"completed"
      }
    })
    res.status(200).json({message:"Unsubscribed!"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong!"});
  }
}

//Get the timestamp, when the user accessed the album
exports.getAlbumTimestamp=async(req,res)=>{
  try {
    const album=await Album.findOne({_id:req.params.albumId});
    let ts=null;
    album.accessedBy.forEach(e=>{
      if(e.userId.toString().trim()==req.user._id.toString().trim()) ts=e.time;
    })
    res.status(200).send(ts);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong!"});
  }
}

//Give feedback
exports.giveFeedback=async(req,res)=>{
  try {
    const {artistId,stars,message}=req.body;
    await Artist.findOneAndUpdate({_id:artistId,'feedbacks.userId':{$ne:req.user._id}},{
      $addToSet:{
        feedbacks:{
          userId:req.user._id,
          stars,
          message
        }
      }
    })
    res.status(200).json({message:"Thanks for your feedback!"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong!"});
  }
}

//Get particular service with name of an artist
exports.getServiceWithName=async(req,res)=>{
  try {
    const service= await Service.findOne({$and:[{createdBy:req.params.artistId},{serviceName:{ $regex: req.params.serviceName, $options: "i" }}]});
    if(service) res.status(200).send(service);
    else res.status(400).json({error:"service not found!"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong!"});
  }
}

//Complete service
exports.completePayment=async(req,res)=>{
  try {
      //$and:[{serviceId:req.body.serviceId},{artistId:req.artist._id},{userId:req.body.userId}]
      let payment=await Payment.findOne({_id:req.body.paymentId});
      if(payment&&payment.userId.toString().trim()==req.user._id.toString().trim()){
          payment=await Payment.findOneAndUpdate({_id:payment._id},{
              $set:{
                  doneForUser:true
              }
          },{new:true})
          if(payment.doneForArtist==true){
              await Payment.findOneAndUpdate({_id:payment._id},{
                  $set:{
                      status:"completed"
                  }
              })
              await Chat.deleteOne({paymentId:req.body.paymentId});
          }
          res.status(200).json({message:"Marked as done!"});
      }
      else{
          res.status(400).send({error:"Can't change status!"});
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong!" });
  }
}

//Get payments of user
exports.getPaymentsOfAUser=async(req,res)=>{
  try {
    const payments=await Payment.find({userId:req.user._id,isAlbum:false}).populate("serviceId").populate("userId");
    res.status(200).send(payments);
  } catch (error) {
    console.log(error);
      res.status(500).json({ error: "Something went wrong!" });
  }
}