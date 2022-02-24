const Artist = require('../../models/Artist');
const Service = require('../../models/Service');
const Album = require('../../models/Album');
const Payment = require('../../models/Payment');
const Chat = require('../../models/Chat');
const Withdraw = require('../../models/Withdraw');
const Image = require('../../models/Image');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { readImage, uploadImage, deleteImage } = require('./aws');
const { addEventToGoogleCalender, deleteEventFromGoogleCalender } = require('./addevent');

//Get own profile
exports.getOwnProfile = async(req, res) => {
    try {
        res.status(200).send(req.artist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get own payments
exports.getOwnPayments = async(req, res) => {
    try {
        const payments = await Payment.find({ artistId: req.artist._id });
        res.status(200).send(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get own pending orders
exports.getOwnPendingOrders = async(req, res) => {
    try {
        const payments = await Payment.find({ artistId: req.artist._id, status: "pending" }).populate("userId").populate("serviceId");
        res.status(200).send(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Update profile
exports.updateProfile = async(req, res) => {
    try {
        const { username, profilePhoto, bio, coverPhoto } = req.body;
        await Artist.updateOne({ _id: req.artist._id }, {
            $set: { username, profilePhoto, bio, coverPhoto }
        })
        res.status(200).json({ message: "Profile updated!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Update own chat price
exports.updateOwnChatPrice = async(req, res) => {
    try {
        const { chatPrice } = req.body;
        await Artist.findOneAndUpdate({ _id: req.artist._id }, {
            $set: { chatPrice }
        })
        res.status(200).json({ message: "Chat price updated!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Create service
exports.createService = async(req, res) => {
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
exports.getService = async(req, res) => {
    try {
        const { serviceId } = req.params;
        const service = await Service.findOne({ _id: serviceId }).populate("createdBy");
        res.status(200).send(service);
    } catch (error) {
        console.log(error);
    }
}

//Update service
exports.updateService = async(req, res) => {
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
                        serviceName,
                        amount,
                        description
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

//Delete a service
exports.deleteService = async(req, res) => {
    try {
        await Service.deleteOne({ _id: req.params.serviceId });
        res.status(200).json({ message: "Service deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Complete service
exports.completePayment = async(req, res) => {
    try {
        //$and:[{serviceId:req.body.serviceId},{artistId:req.artist._id},{userId:req.body.userId}]
        let payment = await Payment.findOne({ _id: req.body.paymentId });
        if (payment && payment.artistId.toString().trim() == req.artist._id.toString().trim()) {
            payment = await Payment.findOneAndUpdate({ _id: payment._id }, {
                $set: {
                    doneForArtist: true
                }
            }, { new: true })
            if (payment.doneForUser == true) {
                await Payment.findOneAndUpdate({ _id: payment._id }, {
                    $set: {
                        status: "completed"
                    }
                })
                await Chat.deleteOne({ paymentId: req.body.paymentId });
            }
            res.status(200).json({ message: "Marked as done!" });
        } else {
            res.status(400).send({ error: "Can't change status!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get own services
exports.getOwnServices = async(req, res) => {
    try {
        const services = await Service.find({ createdBy: req.artist._id }).populate("createdBy");
        res.status(200).send(services);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Create an album
exports.createAlbum = async(req, res) => {
    try {
        // const files = req.files;
        // console.log(files);
        const { albumName, description, price } = req.body;
        const album = new Album({
            albumName,
            postedBy: req.artist._id,
            price,
            description
        })
        await album.save();
        // for (let i = 0; i < files.length; i++) {
        //     let data = await uploadImage(files[i]);
        //     await Album.findOneAndUpdate({ _id: album._id }, {
        //         $push: {
        //             images: data
        //         }
        //     })
        //     unlinkFile(files[i].path);
        // }
        // console.log(files);
        res.status(201).json({ albumId:album._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Add image to an album
exports.updateAlbum = async(req, res) => {
    try {
        const {images} = req.body;
        for (let i = 0; i < images.length; i++) {
            // let data = await uploadImage(files[i]);
            await Album.findOneAndUpdate({ _id: req.params.albumId }, {
                $push: {
                    images: images[i]
                }
            })
            // unlinkFile(files[i].path);
        }
        // await Album.findOneAndUpdate({_id:req.params.albumId},{
        //     $push:{
        //         images:{fileUrl:data,caption}
        //     }
        // })
        // unlinkFile(file.path);
        res.status(200).json({ message: "Photo(s) uploaded!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Remove and image from an album
exports.removeImageFromAlbum = async(req, res) => {
    try {
        const { albumId, url } = req.body;
        await Album.findOneAndUpdate({ _id: albumId }, {
            $pull: {
                images: url
            }
        })
        await deleteImage(url);
        res.status(200).json({ message: "Image removed from album!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get all own albums
exports.getAllOwnAlbums = async(req, res) => {
    try {
        const albums = await Album.find({ postedBy: req.artist._id });
        res.status(200).send(albums);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get a particular album
exports.getAParticularAlbum = async(req, res) => {
    try {
        const album = await Album.findOne({ _id: req.params.albumId });
        res.status(200).send(album);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}


//Read file
exports.readFile = async(req, res) => {
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
exports.getAllOwnFiles = async(req, res) => {
    try {
        const albums = await Album.find({ createdBy: req.artist._id }).populate("postedBy");
        res.status(200).send(albums);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Delete single image
exports.deleteSingleImage = async(req, res) => {
    try {
        const { url } = req.params;
        await deleteImage(url);
        await Image.deleteOne({ url });
        res.status(200).json({ message: "Image deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Delete an album
exports.deleteAnAlbum = async(req, res) => {
    try {
        const album = await Album.findOne({ _id: req.params.albumId });
        for (let i = 0; i < album.images.length; i++) {
            await deleteImage(album.images[i]);
        }
        await Album.deleteOne({ _id: req.params.albumId });
        res.status(200).json({ message: "Album deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Upload single image
exports.uploadSingleImage = async(req, res) => {
    try {
        const file = req.file;
        const { caption, price } = req.body;
        const data = await uploadImage(file);
        const image = new Image({ url: data, caption, price, postedBy: req.artist._id });
        await image.save();
        unlinkFile(file.path);
        res.status(201).json({ message: "Image uploaded!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get own single images
exports.getOwnSingleImages = async(req, res) => {
    try {
        const images = await Image.find({ postedBy: req.artist._id });
        res.status(200).send(images);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Get a paricular image
exports.getParticularSingleImage = async(req, res) => {
    try {
        const image = await Image.findOne({ _id: req.params.imageId });
        res.status(200).send(image);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

//Add event to google calendar
exports.addEvent = async(req, res) => {
    try {
        const { summary, startTime, endTime, location, description, colorId, attendees } = req.body;

        const eventStartTime = new Date()
        eventStartTime.setDate(eventStartTime.getDay() + 2)

        // Create a new event end date instance for temp uses in our calendar.
        const eventEndTime = new Date()
        eventEndTime.setDate(eventEndTime.getDay() + 4)
        eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

        const resp = await addEventToGoogleCalender(summary, startTime, endTime, location, description, colorId, attendees);
        const { data } = resp;
        console.log(data.hangoutLink);
        res.status(201).send(data.hangoutLink);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}

//Delete event
exports.deleteEvent = async(req, res) => {
    try {
        const { eventId } = req.params;
        await deleteEventFromGoogleCalender(eventId);
        res.status(200).json({ message: "Event deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}

//Change theme
exports.changeTheme = async(req, res) => {
    try {
        const artist = await Artist.findOneAndUpdate({ _id: req.artist._id }, {
            $set: {
                theme: req.body.theme
            }
        }, { new: true })
        res.status(200).send(artist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}

//Create withdraw request
exports.createWithdrawReq = async(req, res) => {
    try {
        const artist = await Artist.findOne({ _id: req.artist._id });
        if (parseInt(artist.balance) < parseInt(req.body.amount)) res.status(400).json({ error: "Artist doesn't have enough balance!" });
        else {
            const withdraw = new Withdraw({ artistId: req.artist._id, amount: req.body.amount });
            await withdraw.save();
            res.status(201).json({ message: "Withdrawal request created!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}

//Get own withdrawal requests
exports.getOwnWithdrawals = async(req, res) => {
    try {
        const withdrawals = await Withdraw.find({ artistId: req.artist._id });
        res.status(200).send(withdrawals);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}

//Update any album's details
exports.updateAnAlbumsDetails = async(req, res) => {
    try {
        const { albumId, albumName, description, price } = req.body;
        await Album.findOneAndUpdate({ _Id: albumId }, {
            $set: { albumName, description, price }
        });
        res.status(200).json({ messages: "Album details updated!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Someting went wrong!" });
    }
}