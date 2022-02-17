const User = require('../../models/User');
const Artist = require('../../models/Artist');
const Service = require('../../models/Service');
const Album = require('../../models/Album');
const twilio = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

//Generate OTP
exports.generateOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    const exists = await User.findOne({ phone });
    if (!exists) {
      const user = new User({ phone });
      await user.save();
      await twilio.verify
        .services(process.env.SERVICE_ID)
        .verifications.create({
          to: `+91${phone}`,
          channel: "sms",
        })
      res.status(201).json({ message: "Code sent!" });
    }
    else {
      if (exists.blocked == true) res.status(400).json({ error: "User is blocked!" });
      else {
        await twilio.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+91${phone}`,
            channel: "sms",
          })
          res.status(200).json({message:"Code sent!"});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}


//Verify OTP
exports.verify = async (req, res) => {
  const { phone, code } = req.body;
  try {
    const resp = await twilio.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: code,
      })
    if (resp.valid == false) {
      res.status(500).send("Something went wrong");
    }
    else {
      const user = await User.findOne({ phone });
      const token = await user.generateToken();
      res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Get an artist
exports.getArtist = async (req, res) => {
  try {
    let artist = await Artist.findOne({ _id: req.params.artistId });
    artist = await Artist.findOneAndUpdate({ _id: req.params.artistId }, {
      $set: {
        appVisits: artist.appVisits + 1
      }
    }, { new: true })
    res.status(200).send(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Get services of an artist
exports.getServicesofAnArtist = async (req, res) => {
  try {
    const services = await Service.find({ createdBy: req.params.artistId }).populate("createdBy");
    res.status(200).send(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Get all albums of an artist
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ postedBy: req.params.artistId });
    res.status(200).send(albums);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}