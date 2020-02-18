import 'normalize.css';
import './styles.scss';

import GameEngine from './GameEngine';

const canvasEl = document.querySelector('canvas');

const ge = GameEngine.getInstance(canvasEl);

window.addEventListener(
  'resize',
  () => {
    ge.onWindowResize();
  },
  false
);
function animate() {
  requestAnimationFrame(animate);
  ge.animate();
}
animate();
