
canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;


const app = new PIXI.Application({width: canvasWidth, height: canvasHeight, backgroundColor: 0x1f1c2a});
document.body.appendChild(app.view);

// Get the texture for rope.
const starTexture = PIXI.Texture.from('./img/star.png');

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed0 = 0;
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
    star.sprite.anchor.x = 0.6;
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

// Listen for animate update
app.ticker.add((delta) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed0 += (warpSpeed - speed0) / 20;
    cameraZ += delta * 10 * (speed0 + baseSpeed);
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
        star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed0 * starStretch * distanceCenter / app.renderer.screen.width;
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
});
//======================================================
// let sceneBG, camera2, renderer2, starGeo, stars;
// function init() {
//     //create scene object
//     sceneBG = new THREE.Scene();
//     sceneBG.background = new THREE.Color(0x1f1c2a);
//     //setup camera with facing upward
//     camera2 = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1500);
//     camera2.position.z = 1;
//     // camera2.rotation.x = Math.PI/2;

//     //setup renderer
//     renderer2 = new THREE.WebGLRenderer();
//     renderer2.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer2.domElement);

//     starGeo = new THREE.Geometry();
//     for(let i=0;i<6000;i++) {
//         let star = new THREE.Vector3(
//         Math.random() * 3000 - 1500,
//         Math.random() * 3000 - 1500,
//         Math.random() * 3000 - 1500
//       );
//         star.velocity = 0;
//         star.acceleration = 0.02;
//         // star.scale = THREE.Vector3(1,1,10);
//       starGeo.vertices.push(star);
//     }
//     starGeo.rotateX(Math.PI * 0.5);
//     let sprite = new THREE.TextureLoader().load( 'https://pixijs.io/examples/examples/assets/star.png' );
//     let starMaterial = new THREE.PointsMaterial({
//       // color: 0xaaaaaa,
//       size: 0.9,
//       map: sprite
//     });

//     stars = new THREE.Points(starGeo,starMaterial);
//     sceneBG.add(stars);

//     animate(); 
// }
// //rendering loop
// function animate() {
//     starGeo.vertices.forEach(p => {
//     // p.acceleration = warpSpeed;
//     p.velocity += p.acceleration;

//     p.z += p.velocity;
     
//     if (p.z > 1500) {
//       p.z = -1500;
//       p.velocity = 0;
//     }
//     if (warpSpeed){p.scale = THREE.Vector3(1,1,1000);
//     } else {
//       p.scale = THREE.Vector3(1,1,1);
//     }
//     });
//     // console.log(camera2.position.x);
//     // camera2.position.x = -mouseX/width*500;
//     // camera2.lookAt(scene.position);
//     starGeo.verticesNeedUpdate = true;
//   renderer2.render(sceneBG, camera2);
//   requestAnimationFrame(animate);
// }
// init();