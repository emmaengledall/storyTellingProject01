// VORES IMPORTS
import * as THREE from 'three'; // Import af three.js 
import {OrbitControls} from '/examples/jsm/controls/OrbitControls.js'; // Orbit control
import { EffectComposer } from '/examples/jsm/postprocessing/EffectComposer.js'; // Så vi kan loade effetker ind
import { RenderPass } from '/examples/jsm/postprocessing/RenderPass.js'; // Så vi kan rendere effetker

// EFFEKT IMPORTS
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js'; // Vores bloom pass 




// FUNDAMENTET - ALT BASALT SOM SKABER MINE OMGIVELSER
var canvasEl = document.getElementById("three"); // vores canvas element 
var vw = window.innerWidth; // Difinere bredde på vores window
var vh = window.innerHeight; // Difinere højden på vores window 


// VORES SCENE
const scene = new THREE.Scene(); // Selve scenen 
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(50, vw/vh, .1, 1000); // Kamera 



// RENDERER
const renderer = new THREE.WebGLRenderer({canvas: canvasEl}); // Renderer 
renderer.setSize(vw, vh); 
renderer.setAnimationLoop(animate); 
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = true; 


// lav Effektcomposer - så vi kan tilføje effekter
const composer = new EffectComposer(renderer);

// capture scene
const renderScene = new RenderPass(scene, camera);
composer.addPass(renderScene);



 // AMBIENTLIGHT
const ambiLight = new THREE.AmbientLight(0xffffff, .5 );
scene.add(ambiLight); // Tilføjer naturligt overall lys til omgivelserne





// EFFEKTER 
// BLLOOOM EFFEKKTTT ****
const bloomPass = new UnrealBloomPass(new THREE.Vector2(vw, vh), 3, 3, 2);
composer.addPass(bloomPass);

console.log(bloomPass);

// DEFINERE MIN SCENE - ISÆR MIN CONSTRUCTOR
const sceneT = new SceneT(); 


// ANIMATIONS FUNKTION 
function animate() {
    renderer.render(scene, camera); 
    composer.render();
    
}








// GULVET - JORDEN
const floorGeom = new THREE.PlaneGeometry(500, 500); // Geometrien af gulvet
const floorTexture = new THREE.TextureLoader().load('examples/textures/terrain/grasslight-big.jpg') // Loader min texture ind 
floorTexture.wrapS = THREE.RepeatWrapping; // Min texture gentager sig selv 
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(128,128); // Fortæller hvor stor min texture skal være hele tiden

const floorMat = new THREE.MeshStandardMaterial({color:0xffffff, map: floorTexture});
const floor = new THREE.Mesh(floorGeom, floorMat); 
floor.rotation.x = dtr(-90); // Hvilken vinkel vores floor skal ligge på
floor.receiveShadow = true; 
// scene.add(floor); 



// STJERNER SOM ER LANGT VÆK
function createStarsFar(){
    const points = [];
    const minRadius = 600;  // Minimum radius
    const maxRadius = 1500;  // Maximum radius
    for (var i = 0;i<8000;i++){
        var radius = Math.random() * (maxRadius - minRadius) + minRadius;
        var angle = dtr(Math.random()*360);
        var x = radius * Math.cos(angle);
        var z = radius * Math.sin(angle);
        var y = (Math.random() * 1080) - 550;
        points.push (new THREE.Vector3(x,y,z));

    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({color:0xffffff, fog:false}); 
    let starsFar = new THREE.Points(geometry, material);
    scene.add(starsFar);
    return starsFar;
};

let starsFar = new createStarsFar();


// FUNKTION FOR STJERNER TÆT PÅ
function createStarsClose(){
    const points = [];
    const minRadius = 100;  // Minimum radius
    const maxRadius = 500;  // Maximum radius
    for (var i = 0;i<8000;i++){
        var radius = Math.random() * (maxRadius - minRadius) + minRadius;
        var angle = dtr(Math.random()*360);
        var x = radius * Math.cos(angle);
        var z = radius * Math.sin(angle);
        var y = (Math.random() * 1080) - 550;
        points.push (new THREE.Vector3(x,y,z));

    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({color:0xffffff, fog:false}); 
    let stars = new THREE.Points(geometry, material);
    scene.add(stars);
    return stars;
};

let stars = new createStarsClose();




// DE FORSKELLIGE PLANETTER 

// KÆRLIGHEDENS PLANET
let sphere;
function buildTSphere(x, y, z) {
    const geometry = new THREE.SphereGeometry(10, 32, 32); // Sphere geometrien
    const sphereTexture = new THREE.TextureLoader().load('examples/textures/planetsurface/lovetexture.jpg'); // Load texture
    sphereTexture.wrapS = THREE.RepeatWrapping; // Gentag texture horizontally
    sphereTexture.wrapT = THREE.RepeatWrapping; // Gentag texture vertically

    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        emissive: 0xf5c277, // Glow farve
        emissiveIntensity: .0, // glow intensity
        map: sphereTexture, // tilføjer texture to vores material
    
    });

    sphere = new THREE.Mesh(geometry, sphereMat); // Lav sphere med vores material
    sphere.position.set(x, y, z); // Set positionen
    scene.add(sphere); // Tilføj sphere til scenen
}
buildTSphere(0, 15, -80); // Bygger sphere med vores opdateret position



// TÅLMODIGHEDS PLANET
let sphere01;
function buildkSphere(x, y, z) {
    const geometry = new THREE.SphereGeometry(10, 32, 32); // Sphere geometrien
    const sphereTexture = new THREE.TextureLoader().load('examples/textures/planetsurface/desserttexture.jpg'); // Load texture
    sphereTexture.wrapS = THREE.RepeatWrapping; // Gentag texture horizontally
    sphereTexture.wrapT = THREE.RepeatWrapping; // Gentag texture vertically

    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        emissive: 0xf7e1a3, // Glow farve
        emissiveIntensity: .0, // glow intensity
        map: sphereTexture // tilføjer texture to vores material
    });

    sphere = new THREE.Mesh(geometry, sphereMat); // Lav sphere med vores material
    sphere.position.set(x, y, z); // Set positionen
    scene.add(sphere); // Tilføj sphere til scenen
}
buildkSphere(-37, 35, -180); // Bygger sphere med vores opdateret position


// NYSGERRIGHEDS PLANET
let sphere02;
function buildnSphere(x, y, z) {
    const geometry = new THREE.SphereGeometry(10, 32, 32); // Sphere geometrien
    const sphereTexture = new THREE.TextureLoader().load('examples/textures/planetsurface/swamptexture.jpg'); // Load texture
    sphereTexture.wrapS = THREE.RepeatWrapping; // Gentag texture horizontally
    sphereTexture.wrapT = THREE.RepeatWrapping; // Gentag texture vertically

    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        emissive: 0x4dbe3f, // Glow farve
        emissiveIntensity: .0, // glow intensity
        map: sphereTexture // tilføjer texture to vores material
    });

    sphere = new THREE.Mesh(geometry, sphereMat); // Lav sphere med vores material
    sphere.position.set(x, y, z); // Set positionen
    scene.add(sphere); // Tilføj sphere til scenen
}
buildnSphere(37, 60, -180); // Bygger sphere med vores opdateret position










//INIT
camera.position.z = 20; // Kamera positon som default på z 
camera.position.y = 1; // Kamera positon som default på y
camera.position.x = 0; // Kamera positon som default på y
const controls = new OrbitControls(camera, canvasEl); // Orbit control 

function dtr(d){
    return d * (Math.PI/180);
}



// FUNKTION SOM RESIZE´ER
function resized(e){
    vw = window.innerWidth; 
    vh = window.innerHeight;
    console.log(vh, vw, "Det er skærm størrelsen");

    camera.aspect = vw/vh; 
    camera.updateProjectionMatrix(); 
    renderer.setSize(vw, vh); 
}; 

window.addEventListener("resize", resized);
resized(null);