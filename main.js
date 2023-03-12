import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";

//サイズ
const sizes = {
  width: 800,
  height: 600,
};

//シーン
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const materila = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: false,
});

//オブジェクト
const mesh = new THREE.Mesh(geometry, materila);
scene.add(mesh);

//カメラ
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

//カメラ制御
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
//アニメーション
const animate = () => {
  controls.update();
  
  //レンダリング
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
