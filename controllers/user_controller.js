const User = require("../models/user");
const Song = require("../models/songs");
const { collection } = require("../models/user");
const passport = require('passport')
const passportLocal = require('passport-local');
const { isObjectIdOrHexString } = require("mongoose");
const { castObject } = require("../models/songs");
const Playlist = require('../models/playlist');
module.exports.profile = function (req, res) {
  // res.end("users/profile");
  User.findById(req.user._id)
    .populate('history')
    .sort([['updatedAt' , 1]])
    .exec(function (err, user) {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(user.history);
      return res.render("user_profile", {
        history: user.history,
      });
    });
};

module.exports.like= function(req,res){
  console.log(req.params.id);
  console.log(req.user._id)
  User.findById(req.user._id, function(err,user){
    if(err){
      console.log(err);return;
    }else{
        user.likes.push(req.params.id);
        user.save();
        return res.redirect('back');
    }
  })
  
}
module.exports.signIN = function (req, res) {
  // res.end("users/SignIn");
  if (req.isAuthenticated()) {
    //making sign in page not available if already signed IN
    return res.redirect("/users/profile");
  }

  return res.render("user_signIN", {
    // title : "Codecial | Sign In"
  });
};
module.exports.signUP = function (req, res) {
  // res.end("users/SignUP");
  if (req.isAuthenticated()) {
    //making sign Up page not available if already signed IN
    return res.redirect("/users/profile");
  }
  return res.render("user_signUP", {
    // title : "Codecial | Sign Up"
  });
};
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding the user in Signing up");
    }
    if (!user) {
      User.create({
        name: req.body.name ,
        email : req.body.email,
        password : req.body.password,
        currentPlaylist : [],
        currentSong : "636a3c64cc108c39c85f767a",
      }, function (err, user) {
        if (err) {
          console.log(err);
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.playSong = function (req, res) {
  // console.log(req.body);
  User.findById(req.body.user_id, function (err, user) {
    if (err) {
      console.log(err);
      return;
    } else {
      user.currentSong = req.body.song_id;
      user.temp = "single";
      user.history.push(req.body.song_id);
      user.save();
      return res.redirect("back");
    }
  });
};
module.exports.playLiked = function (req, res) {
  User.findById(req.body.user_id)
  .populate('likes')
  .exec(function (err, user) {
    if (err) {
      console.log(err);
      return;
    } else {
      user.currentPlaylist = user.likes;
      // console.log(user.currentPlaylist);
      user.temp = "likes"; 
      user.save();
      return res.redirect("back");
    }
  });
};
module.exports.addPlaylist  = function(req,res){
  // console.log(req.body);
  Playlist.findById(req.body.playlistID ,function(err,playlist){
    if(err){
      console.log(err);return ;
    }else{
      playlist.users.push(req.body.user_id);
      playlist.save();
      return res.redirect('back');
    }
  })
}
module.exports.createSession = function (req, res) {
  return res.redirect("/home");
};

module.exports.destroySession = function (req, res, next) {
  // console.log(req.params.id);
  User.findById(req.params.id , function(err,user){
    if(err){
      console.log(err);
    }else{
      user.currentSong = "636a3c64cc108c39c85f767a";
      user.temp = "single";
      user.save();
      // console.log(user);
    }
  })
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports.createPlaylist = function(req,res){
  // console.log(req.body);
  Playlist.create({
    name: req.body.name,
  },function(err,playlist){
    if(err){
      console.log(err);
      return ;
    }else{  
      playlist.users.push(req.body.user_id);
      playlist.save();
      return res.redirect('/');
    }
  })
};

module.exports.addSongInPlaylist =function(req,res){
  // console.log(req.body);
  Playlist.findById(req.body.playlistID, function(err,playlist){
    if(err){console.log(err);return;}
    if(playlist){
      playlist.songs.push(req.body.songID);
      playlist.save();
      return res.redirect('back');
    }else{
      return res.redirect('back');
    }
  })
  
}
