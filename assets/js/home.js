let btn = document.getElementById("btn");
let x = document.getElementById("player-audio");
function loop() {
  if (x.loop == false) {
    x.loop = true;
    btn.style.color = "black";
  } else {
    x.loop = false;
    btn.style.color = "grey";
  }
}
function copyToClipBoard(pid) {
  console.log(pid);
  navigator.clipboard.writeText(pid);
  alert("Copied to ClipBoard");
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function setup() {
  var i = 1;
  var songNameId = "songName" + i;
  var artistNameId = "artistName" + i;
  audioPlayer = document.getElementById("player-audio");
  var nextSongSrc = document.getElementById(`${songNameId}`).nextElementSibling
    .innerHTML;
  var nextSongArtist = document.getElementById(`${artistNameId}`)
    .nextElementSibling.innerHTML;

  document.getElementById("player-audio").addEventListener(
    "ended",
    function () {
      songNameId = "songName" + i;
      artistNameId = "artistName" + i;
      nextSongSrc = document.getElementById(`${songNameId}`).nextElementSibling
        .innerHTML;
      nextSongArtist = document.getElementById(`${artistNameId}`)
        .nextElementSibling.innerHTML;
      audioPlayer.src = "/songs/" + nextSongSrc + ".mp3";
      document.getElementById("s-name").innerText = nextSongSrc;
      document.getElementById("a-name").innerText = nextSongArtist;
      document.getElementById("songArt").src =
        "/images/" + nextSongSrc + ".png";
      i++;
      audioPlayer.load();
      audioPlayer.play();
    },
    false
  );
}


