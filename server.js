const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
const Chat=require('./models/Chat');

const mongoose = require('mongoose');
const http = require('http');
const SocketModel=require('./models/Socket');
const { Socket } = require('dgram');
const moment=require('moment');

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

//Chat routes
app.use('/api/chat',require('./routes/chat/chat'));

//Emoji uploading api
app.use('/api/emoji',require('./routes/emoji/emoji'));

const server=app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

//Socket-io
const io=require('socket.io')(server,
    {
        cors: {
          origin: ["http://localhost:3000","https://fanstar.app","https://fanstar-app.netlify.app/"],
          methods: ["GET", "POST"]
        }
    });

io.on("connection",(socket)=>{
    console.log("Connected to socket!");
    socket.on('joined',({userId,roomId})=>{
        // console.log(roomId);
        socket.join(roomId);
    })
    socket.on("sendmessage",async({userId,roomId,message,isImage})=>{
        const chat=await Chat.findOneAndUpdate({_id:roomId},{
            $push:{
                allMessages:{senderId:userId,message,time:moment().format(),isImage}
            }
        },{new:true})
        console.log(userId);
        // const messages=await Message.find(,);
        // socket.to().emit("sendallmessages",{allMessages:chat.allMessages});
        io.to(roomId).emit("sendallmessages",{allMessages:chat.allMessages});
    })
})