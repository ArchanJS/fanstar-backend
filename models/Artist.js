const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const artistSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    },
    coverPhoto: {
      type: String,
      default:
        'https://thumbs.dreamstime.com/b/white-background-paper-texture-stock-photo-hearts-abstract-template-website-book-cover-valentines-mothers-day-95345656.jpg',
    },
    bio: {
      type: String,
    },
    balance: {
      type: String,
      default: '0.00',
    },
    paid: {
      type: String,
      default: '0.00',
    },
    theme: {
      type: String,
      default: 'black',
    },
    commission: {
      type: String,
      default: '70',
    },
    chatPrice: {
      type: String,
      default: '60',
    },
    feedbacks: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        stars: {
          type: Number,
        },
        message: {
          type: String,
        },
      },
    ],
    address: {
      type: String,
    },
    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
    },
    appName: {
      type: String,
    },
    appVisits: {
      type: Number,
      default: 0,
    },
    accountHolderName: {
      type: String,
    },
    accountNo: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    upiId: {
      type: String,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

artistSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

artistSchema.methods.generateToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES,
    });
    return token;
  } catch (error) {
    throw new Error('Token is not generated!');
  }
};

artistSchema.methods.comparePasswords = async function (password) {
  try {
    return await bcryptjs.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

const Artist = new mongoose.model('artist', artistSchema);

module.exports = Artist;
