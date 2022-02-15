const Emoji=require('../../models/Emoji');
const {uploadImage}=require('../artist/aws');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

//Upload emoji
exports.uploadEmoji=async(req,res)=>{
    try {
        const file = req.file;
        const { price } = req.body;
        const data = await uploadImage(file);
        const emoji = new Emoji({ emoji: data, price});
        await emoji.save();
        unlinkFile(file.path);
        res.status(201).json({ message: "Emoji uploaded!" });
    } catch (error) {
        console.log(error);
        res.status(200).json({error:"Something went wrong!"})
    }
}