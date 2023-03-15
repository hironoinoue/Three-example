import * as THREE from "three";

import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.15/+esm";

//UIデバッグ
const gui = new GUI();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/**
 * テクスチャ設定
 * /
/**
 * パーティクルを作ってみよう
 */
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("./img/1.png");

const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;

const positionArray = new Float32Array(count * 3);
const colorArray = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 10;
  colorArray[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3),
);
particlesGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colorArray, 3),
);



const pointMaterial = new THREE.PointsMaterial({
  size: 0.15,
  transparent: true,
  alphaMap: particlesTexture,
  //alphaTest: 0.001,
  //depthTest: false,
  depthWrite: false,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
});
//pointMaterial.map = particlesTexture;
//pointMaterial.color.set("red");

const particles = new THREE.Points(particlesGeometry, pointMaterial)
scene.add(particles);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();


function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  for(let i = 0; i < count; i++) {
    const i3 = i * 3;

    const x = particlesGeometry.attributes.position.array[i3 + 0] 
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
}

animate();
=======
import {OrbitControls} from "./jsm/controls/OrbitControls.js";

let scene, camera,renderer,pointLight,controls;

window.addEventListener("load", init);

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 500);
  renderer = new THREE.WebGLRenderer({alpha: true});
  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  let textures = new THREE.TextureLoader().load("./img/earth.jpg");
  let ballGeometry = new THREE.SphereGeometry(100, 64,32);
  let ballMaterial = new THREE.MeshPhysicalMaterial({map: textures});
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

  scene.add(ballMesh);
  
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);
  
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);
  
  controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);
  animate();
}

//resize for browser 
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  pointLight.position.set(
    200 * Math.sin (Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

