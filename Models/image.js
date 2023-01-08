const mongoose = require("mongoose")

const image = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("image",image);