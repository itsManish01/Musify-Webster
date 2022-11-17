

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
  alert("ID Copied to ClipBoard");
}

