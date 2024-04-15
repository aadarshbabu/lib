import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { FontLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/FontLoader.js";

//const THREE = window.MINDAR.IMAGE? window.MINDAR.IMAGE.THREE: window.MINDAR.FACE.THREE;

export const loadGLTF = (path) => {
     const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/");
  
  return new Promise(async(resolve, reject) => {
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    const gltf = await loader.loadAsync(path);
    resolve(gltf)
    
  });
};

export const loadAudio = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.AudioLoader();
    loader.load(path, (buffer) => {
      resolve(buffer);
    });
  });
};

export const loadVideo = (path) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    //video.addEventListener('loadeddata', () => {
    video.addEventListener("loadedmetadata", () => {
      video.setAttribute("playsinline", "");
      resolve(video);
    });
    video.src = path;
  });
};

/**
 * @param {string} path The date
 * @return {Promise<THREE.Texture>}
 */

export const loadTexture = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(path, (texture) => {
      resolve(texture);
    });
  });
};

/**
 * @param {string[]} paths The date
 * @return {Promise<THREE.Texture>[]}
 */
export const loadTextures = (paths) => {
  const loader = new THREE.TextureLoader();
  const promises = [];
  for (let i = 0; i < paths.length; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        loader.load(paths[i], (texture) => {
          resolve(texture);
        });
      })
    );
  }
  return Promise.all(promises);
};


export const loadFont = () => {
    return new Promise((resolve, reject) => {
        const loader = new FontLoader();

        loader.load(
            "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/fonts/helvetiker_regular.typeface.json",
            (font) => {
                resolve(font); // Resolve the promise with the loaded font
            },
            undefined, // Progress callback (optional)
            (error) => {
                reject(error); // Reject the promise with the error
            }
        );
    });
};
