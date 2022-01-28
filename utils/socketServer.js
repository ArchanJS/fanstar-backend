const Messages = require('../models/Message')
const Conversation=require('../models/Conversation');
exports.addMessage = async (sender, message, conversationId) => {
  const newMessage = await Messages.create({
    conversation: conversationId,
    image: null,
    video: null,
    audio: null,
    message: message,
    sender: sender,
  })
  const conversation=await Conversation.findByIdAndUpdate(conversationId,{
$set:{
  lastMessage:newMessage._id,
}
  })
  return newMessage
}