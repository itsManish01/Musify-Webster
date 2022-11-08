const Song = require('../models/songs');
const User = require('../models/user');

module.exports.home= function(req,res){    
    Song.find({}, function(err,song){
        if(req.isAuthenticated()){
            User.findById(req.user._id)
            .populate('currentSong')
            .exec(function(err,user){
                if(err){
                    console.log(err); return;
                }
                // console.log(user.currentSong);
                
                    return res.render('home', {
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

