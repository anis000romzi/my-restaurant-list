import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './views/components/header-bar';
import './views/components/footer-bar';
import './views/components/hero-element';
import './views/components/restaurant-item';
import './views/components/review-form';
import './views/components/like-button';
import App from './app';
import swRegister from './helpers/sw-register';

const mainElement = document.querySelector('#pageContainer');

const app = new App(mainElement);

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
