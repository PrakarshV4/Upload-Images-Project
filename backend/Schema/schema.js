const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    image: String
})
const user = mongoose.model("user",userSchema)

module.exports ={user}  ;
