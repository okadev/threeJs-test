import * as THREE from 'three';
import Character from './Character';
import Menu from './Menu';
import { skirts, shirts, colors } from './resources';
import { doubleTap, isMobile } from './utils';

export default class GameEngine {
  private static instance: GameEngine;

  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private ligntDir: THREE.DirectionalLight;
  private ligntAmb: THREE.AmbientLight;
  private sound: THREE.Audio;
  private clock = new THREE.Clock(true);
  private canvasEl: HTMLCanvasElement;
  private menu = Menu.getInstance();

  private girlCharacter: Character;

  private constructor(canvasEl) {
    this.canvasEl = canvasEl;
    this.init();
  }

  public static getInstance(canvasEl): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine(canvasEl);
    }

    return GameEngine.instance;
  }

  public init = () => {
    /** SCENE */
    this.scene = new THREE.Scene();
    const bgTexture = new THREE.TextureLoader();
    bgTexture.load('./assets/2D/main_bg.png', texture => {
      this.scene.background = texture;
    });
    window.THREE = THREE;
    (window as any).scene = this.scene;

    /** RENDERER */
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasEl,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    /** CAMERA */
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // this.camera.lookAt(this.scene.position);
    this.camera.position.set(0, -3, -10);

    /** LIGHT */
    this.ligntAmb = new THREE.AmbientLight(0x323232);
    this.scene.add(this.ligntAmb);

    this.ligntDir = new THREE.DirectionalLight(0xffffff, 1);
    this.ligntDir.position.set(0, 0, 200);
    this.ligntDir.target.position.set(0, 0, 0);

    this.ligntDir.shadow.camera.near = 1;
    this.ligntDir.shadow.camera.far = 8000;
    this.ligntDir.shadow.camera.left = -3000;
    this.ligntDir.shadow.camera.bottom = -3000;
    this.ligntDir.shadow.camera.right = 3000;
    this.ligntDir.shadow.camera.top = 3000;
    this.ligntDir.shadow.bias = 0.0001;
    this.ligntDir.shadow.mapSize.width = 2048;
    this.ligntDir.shadow.mapSize.height = 2048;
    this.ligntDir.castShadow = true;
    this.scene.add(this.ligntDir);

    /** AUDIO */
    const listener = new THREE.AudioListener();
    this.camera.add(listener);
    this.sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('./assets/sounds/Main_menu_musics_1.ogg', buffer => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      this.sound.play();
    });

    /** CHARACTERS */
    this.girlCharacter = new Character();
    this.girlCharacter.load(
      './assets/3D/Main_characters_all_anims.gltf',
      () => {
        this.girlCharacter.scene.scale.set(0.1, 0.1, 0.1);
        this.girlCharacter.scene.position.set(0, -13, -30);

        this.girlCharacter.hidePartsOfScene(['by']);
        this.girlCharacter.hideSkinnedMeshes('grl', []);
        this.girlCharacter.displaySkinnedMeshes('grl', [
          'Girl_Body',
          'Girl_Teeth',
          'Girl_Eyebrow_01',
          'Girl_head_base',
          'Girl_Eyes',
          'Girl_eyes_1',
          'Girl_ears_1',
          'Girl_lips_1',
          'Girl_nose_1',
          'Girl_Eyelashes_1',
          'Girl_Hair_Cut_01',
          'Girl_Сhest',
          'Girl_Skirt_01',
          'Girl_Shirt_01',
          'Girl_Socks',
          'Girl_Shoes_02'
        ]);
        this.girlCharacter.scene.rotation.x = -0.2;

        this.girlCharacter.addAnimation(13, 'base');
        this.girlCharacter.addAnimation(14, 'base2');
        this.girlCharacter.addAnimation(15, 'base3');
        this.girlCharacter.addAnimation(25, 'step');
        this.girlCharacter.action.get('base').play();
        if (!isMobile()) {
          window.addEventListener('dblclick', e => {
            this.girlCharacter.randomAnimation();
          });
        } else {
          window.addEventListener('touchstart', e => {
            if (doubleTap()) {
              this.girlCharacter.randomAnimation();
            }
          });
        }
        this.girlCharacter.scene.rotation.set(-0.2, 0, 0);

        this.girlCharacter.rotate();

        this.scene.add(this.girlCharacter.scene);
      }
    );

    /** MENU */
    this.menu.addSkirtsButtons(skirts, this.girlCharacter);
    this.menu.addShirtsButtons(shirts, this.girlCharacter);
    this.menu.addHairColorsButtons(colors, this.girlCharacter);

    this.createScene();
  };

  private createScene() {
    // GROUND
    const geometry = new THREE.CircleGeometry(0.5, 32);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x505050,
      opacity: 0.2,
      transparent: true
    });
    const ground = new THREE.Mesh(geometry, planeMaterial);
    ground.position.set(0, -13, -30);
    ground.rotation.x = -1.8;
    ground.scale.set(10, 10, 10);
    ground.castShadow = false;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  private render() {
    const dt = this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
    if (this.girlCharacter.mixer) this.girlCharacter.mixer.update(dt);
  }

  public animate() {
    this.render();
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
