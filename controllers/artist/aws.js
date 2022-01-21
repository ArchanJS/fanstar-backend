require('dotenv').config()
const AWS = require('aws-sdk');
const {nanoid} = require('nanoid');
const fs=require('fs');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
})
exports.uploadImage = async (file) => {
  try {
    let attachment = file.originalname.split('.')
    const fileType = attachment[attachment.length - 1]
    const fileStream=fs.createReadStream(file.path);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${nanoid()}.${fileType}`,
      Body: fileStream,
    }
    const data = await s3.upload(params).promise()
    return data.key
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong!");
  }
}
exports.deleteImage = async (key) => {
  try {
    s3.deleteObject(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      },
      function (err, data) {
        console.log(data)
      }
    )
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong!");
  }
}
exports.readImage = async (key) => {
  try {
    const downloadParams = {
      Key: key,
      Bucket: process.env.AWS_BUCKET_NAME,
    }
    const data = await s3.getObject(downloadParams).promise()
    return data.Body;
  } catch (error) {
    //console.log('ERROR IN GETTING IMAGE ', error)
    console.log(error)
    throw new Error("Image not found!");
  }
}

//Bucket policy

// {
//   "Version": "2012-10-17",
//   "Statement": [
//       {
//           "Sid": "AllowPublicReadAccess",
//           "Effect": "Allow",
//           "Principal": "*",
//           "Action": "s3:GetObject",
//           "Resource": "arn:aws:s3:::<bucket_name>/*"
//       }
//   ]
// }

//Bucket cors

// [
//   {
//       "AllowedHeaders": [
//           "*"
//       ],
//       "AllowedMethods": [
//           "GET",
//           "PUT",
//           "POST",
//           "DELETE"
//       ],
//       "AllowedOrigins": [
//           "*"
//       ],
//       "ExposeHeaders": []
//   }
// ]