const Artist = require('../../models/Artist');
const twilio = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

//Generate OTP
exports.generateOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    let statusCode = 200;
    const artist = await Artist.findOne({ phone });
    if (!artist) {
      res.status(400).json({ error: "Artist doesn't exist!" });
    }
    else if (artist.blocked == true) {
      res.status(400).json({ message: "Artist is blocked!" });
    }
    else {
      await twilio.verify
        .services(process.env.SERVICE_ID)
        .verifications.create({
          to: `+91${phone}`,
          channel: "sms",
        })
      res.status(statusCode).json({ message: "Code sent!" });
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
      const artist = await Artist.findOne({ phone });
      const token = await artist.generateToken();
      res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}