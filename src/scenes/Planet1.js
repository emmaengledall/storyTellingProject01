import * as THREE from 'three'; 

export default class Planet1 {

constructor(){
            this.group = new THREE.Group(); // vores gruppe, hvor alle vores objekter, for denne constructor ligger. En usylig placeholder. 
            this.CreateSurface(); 
            this.CreateAmbientLight();                             

}

CreateSurface() {
    const geometry3 = new THREE.SphereGeometry(6);
    const geotexture3 = new THREE.TextureLoader().load('src/textures/jupitertexture.jpg');   // Load texture
    const material3 = new THREE.MeshStandardMaterial({ map: geotexture3 }); // Green color for variety
    this.mesh3 = new THREE.Mesh(geometry3, material3);
    this.mesh3.position.set(0, -5, 0); // Different position
    this.group.add(this.mesh3)

};

CreateAmbientLight() {
    const ambiLight = new THREE.AmbientLight(0xFFFFFF, 1);
    this.group.add(ambiLight);
}

};