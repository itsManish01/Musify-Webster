const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
    name :{
        type : String,
        require: true,
    },
    artist :{
        type : String,
        require: true,
    },
    src:{
        type : String,
        required: true,
    },
    art:{
        type : String,
        required: true,
    }
});

const Song = mongoose.model('Song' , songsSchema);
module.exports = Song ; 