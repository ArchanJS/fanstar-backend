const Artist = require('../../models/Artist');
const Service = require('../../models/Service');
const Album=require('../../models/Album');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { readImage, uploadImage, deleteImage } = require('./aws');
const { addEventToGoogleCalender, deleteEventFromGoogleCalender } = require('./addevent');

//Get own profile
exports.getOwnProfile=async(req,res)=>{
    try {
        res.status(200).send(req.artist);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Update profile
exports.updateProfile=async(req,res)=>{
    try {
        const {username,profilePhoto,bio}=req.body;
        await Artist.updateOne({_id:req.artist._id},{
            $set:{username,profilePhoto,bio}
        })
        res.status(200).json({message:"Profile updated!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Create service
exports.createService = async (req, res) => {
    try {
        const { serviceName, amount, description } = req.body;
        const service = new Service({ serviceName, amount, description, createdBy: req.artist });
        await service.save();
        res.status(201).json({ message: "Service created!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get a service
exports.getService=async(req,res)=>{
    try {
        const {serviceId}=req.params;
        const service=await Service.findOne({_id:serviceId}).populate("createdBy");
        res.status(200).send(service);
    } catch (error) {
        console.log(error);
    }
}

//Update service
exports.updateService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { serviceName, amount, description } = req.body;
        const service = await Service.findOne({ _id: serviceId });
        if (!service) res.status(400).json({ error: "Service not found!" });
        else {
            if (service.createdBy.toString().trim() != req.artist._id.toString().trim()) res.status(400).json({ error: "Only admin can update his/her service!" });
            else {
                await Service.updateOne({ _id: serviceId }, {
                    $set: {
                        serviceName, amount, description
                    }
                })
                res.status(200).json({ message: "Service updated!" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get own services
exports.getOwnServices = async (req, res) => {
    try {
        const services = await Service.find({ createdBy: req.artist._id }).populate("createdBy");
        res.status(200).send(services);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Upload image
exports.uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const {caption,price}=req.body;
        let data = await uploadImage(file);
        const album=new Album({
            fileUrl:data,postedBy:req.artist._id,caption,price
        })
        await album.save(); 
        unlinkFile(file.path);
        res.status(201).json({ message: "File uploaded!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Read file
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

//Get all files of a user
exports.getAllOwnFiles=async(req,res)=>{
    try {
        const albums=await Album.find({createdBy:req.artist._id}).populate("postedBy");
        res.status(200).send(albums);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Delete image
exports.deleteFile = async (req, res) => {
    try {
        const { fileKey } = req.params;
        await deleteImage(fileKey);
        await Album.deleteOne({fileUrl:fileKey});
        res.status(200).json({ message: "File deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Add event to google calendar
exports.addEvent = async (req, res) => {
    try {
        const { summary, startTime, endTime, location, description, colorId, attendees } = req.body;

        const eventStartTime = new Date()
        eventStartTime.setDate(eventStartTime.getDay() + 2)

        // Create a new event end date instance for temp uses in our calendar.
        const eventEndTime = new Date()
        eventEndTime.setDate(eventEndTime.getDay() + 4)
        eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

        const resp = await addEventToGoogleCalender(summary, startTime, endTime, location, description, colorId, attendees);
        console.log(resp);
        res.status(201).json({ message: "Event created!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}

//Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        await deleteEventFromGoogleCalender(eventId);
        res.status(200).json({ message: "Event deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}