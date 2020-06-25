// canvas setup
// const canvas = document.querySelector('canvas');
canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;
// const ctx = canvas.getContext('2d');

// watch for browser resizing, reinitialize stars
// window.addEventListener('resize', function() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   init();
// });


// function Star(x, y, height, speed) {
//   this.x = x;
//   this.y = y;
//   this.height = height;
//   this.speed = speed;
//   this.color = "#fff";
  
//   this.draw = function() {
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, height, height);
//   }

//   this.update = () => {
//     // check bounds
//     if (this.y + this.height < 0) {
//       this.y = innerHeight;
//     }
//     this.y -= this.speed;

//     this.draw();
//   }
// }

// // Star dimensions and speed
// const stars = {
//   nearStar : {
//     height : 3,
//     speed : 0.2
//   },
//   midStar : {
//     height : 2,
//     speed : 0.1
//   },
//   farStar : {
//     height : 1,
//     speed : 0.025
//   }
// };

// let starArray = [];

// // clear starArray and generate 3 layers of stars randomly
// function init() {

//   starArray = [];
//   // nearest stars
//   for (let i=0; i < 50; ++i) {
//     const x = Math.random() * (innerWidth - stars.nearStar.height);
//     const y = Math.random() * (innerHeight - stars.nearStar.height);
//     starArray.push(new Star(x, y, stars.nearStar.height, stars.nearStar.speed));
//   }

//   // mid-distance stars
//   for (let i=0; i < 100; ++i) {
//     const x = Math.random() * (innerWidth - stars.midStar.height);
//     const y = Math.random() * (innerHeight - stars.midStar.height);
//     starArray.push(new Star(x, y, stars.midStar.height, stars.midStar.speed));
//   }

//   // farthest stars
//   for (let i=0; i < 350; ++i) {
//     const x = Math.random() * (innerWidth - stars.farStar.height);
//     const y = Math.random() * (innerHeight - stars.farStar.height);
//     starArray.push(new Star(x, y, stars.farStar.height, stars.farStar.speed));
//   }
// }

// // loop to call update function on each star
// function animate() {
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, innerWidth, innerHeight);

//   for (var star of starArray) {
//     star.update();
//   }
// }

// init();
// animate();

const app = new PIXI.Application(canvasWidth, canvasHeight);
document.body.appendChild(app.view);

// Get the texture for rope.
const starTexture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/star.png');

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
let warpSpeed = 0;
const starStretch = 5;
const starBaseSize = 0.05;


// Create the stars
const stars = [];
for (let i = 0; i < starAmount; i++) {
    const star = {
        sprite: new PIXI.Sprite(starTexture),
        z: 0,
        x: 0,
        y: 0,
    };
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, true);
    app.stage.addChild(star.sprite);
    stars.push(star);
}

function randomizeStar(star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}

// Change flight speed every 5 seconds
// setInterval(() => {
//     warpSpeed = warpSpeed > 0 ? 0 : 1;
// }, 5000);

// Listen for animate update
app.ticker.add((delta) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
        const star = stars[i];
        if (star.z < cameraZ) randomizeStar(star);

        // Map star 3d position to 2d with really simple projection
        const z = star.z - cameraZ;
        star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
        star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

        // Calculate star scale & rotation.
        const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
        const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
        const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        const distanceScale = Math.max(0, (2000 - z) / 2000);
        star.sprite.scale.x = distanceScale * starBaseSize;
        // Star is looking towards center so that y axis is towards center.
        // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
        star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
});