import { Textures } from './resources';

export default class Menu {
  private static instance: Menu;
  private menuEl;

  private constructor() {
    this.menuEl = document.querySelector('.menu');
  }

  public static getInstance(): Menu {
    if (!Menu.instance) {
      Menu.instance = new Menu();
    }

    return Menu.instance;
  }

  public addSkirtsButtons(textures: Textures, character) {
    textures.paths.map((path, i) => {
      const button = document.createElement('button');
      button.innerHTML = `skirt-${i}`;
      button.addEventListener('click', () => {
        character.changeMeshTexture(textures.mesh, path);
      });
      this.menuEl.appendChild(button);
    });
  }
  public addShirtsButtons(textures: Textures, character) {
    textures.paths.map((path, i) => {
      const button = document.createElement('button');
      button.innerHTML = `shirt-${i}`;
      button.addEventListener('click', () => {
        character.changeMeshTexture(textures.mesh, path);
      });
      this.menuEl.appendChild(button);
    });
  }
  public addHairColorsButtons(colors, character) {
    colors.colors.map((color, i) => {
      const button = document.createElement('button');
      button.innerHTML = `${color}`;
      button.addEventListener('click', () => {
        character.changeMeshTextureColor(colors.mesh, color);
      });
      this.menuEl.appendChild(button);
    });
  }
}
