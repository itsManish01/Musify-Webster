const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        require: true,
        unique : true
    },
    password : {
        type  : String , 
        require: true,
    },
    name :{
        type : String,
        require: true,
    },
    currentSong : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Song',
    },
    history : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Song',
        }
    ],
    playlist : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Playlist',
        }
    ],
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Song',
        }
    ]
}, {
    timestamps : true,
});

const User = mongoose.model('User' , userSchema);
module.exports = User ; 