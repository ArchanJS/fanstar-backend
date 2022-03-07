const Employee = require('../../models/Employee');
// const Artist = require('../../models/Artist');
// const Service = require('../../models/Service');
// const Album=require('../../models/Album');
const twilio = require('twilio')(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

//Generate OTP
exports.generateOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    const employee = await Employee.findOne({ phone });
    if (!employee) {
      res.status(400).json({ error: 'Employee doesnt exist' });
    } else if (employee.blocked == true) {
      res.status(400).json({ message: 'Employee is blocked!' });
    } else {
      await twilio.verify
        .services(process.env.SERVICE_ID)
        .verifications.create({
          to: `${phone}`,
          channel: 'sms',
        });
      res.status(200).json({ message: 'Code sent!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Verify OTP
exports.verify = async (req, res) => {
  const { phone, code } = req.body;
  try {
    const resp = await twilio.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `${phone}`,
        code: code,
      });
    if (resp.valid == false) {
      res.status(500).send('Something went wrong');
    } else {
      const employee = await Employee.findOne({ phone });
      const token = await employee.generateToken();
      res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
