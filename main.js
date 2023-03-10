import * as THREE from "three";

let scene, camera,renderer;

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
renderer.render(scene,camera);

let ballGeometry = new THREE.SphereGeometry(100, 64,32);
let ballMaterial = new THREE.MeshPhysicalMaterial();
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

renderer.render(scene,camera);