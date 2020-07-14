var noise = `
  //
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

// var mouseX = 0;
var lookUp = new THREE.Vector3(0, 1.5, 0);
var materialShaders = [];
var speed = 4;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
camera.position.set(0, 1, 5);
camera.lookAt(lookUp);
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
var canvas = renderer.domElement;
document.querySelector('#slide1').appendChild(canvas);
canvas.setAttribute('class', 'grid');
canvas.setAttribute('style', 'position: absolute');
var width = canvas.clientWidth;
var height = canvas.clientHeight;



// GROUND AND ROAD
var planeGeom = new THREE.PlaneBufferGeometry(100, 100, 200, 200);
planeGeom.rotateX(-Math.PI * 0.5);
var planeMat = new THREE.MeshBasicMaterial({
  color: 0xff11ee
});
planeMat.onBeforeCompile = shader => {
  shader.uniforms.time = { value: 0 };
  shader.vertexShader =
    `
    uniform float time;
    varying vec3 vPos;
  ` + noise + shader.vertexShader;//
  shader.vertexShader = shader.vertexShader.replace(
    `#include <begin_vertex>`,
    `#include <begin_vertex>
      vec2 tuv = uv;
      float t = time * 0.01 * ${speed}.; 
      tuv.y += t;
      transformed.y = snoise(vec3(tuv * 5., 0.)) * 5.;
      transformed.y *= smoothstep(5., 15., abs(transformed.x)); // road stripe
      vPos = transformed;
    `
  );
  shader.fragmentShader =
    `
    #extension GL_OES_standard_derivatives : enable

    uniform float time;
    varying vec3 vPos;

    float line(vec3 position, float width, vec3 step){
      vec3 tempCoord = position / step;
      
      vec2 coord = tempCoord.xz;
      coord.y -= time * ${speed}. / 2.;

      vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord * width);
      float line = min(grid.x, grid.y);
      
      return min(line, 1.0);
    }
  ` + shader.fragmentShader;
  shader.fragmentShader = shader.fragmentShader.replace(
    `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
    `
    float l = line(vPos, 2.0, vec3(2.0));
    vec3 base = mix(vec3(0.1, 0, 0.2), vec3(0.05, 0, 0.1), smoothstep(5., 7.5, abs(vPos.x)));
    vec3 c = mix(outgoingLight, base, l);
    gl_FragColor = vec4(c, diffuseColor.a);
    `
  );
  materialShaders.push(shader);
};
var plane = new THREE.Mesh(planeGeom, planeMat);
scene.add(plane);

var tlLookAt = TweenLite.fromTo(lookUp, 1, {y: 5}, {y: 1.5, ease: Linear.easeNone});
var clock = new THREE.Clock();
var time = 0;
render();
console.log(tlLookAt);
function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    camera.position.set(0, 1, 5);
  }
  time = clock.getElapsedTime();
  materialShaders.forEach(m => {
    m.uniforms.time.value = time;
  });

  camera.lookAt(lookUp);
  // camera.position.y += (mouseY - camera.position.y) * 0.01;
  
  // moveCamera();

  // console.log((mouseX - camera.position.x) * 0.1);
  renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// function mousemove(e) {

//   mouseX = (e.clientX - width/2);

// }

// function moveCamera() {

//   // camera.position.x = mouseX/width * 6;

//     if (warpSpeed) {
//       // if (rotateZ > -50) rotateZ -= 5;
//       // if (speed<100) speed +=1;
//       if (rotateY < 50) rotateY += 0.5;
//       camera.lookAt(0, rotateY, 0);

//       } else { 
//         // speed = 4;
//         if (rotateY > 1.5) {
//           // speed -=1;
//           rotateY -= 0.5;
//           camera.lookAt(0, rotateY, 0);
//         } else {
//           camera.lookAt(0, 1.5, 0);
//         }
//       }


// }