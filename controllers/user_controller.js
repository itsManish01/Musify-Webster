const User = require('../models/user');

module.exports.profile = function(req,res){
    // res.end("users/profile");
    res.render('user_profile');
}

module.exports.signIN = function(req,res){
    // res.end("users/SignIn");
    if (req.isAuthenticated()){ //making sign in page not available if already signed IN
        return res.redirect('/users/profile');
      }
      
      return res.render("user_signIN",{
        // title : "Codecial | Sign In"
      });
}
module.exports.signUP = function(req,res){
    // res.end("users/SignUP");
    if (req.isAuthenticated()){    //making sign Up page not available if already signed IN
        return res.redirect('/users/profile');
      }
      return res.render("user_signUP",{
        // title : "Codecial | Sign Up"
      });
}
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
      return  res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err , user){
      if( err ){
        console.log('error in finding the user in Signing up');
      }
      if(!user){
        User.create( req.body , 
          function(err , user){
            if(err){ console.log('error in creating user while signing up');}
               return res.redirect('/users/sign-in');
        });
      }else{
        return res.redirect('back');
      }
    })
}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  };