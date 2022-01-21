const mongoose=require('mongoose');

const db=process.env.MONGO_URI;

mongoose.connect(db).then(()=>console.log("DB Connected!")).catch((error)=>console.log(error));