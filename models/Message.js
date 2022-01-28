var mongoose = require('mongoose')
var messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Conversations',
      required: [true, 'Conversation is required'],
    },
    image: {
      type: String,
      default: null,
    },
    video: {
      type: String,
      default: null,
    },
    audio: {
      type: String,
    },
    message: {
      type: String,
      trim: true,
      default: null,
    },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
      required: [true, 'Sender is Required'],
    },
  },
  {
    timestamps: true,
  }
)
const Messages = mongoose.model('Messages', messageSchema)
module.exports = Messages