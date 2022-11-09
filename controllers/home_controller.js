const Song = require('../models/songs');
const User = require('../models/user');

// var query = ;
module.exports.home= function(req,res){   
    // console.log(req.body); 
    Song.find({}, function(err,song){
        if(req.isAuthenticated()){
            User.findById(req.user._id)
            .populate('currentSong')
            .exec(function(err,user){
                if(err){
                    console.log(err); return;
                }
                    return res.render('home', {
                     user : user ,
                     currentSong : user.currentSong, 
                     songs : song,
                })
                
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

