import * as THREE from 'three'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // loading 3d model 

export default class Planet1 {

constructor(){
            this.group = new THREE.Group(); // vores gruppe, hvor alle vores objekter, for denne constructor ligger. En usylig placeholder. 
            this.CreateSurface(); 
            this.CreateAmbientLight();                             

}

CreateSurface() {
    // Declare the model variable
    var planetSurface; 

    const loader = new GLTFLoader().setPath('src/3dmodels/');
    loader.load('Landscape.glb', (gltf) => {

        // Get the loaded model from gltf
        planetSurface = gltf.scene; 
        planetSurface.scale.set(1, 1, 1);
        planetSurface.position.set(0, -2, -2); 
        planetSurface.rotation.x = 0;

        // Traverse all meshes in the model to enable shadows
        planetSurface.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true; 
                child.receiveShadow = true; 
            }
        });

        // Add the planet surface to the group
        this.group.add(planetSurface);
    });
}



CreateAmbientLight() {
    const ambiLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
    this.group.add(ambiLight);
}

};