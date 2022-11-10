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
    temp: {
        type: String,
        default : "single"
    },
    currentSong : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Song',
    },
    currentPlaylist : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Song',
        }
    ],
    history : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Song',
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