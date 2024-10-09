import * as THREE from 'three'; 

export default class StartScene {

constructor(){
            this.group = new THREE.Group(); // vores gruppe, hvor alle vores objekter, for denne constructor ligger. En usylig placeholder. 
            this.CreateGeometry(); 
            this.CreateAmbientLight();
}

CreateGeometry() {

    // First sphere
    const geometry1 = new THREE.SphereGeometry();
    const geotexture1 = new THREE.TextureLoader().load('src/textures/venustexture.jpg');   // Load texture
    const material = new THREE.MeshPhongMaterial({ map: geotexture1 });  // Create material and apply the texture
    this.mesh = new THREE.Mesh(geometry1, material);  // Create the mesh with geometry and material (with texture)
    this.mesh.position.set(0, 0, -20); // Set the position of the sphere
    this.group.add(this.mesh);   // Add the sphere to the group
    
    
    
     // Anden sphere
     const geometry2 = new THREE.SphereGeometry();
     const geotexture2 = new THREE.TextureLoader().load('src/textures/pinktexture.jpg');   // Load texture
     const material2 = new THREE.MeshStandardMaterial({ map: geotexture2}); // Red color for variety
     this.mesh2 = new THREE.Mesh(geometry2, material2);
     this.mesh2.position.set(-5, 5, -10); // Different position
     this.group.add(this.mesh2);
 
     // Tredje sphere
     const geometry3 = new THREE.SphereGeometry(1.5);
     const geotexture3 = new THREE.TextureLoader().load('src/textures/jupitertexture.jpg');   // Load texture
     const material3 = new THREE.MeshStandardMaterial({ map: geotexture3 }); // Green color for variety
     this.mesh3 = new THREE.Mesh(geometry3, material3);
     this.mesh3.position.set(3, -3, -15); // Different position
     this.group.add(this.mesh3);
 }
    
 CreateAmbientLight() {
    const ambiLight = new THREE.AmbientLight(0xFFFFFF, 1);
    this.group.add(ambiLight);

}; 

update() {
    this.mesh.rotation.y += 0.01;
    this.mesh2.rotation.y += 0.01;
    this.mesh3.rotation.y += 0.01;
}
}


