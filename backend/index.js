const express=require('express');
const multer=require('multer');
const cloudinary = require('cloudinary').v2
const fs=require('fs');
const path=require('path');


const app=express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images.js')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

          
  cloudinary.config({ 
    cloud_name: 'ddlllf24r', 
    api_key: '312634993425544', 
    api_secret: 'UEO-eZIIZpx3L7rBt9x9O1u7zxc' 
  });

  app.post('/upload', upload.single('image'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"})
    }
    cloudinary.uploader.upload(req.file.path, (err,result)=>{
        if(err){
            return res.status(401).json({message:'Error'})
        }
fs.unlinkSync(req.file.path);
res.status(200).json({imageurl:result.secure_url})
    })
  })

app.listen(8080,()=>{
    console.log('server is running at port 8080')
})