import { loadVideo } from "../loader.js";
import * as THREE from "three";

export function videoLoader({ path, ratio=0.5 }) {
  return new Promise(async (resolve, reject) => {
    const video = await loadVideo(path);
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, ratio);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const videoPlane = new THREE.Mesh(geometry, material);

    resolve([
      videoPlane,
      video,
    ]);
  });
}
