

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

