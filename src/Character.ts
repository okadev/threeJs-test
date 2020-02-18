import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { isMobile } from './utils';

export default class Character {
  private gltfLoader: GLTFLoader;
  public mixer: THREE.AnimationMixer;
  public scene: THREE.Scene;
  private animations;
  public action = new Map();

  constructor() {}

  public load = (path: string, callback: () => void) => {
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.load(
      path,
      data => {
        this.scene = data.scene;
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.animations = data.animations;
        callback();
      },
      xhr => {},
      error => {
        console.log(error);
      }
    );
  };

  public addAnimation(index, name: string) {
    this.action.set(name, this.mixer.clipAction(this.animations[index]));
  }

  public hidePartsOfScene(names: string[]) {
    names.map(name => {
      this.scene.children.forEach(el => {
        if (el.name === name) el.visible = false;
      });
    });
  }

  public displayPartsOfScene(names: string[]) {
    names.map(name => {
      this.scene.children.forEach(el => {
        if (el.name === name) el.visible = true;
      });
    });
  }

  public changeMeshTextureColor(meshName: string, color: string) {
    const loader = new THREE.TextureLoader();
    const hair = this.scene.getObjectByName('Girl_Hair_Cut_01') as any;
    hair.material.color.setHex(color);
  }

  public changeMeshTexture(meshName: string, newTexturePath: string) {
    const mesh = this.scene.getObjectByName(meshName) as THREE.SkinnedMesh;

    const loader = new THREE.TextureLoader();

    loader.load(newTexturePath, texture => {
      mesh.material = new THREE.MeshStandardMaterial({
        map: texture,
        skinning: true
      });
    });

    mesh.visible = true;
  }

  public hideSkinnedMeshes(objName: string, meshesNames: string[]) {
    let object: THREE.Object3D;
    this.scene.children.forEach(el => {
      if (el.name === objName) object = el;
    });
    if (object) {
      if (meshesNames.length === 0) {
        object.children.forEach(el => {
          el.visible = false;
        });
      } else {
        meshesNames.map(meshName => {
          object.children.forEach(el => {
            if (el.name === meshName) el.visible = false;
          });
        });
      }
    }
  }

  public rotate() {
    let isPressed = false;
    let oldX = 0;
    if (!isMobile()) {
      window.addEventListener('mousedown', e => {
        if (e.button === 0) isPressed = true;
      });
      window.addEventListener('mouseup', e => {
        if (e.button === 0) isPressed = false;
      });
      window.addEventListener('mousemove', e => {
        if (isPressed && e.pageX > oldX) {
          this.scene.rotation.y += e.clientX / 10000;
        }
        if (isPressed && e.pageX < oldX) {
          this.scene.rotation.y -= e.clientX / 10000;
        }
        oldX = e.pageX;
      });
    } else {
      window.addEventListener('touchstart', e => {
        isPressed = true;
      });
      window.addEventListener('touchend', e => {
        isPressed = false;
      });
      window.addEventListener('touchmove', e => {
        if (isPressed && e.touches[0].pageX > oldX) {
          this.scene.rotation.y += e.touches[0].pageX / 5000;
        }
        if (isPressed && e.touches[0].pageX < oldX) {
          this.scene.rotation.y -= e.touches[0].pageX / 5000;
        }
        oldX = e.touches[0].pageX;
      });
    }
  }

  public randomAnimation() {
    this.mixer.stopAllAction();
    const count = this.action.size;
    const index = Math.floor(Math.random() * count);
    const actions = [];
    this.action.forEach(action => {
      actions.push(action);
    });
    this.scene.rotation.set(0, 0, 0);
    actions[index].play();
    this.scene.rotation.set(-0.2, 0, 0);
  }

  public displaySkinnedMeshes(objName: string, meshesNames: string[]) {
    let object: THREE.Object3D;
    this.scene.children.forEach(el => {
      if (el.name === objName) object = el;
    });
    if (object) {
      if (meshesNames.length === 0) {
        object.children.forEach(el => {
          el.visible = false;
        });
      } else {
        meshesNames.map(meshName => {
          object.children.forEach(el => {
            if (el.name === meshName) el.visible = true;
          });
        });
      }
    }
  }
}
