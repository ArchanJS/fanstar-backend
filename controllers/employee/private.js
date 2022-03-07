const Employee = require('../../models/Employee');
const Payment = require('../../models/Payment');
const Artist = require('../../models/Artist');
const Album = require('../../models/Album');
const Service = require('../../models/Service');

//Get own profile
exports.getOwnProfile = async (req, res) => {
  try {
    res.status(200).send(req.employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, gender, profilePhoto } = req.body;
    await Employee.updateOne(
      { _id: req.employee._id },
      {
        $set: { username, email, gender, profilePhoto },
      }
    );
    res.status(200).json({ message: 'Profile updated!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Get artists of an employee
exports.getOwnArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ assignedEmployee: req.employee._id });
    const orders = await Payment.find({ status: 'pending' });
    const retArr = [];
    for (let i = 0; i < artists.length; i++) {
      let pendingOrders = 0;
      for (let j = 0; j < orders.length; j++) {
        if (
          artists[i]._id.toString().trim() ==
          orders[j].artistId.toString().trim()
        )
          pendingOrders++;
      }
      retArr.push({
        artistId: artists[i]._id,
        artistName: artists[i].username,
        profilePhoto: artists[i].profilePhoto,
        pendingOrders,
      });
    }
    res.status(200).send(retArr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Get a particular
exports.getAParticularArtist = async (req, res) => {
  try {
    const payments = await Payment.find({ artistId: req.params.artistId });
    const artist = await Artist.findOne({ _id: req.params.artistId });
    const retArr = [];
    let totalOrders = payments.length;
    let pendingOrders = 0;
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].status == 'pending') pendingOrders++;
    }
    // console.log(typeof(artist))
    const orderObj = { totalOrders, pendingOrders };
    res.status(200).send({ artistDet: artist, orderObj });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Get no. of total and pending orders of an artist
exports.getOrdersofAnArtist = async (req, res) => {
  try {
    const totalOrders = await Payment.find({ artistId: req.params.artistId });
    const pendingOrders = await Payment.find({
      artistId: req.params.artistId,
      status: 'pending',
    });
    res.status(200).json({
      totalOrders: totalOrders.length,
      pendingOrders: pendingOrders.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Get payments of an artist
exports.getPaymentsOfAnArtist = async (req, res) => {
  try {
    const payments = await Payment.find({ artistId: req.params.artistId });
    res.status(200).send(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Delete an artist
exports.deleteAnArtist = async (req, res) => {
  try {
    await Album.deleteMany({ postedBy: req.params.artistId });
    await Service.deleteMany({ createdBy: req.params.artistId });
    await Payment.deleteMany({ artistId: req.params.artistId });
    await Artist.deleteOne({ _id: req.params.artistId });
    res.status(200).json({ message: 'Artist deleted!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Get all payments of own artists
exports.getPaymentsOfOwnArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ assignedEmployee: req.employee._id });
    const payments = await Payment.find();
    const retArr = [];
    const paymentArr = [];
    for (let i = 0; i < artists.length; i++) {
      let paymentsOfArtist = [];
      for (let j = 0; j < payments.length; j++) {
        if (
          artists[i]._id.toString().trim() ==
          payments[j].artistId.toString().trim()
        ) {
          paymentsOfArtist.push(payments[j]);
          paymentArr.push(payments[j]);
        }
      }
      retArr.push({ artist: artists[i], paymentsOfArtist });
    }
    res.status(200).send(paymentArr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
