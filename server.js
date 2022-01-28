const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');

const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
let { storeMessage, getMessages } = require('./utils/chat');
const SocketModel=require('./models/Socket');
const { Socket } = require('dgram');

const server = http.createServer(app);
const io = socketio(server);

require('./db/conn');

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));

app.use(cors());
app.use(morgan("dev"));

const port=process.env.PORT || 8000;

//Login routes
app.use('/api/login',require('./routes/login/login'));

//User's routes
app.use('/api/user/public',require('./routes/user/public'));
app.use('/api/user/private',require('./routes/user/private'));

//Artist's routes
app.use('/api/artist/public',require('./routes/artist/public'));
app.use('/api/artist/private',require('./routes/artist/private'));

//Employee's routes
app.use('/api/employee/public',require('./routes/employee/public'));
app.use('/api/employee/private',require('./routes/employee/private'));

//Admin's routes
app.use('/api/admin/public',require('./routes/admin/public'));
app.use('/api/admin/private',require('./routes/admin/private'));

const { addMessage } = require('./utils/socketServer')

const Messages=require("./models/Message");

//Socket-io
// io.on('connection', (socket) => {
// 	console.log("New websocket connected!", socket);


// 	// whenever someone joins store or update their socketid in database
// 	socket.on('updatesocketid', async (userid) => {
// 		let isMatch = await SocketModel.findOne({ userid: mongoose.Types.ObjectId(userid) });
// 		if (!isMatch) {
// 			let socketdata = new SocketModel({
// 				userid: mongoose.Types.ObjectId(userid),
// 				socketid: socket.id
// 			})
// 			await socketdata.save();
// 		} else {
// 			let updates = {
// 				socketid: socket.id
// 			}
// 			await SocketModel.findOneAndUpdate({ userid: mongoose.Types.ObjectId(userid) }, { $set: updates });
// 		}
// 		let messages = await getMessages(userid); //getting messages of the user who has joined .
// 		socket.emit('messages', messages);

// 	})

// 	socket.on('privatemessage', async ({ user1, user2, message }) => {
// 		console.log('inside', user1, user2, message);
// 		await storeMessage(message, user1, user2);
// 		let socketdata = await SocketModel.findOne({ userid: mongoose.Types.ObjectId(user2) });
// 		if (socketdata) { // if only one is online then only send him the message otherwise just store his messages.
// 			socket.to(socketdata.socketid).emit('privatemessage', message);
// 		}
// 	})


	// adding a user into a room
	// socket.on('addinroom', async (member, roomid) => {
	// 	let status = await checkroom(roomid);
	// 	if (status.error) {
	// 		let errmsg = { error: status.error };
	// 		socket.broadcast.to(roomid).emit('error', errmsg);
	// 	}
	// 	let { error } = await addinroom(member, roomid);
	// 	if (error) {
	// 		let errmsg = { error };
	// 		socket.broadcast.to(roomid).emit('error', errmsg);
	// 	}
	// 	socket.join(roomid);
	// })

	// recieving and then sending the message
	// socket.on('message', async (message, roomid, sender, reciever) => {
	// 	await storeMessage(message, roomid, sender, reciever);
	// 	socket.broadcast.to(roomid).emit('message', message);
	// })

// 	socket.on('disconnect', async function () {
// 		console.log('disconnected');
// 	    // when user goes offline delete his socketid from db so that we can know which user is online or offline
// 		await SocketModel.findOneAndDelete({socketid:socket.id});
// 	});
// })

io.on('connection', (socket) => {
	// When User Connect Current Socket of the user will Update
	console.log("Socket Id ",socket.id)
  
	socket.on("JOIN_ROOM",async (room) => {
	  console.log("Room connected ", room)
	  socket.join(room);
	  const messages=await Messages.find({conversation:room}) 
	  socket.emit("ALL_MESSAGES",messages)
	  socket.broadcast.to(room).emit('USER_ONLINE', 'ONLINE');
	});

	socket.on("USER_ONLINE",(room)=>{
	  socket.broadcast.to(room).emit('USER_ONLINE', 'ONLINE');
	})
	
	socket.on(
	  'NEW_MESSAGE',
	  async ({ conversationId, sender, receiver, message }) => {
		console.log(conversationId, sender[0], receiver, message)
		const newMessage = await addMessage(sender[0], message, conversationId)
		io.to(conversationId).emit("NEW_MESSAGE", newMessage);
	  }
	)

	socket.on('createSocket', async (userId) => {
	  console.log("Usser Id ",userId)
	  const createConnection = await manageSocket(userId, socket.id)
	  console.log('User Connected ', createConnection)
	})
	
	// When Sender the message search receiver socket and message to receiver​
	// socket.on(
	//   'privatemessage',
	//   async ({ conversationId, sender, receiver, message }) => {
	//     const receiverSocket = await manageSocket(receiver)
	//     const newMessage = await addMessage(sender, message, conversationId)
	//     socket.to(receiverSocket.socketId).emit('privatemessage', newMessage)
	//   }
	// )
	// When one user unmatched the other

	socket.on('disconnect', async function (roomid) {
	  console.log(' user unmatched ')
	  socket.broadcast.to(roomid).emit('userunmatched')
	})
  })



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})