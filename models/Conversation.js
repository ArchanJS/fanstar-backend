var mongoose = require('mongoose')
//Generic Schema for all travellor , Influencers and Locals
var conversationSchema = new mongoose.Schema(
  {
    influencer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
      required: [true, 'Influencer required in conversation'],
    },
    traveller: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
      default: null,
      required: [true, 'traveller required in conversation'],
    },
    journey: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Journeys',
      default: null,
      required: [true, 'JourneyId is required'],
    },
    lastMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Messages',
      default: null,
    }
  },
  {
    timestamps: true,
  }
)
const Conversations = mongoose.model('Conversations', conversationSchema)
module.exports = Conversations