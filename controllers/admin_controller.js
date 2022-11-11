const Song = require("../models/songs");

module.exports.home = function (req, res) {
  return res.render("admin");
};

module.exports.addSong = function (req, res) {
  console.log(req.body);

  //Adding song to Database

  Song.create(
    {
      name: req.body.name,
      artist: req.body.artist,
      src: req.body.name + ".mp3",
      art: req.body.name + ".png",
    },
    function (err, song) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("Song added to DB");
        return res.redirect("back");
      }
    }
  );
};
