const Song = require('../models/songs');
const User = require('../models/user');
const Playlist = require('../models/playlist');

// var query = ;
module.exports.home= function(req,res){   
    // console.log(req.body); 
    Song.find({}, function(err,song){
        if(req.isAuthenticated()){
            User.findById(req.user._id)
            .populate('currentSong')
            .populate('likes')
            .exec(function(err,user){
                Playlist.find({
                    users : { "$in" : [req.user._id]} 
                },function(err,playlist){
                    if(err){
                        console.log(err);
                    }else{
                        return res.render('home', {
                            user : user ,
                            currentSong : user.currentSong, 
                            songs : song,
                            playlists : playlist ,
                        })
                    }
                }
                )
            })
        }else{
        if(err){
            console.log(err);return;
        }
        return res.render('home', {
            songs : song,
        })}
    })
}

