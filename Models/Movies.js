const mongoose = require ("mongoose")

const MovieSchema = new mongoose.Schema({
    moviename:{
        type:String,
        required:true,
        unique:true
    },
    genre:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    release:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("MovieSchema",MovieSchema);