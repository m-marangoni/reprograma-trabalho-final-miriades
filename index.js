const balls = document.getElementById("ball");

function moveEyes(event) {
  let x = ((event.x) * 100) / window.innerWidth + "%";
  let y = ((event.y) * 100) / window.innerHeight + "%";
  console.log(event.clientX * 100 / window.innerWidth);
  balls.forEach(b) 
    function b() {
    b.style.left = x;
    b.style.top = y;
    b.style.transform = `translate(-${x} ,-${y})`;
  };
  
}

document.addEventListener("mousemove", moveEyes);