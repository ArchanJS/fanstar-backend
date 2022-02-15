const router=require('express').Router();
const {uploadEmoji}=require('../../controllers/emoji/emoji');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//Upload image
router.post('/uploademoji',upload.single("emojiFile"),uploadEmoji);

module.exports=router;