// canvas setup
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// watch for browser resizing, reinitialize stars
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});


function Star(x, y, height, speed) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.speed = speed;
  this.color = "#fff";
  
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, height, height);
  }

  this.update = () => {
    // check bounds
    if (this.y + this.height < 0) {
      this.y = innerHeight;
    }
    this.y -= this.speed;

    this.draw();
  }
}

// Star dimensions and speed
const stars = {
  nearStar : {
    height : 3,
    speed : 0.2
  },
  midStar : {
    height : 2,
    speed : 0.1
  },
  farStar : {
    height : 1,
    speed : 0.025
  }
};

let starArray = [];

// clear starArray and generate 3 layers of stars randomly
function init() {

  starArray = [];
  // nearest stars
  for (let i=0; i < 50; ++i) {
    const x = Math.random() * (innerWidth - stars.nearStar.height);
    const y = Math.random() * (innerHeight - stars.nearStar.height);
    starArray.push(new Star(x, y, stars.nearStar.height, stars.nearStar.speed));
  }

  // mid-distance stars
  for (let i=0; i < 100; ++i) {
    const x = Math.random() * (innerWidth - stars.midStar.height);
    const y = Math.random() * (innerHeight - stars.midStar.height);
    starArray.push(new Star(x, y, stars.midStar.height, stars.midStar.speed));
  }

  // farthest stars
  for (let i=0; i < 350; ++i) {
    const x = Math.random() * (innerWidth - stars.farStar.height);
    const y = Math.random() * (innerHeight - stars.farStar.height);
    starArray.push(new Star(x, y, stars.farStar.height, stars.farStar.speed));
  }
}

// loop to call update function on each star
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var star of starArray) {
    star.update();
  }
}

init();
animate();