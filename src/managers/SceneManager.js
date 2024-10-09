import * as THREE from 'three' 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 
import GSAP from 'gsap' 

import StartScene from '../scenes/StartScene'
import Planet1 from '../scenes/Planet1' 

// Lav en scenemanager til at styre flere scener 
export default class SceneManager {

    stage = null 
    scenes = []
    currentScene = 0

    constructor(stageRef) {
        this.stage = stageRef
        this.initScenes()
    }

    initScenes() {
        this.scenes.push(
            new StartScene(),
            new Planet1(),
        )
    }


    /** Monterer en scene på stage 
    * @params {number} sceneId 
    */
    mountScene(sceneid) {
        const scene = this.scenes[sceneid] 

        scene.group.positon.copy(scene.group.userData.mountFromPosition)

        this.stage.add(scene.group)

        GSAP.to(scene.group.positon, {
            x:0,
            y:0,
            z:0,
            duration: 1,
            ease: 'power1.inOut'
        })
    }

     /** Afmonterer en scene på stage 
    * @params {number} sceneId 
    */
    unmountScene(sceneId) {
        const scene = this.scenes[sceneId]

        GSAP.to(scene.group.positon, {
            x: scene.group.userData.unmountToPosition.x,
            y: scene.group.userData.unmountToPosition.y,
            z: scene.group.userData.unmountToPosition.z,
            duration: 1,
            ease: 'power2.inOut',

            // Når animation er færdig, så slet scenen fra stage
            onComplete: () => {
                this.stage.remove(scene.group)
            }
        })
    }


    // Skift til den næste scene
    nextScene() {
        this.unmountScene(this.currentScene)
        this.currentScene = (this.currentScene + 1) % this.scenes.length
        this.mountScene(this.currentScene)
    }

    // Skift til den forrige scene
    previousScene() {
        this.unmountScene(this.currentScene)
        this.currentScene = (this.currentScene - 1 + this.scenes.length) % this.scenes.length
        this.mountScene(this.currentScene)
    }

    // Opdaterer den nuværende scene
    updateScene() {
        this.scenes[this.currentScene].update()
    }
}