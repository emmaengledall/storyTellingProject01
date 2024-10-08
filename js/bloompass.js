import * as THREE from 'three';

			import Stats from 'three/addons/libs/stats.module.js';
			import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
			import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
			import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
			import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
			import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

            //imported sceness 
            import SceneT from 'src/scenes/SceneT.js'; 


			let camera, stats;
			let composer, renderer, mixer, clock;
            var vw = window.innerWidth; // Difinere bredde på vores window
            var vh = window.innerHeight; // Difinere højden på vores window 

			const params = { // params til bloom effekt
				threshold: .2,
				strength: .8,
				radius: 1,
				exposure: 1
			};

 // MIN INIT FUNCTION
 // 
init();
async function init() {
				const container = document.getElementById( 'three' );
				clock = new THREE.Clock();
				const scene = new THREE.Scene();

				const camera = new THREE.PerspectiveCamera(50, vw/vh, .1, 2000); // Kamera 
				camera.position.set(  // Kamera standard position
                    -0, // z
                    -0, // y
                    100); // x
                    
				scene.add( camera ); // tilføjer kamera

				scene.add( new THREE.AmbientLight( 0xcccccc ) ); // Overall lyset på scenen
                scene.background = new THREE.Color(0x000000); // baggrunds farven

				const pointLight = new THREE.PointLight( 0xffffff, 10 ); // Opfind pointlight
				camera.add( pointLight ); // tilføj pointlight


 // AMBIENTLIGHT
                const ambiLight = new THREE.AmbientLight(0xffffff, .5 );
                scene.add(ambiLight); // Tilføjer naturligt overall lys til omgivelserne
//


GSAP.ticker.add(animate);
// ANIMATE FUNKTION 
function animate() {

				const delta = clock.getDelta();

				stats.update();

				composer.render();

                sphere.rotation.y += dtr(0.5);
                sphere01.rotation.y -= dtr(0.5);
                sphere02.rotation.y += dtr(0.5);
                
			}






// RENDERE WINDOW
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( animate );
				container.appendChild( renderer.domElement );
                renderer.render(scene, camera);
// 

		


 // RENDER BLOOM 
				const renderScene = new RenderPass( scene, camera );
                
				const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
				bloomPass.threshold = params.threshold;
				bloomPass.strength = params.strength;
				bloomPass.radius = params.radius;

				const outputPass = new OutputPass();
// 




// MIN EFFEKTCOMPOSER
				composer = new EffectComposer( renderer );
				composer.addPass( renderScene );
				composer.addPass( bloomPass );
				composer.addPass( outputPass );
//



				

// THE STATS
				stats = new Stats();
				container.appendChild( stats.dom );
//


		


// MIN ORBIT CONTROLS
				const controls = new OrbitControls( camera, renderer.domElement );
				// controls.maxPolarAngle = Math.PI * 0.5;
				// controls.minDistance = 3;
				// controls.maxDistance = 8;
//




// MIN LILLE SØDE GUI 
				const gui = new GUI();
				const bloomFolder = gui.addFolder( 'bloom' );

				bloomFolder.add( params, 'threshold', 0.0, 1.0 ).onChange( function ( value ) {
					bloomPass.threshold = Number( value );
				} );

				bloomFolder.add( params, 'strength', 0.0, 3.0 ).onChange( function ( value ) {
					bloomPass.strength = Number( value );
				} );

				gui.add( params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
					bloomPass.radius = Number( value );
				} );

				const toneMappingFolder = gui.addFolder( 'tone mapping' );

				toneMappingFolder.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
					renderer.toneMappingExposure = Math.pow( value, 4.0 );
				} );

				window.addEventListener( 'resize', onWindowResize );
//
			




//  MIN 3D MODELLER - THE FUN STUFF
            		
// STJERNER SOM ER LANGT VÆK - CREDIT TIL O.S 
function createStarsFar(){
            const points = [];
            const minRadius = 300;  // Minimum radius
            const maxRadius = 1000;  // Maximum radius
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
//


// STJERNER SOM ER TÆT PÅ
function createStarsClose(){
            const points = [];
            const minRadius = 100;  // Minimum radius
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
            let stars = new THREE.Points(geometry, material);
        scene.add(stars);
    return stars;
};
let stars = new createStarsClose();
//         




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

    sphere02 = new THREE.Mesh(geometry, sphereMat); // Lav sphere med vores material
    sphere02.position.set(x, y, z); // Set positionen
    sphere02.rotation.z = dtr(20);
    scene.add(sphere02); // Tilføj sphere til scenen
}
buildnSphere(70, 90, -180); // Bygger sphere med vores opdateret position


// TÅLMODIGHEDS PLANET
let sphere01;
function buildkSphere(x, y, z) {
        const geometry = new THREE.SphereGeometry(10, 32, 32); // Sphere geometrien
        const sphereTexture = new THREE.TextureLoader().load('examples/textures/planetsurface/desserttexture.jpg'); // Load texture
        sphereTexture.wrapS = THREE.RepeatWrapping; // Gentag texture horizontally
        sphereTexture.wrapT = THREE.RepeatWrapping; // Gentag texture vertically

        const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffff, 
        emissive: 0xf7e1a3, // Glow farve
        emissiveIntensity: 0, // glow intensity
        map: sphereTexture // tilføjer texture to vores material
    });

    sphere01 = new THREE.Mesh(geometry, sphereMat); // Lav sphere med vores material
    sphere01.position.set(x, y, z); // Set positionen
    scene.add(sphere01); // Tilføj sphere til scenen
}
buildkSphere(-87, 35, -180); // Bygger sphere med vores opdateret position








             } // init slut










 // WINDOW RESIZE 
function onWindowResize() {
				const width = window.innerWidth;
				const height = window.innerHeight;

				renderer.setSize( width, height );
				composer.setSize( width, height );

			}







// KONVERTER TIL GRADER FUNKTION 
function dtr(d){
                return d * (Math.PI/180);
            }
            
