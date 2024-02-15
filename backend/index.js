const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const userMiddleware = require("./middleware/usermiddleware");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config');

const {user} = require('./Schema/schema');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

//Connecting to MongoDb
mongoose.connect('mongodb+srv://prakarsh1248:bolt1248@cluster0.izew7mz.mongodb.net/Zomato')
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.log('Error connecting to MongoDB'))

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/Images')
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage,
})

//SIGNUP 
app.post('/signup',async function(req,res){
    const {name,email,password} = req.body;
    const exists = await user.findOne({
        name: name,
        email: email
    })
    if(exists){
        console.log("User already exists");
        res.json({success:'false'})
    }else{
        await user.create({
            name: name,
            email: email,
            password:password
        })
        res.status(200).json({success:'true'});
    }
})

////LOGIN
app.post('/login',async function(req,res){
    const {email,password} = req.body;
    const exists = await user.findOne({
        email: email,
        password: password
    })
    if(exists){
        //Prev working code
        const token =jwt.sign({
            email
        },"Pro13421241");
        res.status(200).json({token,success:'true'});
    }else{
        res.json({success:'false'})
    }
    // console.log({name});
})

///UPLOAD IMAGES
app.post('/upload',userMiddleware,upload.single('file'),(req,res)=>{
    user.create({image: req.file.filename})
    .then(function(result){
        console.log('The result is' + result.image);
        res.json(result.image);
    })
    .catch(err => console.log(err))
})

////////GET IMAGES
app.get('/getImage',userMiddleware,(req,res)=>{
    user.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => res.json(err))
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})