export interface Textures {
  mesh: string;
  paths: string[];
}

export const skirts: Textures = {
  mesh: 'Girl_Skirt_01',

  paths: [
    './assets/3D/textures/Tennis_Girl_Textures/Girl_common/Common_skirts/Girl_SkirtSG_2D_View03.png',
    './assets/3D/textures/Tennis_Girl_Textures/Girl_common/Common_skirts/Girl_SkirtSG_2D_View01.png',
    './assets/3D/textures/Tennis_Girl_Textures/Girl_common/Common_skirts/Girl_SkirtSG_2D_View02.png'
  ]
};

export const shirts: Textures = {
  mesh: 'Girl_Shirt_01',
  paths: [
    './assets/3D/textures/Tennis_Girl_Textures/Girl_common/Common_shirt/Girl_shirt_01_com_13.png',
    './assets/3D/textures/Tennis_Girl_Textures/Girl_common/Common_shirt/Girl_shirt_01_com_14.png',
    './assets/3D/textures/Tennis_Girl_Textures/Girl_common/Common_shirt/Girl_shirt_01_com_15.png'
  ]
};

export const colors = {
  mesh: 'Girl_Shirt_01',
  colors: [
    '0x252525',
    '0x4f1b02',
    '0x662404',
    '0xf15c13',
    '0xeff34e',
    '0xe1df80'
  ]
};
