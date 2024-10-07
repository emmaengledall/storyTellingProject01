// VORES IMPORTS
import * as THREE from 'three'; // Import af three.js 
import {OrbitControls} from '/examples/jsm/controls/OrbitControls.js'; // Orbit control

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


 // AMBIENTLIGHT
const ambiLight = new THREE.AmbientLight(0xffffff, .5 );
scene.add(ambiLight); // Tilføjer naturligt overall lys til omgivelserne



// ANIMATIONS FUNKTION 
function animate() {

    renderer.render(scene, camera); 
}








// THE GROUND 
const floorGeom = new THREE.PlaneGeometry(500, 500); // Geometrien af gulvet
const floorTexture = new THREE.TextureLoader().load('examples/textures/terrain/grasslight-big.jpg') // Loader min texture ind 
floorTexture.wrapS = THREE.RepeatWrapping; // Min texture gentager sig selv 
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(128,128); // Fortæller hvor stor min texture skal være hele tiden

const floorMat = new THREE.MeshStandardMaterial({color:0xffffff, map: floorTexture});
const floor = new THREE.Mesh(floorGeom, floorMat); 
floor.rotation.x = dtr(-90); // Hvilken vinkel vores floor skal ligge på
scene.add(floor); 


// STARS 
function createStars(){
    const points = [];
    const radius = 700; 
    for(let i=0;i<1000;i++){
        let angel = dtr(Math.random()*360);
        let x = radius * Math.cos(angel);
        let z = radius * Math.sin(angel);
        let y = Math.random() * 365; 
        points.push(new THREE.Vector3(x,y,z)); 
    };
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({color:0xffffff, fog:false}); 
    let stars = new THREE.Points(geometry, material);
    scene.add(stars);
    return stars;
};

let _stars = new createStars();


// TÅLMODIGHEDS PLANET
let sphere;
function buildSphere(x, y, z) {
    const geometry = new THREE.SphereGeometry(15, 32, 32); // Sphere geometrien
    const sphereTexture = new THREE.TextureLoader().load('examples/textures/planetsurface/desserttexture.jpg'); // Load texture
    sphereTexture.wrapS = THREE.RepeatWrapping; // Gentag texture horizontally
    sphereTexture.wrapT = THREE.RepeatWrapping; // Gentag texture vertically

    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        map: sphereTexture // tilføjer texture to vores material
    });

    sphere = new THREE.Mesh(geometry, sphereMat); // Lav sphere med vores material
    sphere.position.set(x, y, z); // Set positionen
    scene.add(sphere); // Tilføj sphere til scenen
}
buildSphere(0, 15, -80); // Bygger sphere med vores opdateret position



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