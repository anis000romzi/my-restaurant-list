import LikedRestaurantIdb from '../../data/liked-restaurant-idb';

class HeaderBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  _fontAwesomeLoader() {
    const fontAwesomeScript = document.querySelector(
      'script[src*="fontawesome"]',
    );

    const id = setInterval(() => {
      const fontAwesomeFont = document.querySelector('#fa-v5-font-face');
      const fontAwesomeMain = document.querySelector('#fa-main');
      if (fontAwesomeScript && fontAwesomeFont && fontAwesomeMain) {
        this._shadowRoot.appendChild(fontAwesomeScript.cloneNode());
        this._shadowRoot.appendChild(fontAwesomeFont.cloneNode('deep'));
        this._shadowRoot.appendChild(fontAwesomeMain.cloneNode('deep'));
        clearInterval(id);
      }
    }, 700);
  }

  async connectedCallback() {
    this._fontAwesomeLoader();
    await this.render();
    this._openNavbarOnClick();
    this._closeNavbarOnClick();
  }

  _openNavbarOnClick() {
    this._shadowRoot
      .querySelector('#hamburger')
      .addEventListener('click', (event) => {
        this._shadowRoot.querySelector('#drawer').classList.toggle('open');
        event.stopPropagation();
      });
  }

  _closeNavbarOnClick() {
    document.querySelector('body').addEventListener('click', (event) => {
      this._shadowRoot.querySelector('#drawer').classList.remove('open');
      event.stopPropagation();
    });
  }

  async render() {
    this._shadowRoot.innerHTML = /* HTML */ `
    <style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .header {
        min-height: 56px;
        width: 100%;
        text-align: center;
      }
      
      .header__title {
        font-weight: 300;
        font-size: 2.5em;
        margin: 0.5em 0.25em;
        display: inline-block;
        color: #000;
      }
      
      #hamburger {
        font-size: 25px;
        color: black;
        min-width: 44px;
        min-height: 44px;
        border: none;
        background-color: white;
        position: fixed;
        left: 0;
        z-index: 99;
      }
      
      #hamburger:hover {
        color: rgb(255, 113, 113);
      }
      
      .nav {
        width: 200px;
        margin-left: auto;
        margin-right: auto;
        position: fixed;
        transform: translate(-300px, 0);
        transition: transform 0.3s ease-in-out;
        background-color: #fff;
        z-index: 99;
      }
      
      .nav.open {
        transform: translate(0, 0);
      }
      
      .nav__title {
        font-weight: 300;
        font-size: 2.5em;
        margin: 0.5em 0.5em;
        color: #000;
        display: none;
      }
      
      .nav__list {
        width: 100%;
        padding: 0;
        margin: 0;
      }
      
      .nav__item {
        width: 100%;
        line-height: 24px;
        font-size: 15px;
        padding: 10px 20px;
        text-transform: uppercase;
      }
      
      .nav a {
        text-decoration: none;
        color: #000;
        display: inline-block;
        line-height: 44px;
        min-width: 44px;
        min-height: 44px;
      }
      
      .nav__item:hover {
        background-color: rgb(255, 113, 113);
      }
      
      .nav__item:hover > a {
        color: #fff;
      }

      @media screen and (min-width: 930px) {
        #hamburger {
          display: none;
        }
      
        #header {
          display: none;
        }
      
        .nav {
          width: 100%;
          transform: translate(0, 0);
          align-items: center;
          display: flex;
          position: sticky;
          justify-content: space-between;
        }
      
        .nav__title {
          display: inline-block;
          font-size: 2.2em
        }
      
        .nav__list {
          width: 68%;
        }
      
        .nav__item {
          display: inline-block;
          text-align: center;
          width: 24%;
          padding: 20px 20px;
        }
      }

      @media screen and (min-width: 1200px) {
        .nav__title {
          font-size: 2.3em
        }
      
        .nav__list {
          width: 55%;
        }
      }
    </style>

    <div id="header" class="header">
      <h1 class="header__title">
        <i class="fa-solid fa-utensils"></i> My Restaurant List
      </h1>
    </div>
    <button id="hamburger" aria-label="Navigation button">☰</button>
    <nav id="drawer" class="nav">
      <h1 class="nav__title">
        <i class="fa-solid fa-utensils"></i> My Restaurant List
      </h1>
      <ul class="nav__list">
        <li class="nav__item">
        <a href="#/restaurants">Home <i class="fa-solid fa-house"></i></a>
        </li>
        <li class="nav__item">
        </i><a href="#/search">Search <i class="fa-solid fa-magnifying-glass"></i></a>
        </li>
        <li class="nav__item">
          <a href="#/liked-restaurants">Favorite: <strong id="numLiked">${await LikedRestaurantIdb.getNumbersOfLikedRestaurants()}</strong></a>
        </li>
        <li class="nav__item">
          <a href="https://github.com/anis000romzi" target="_blank" rel="noopener" rel="noreferrer"
            >About <i class="fa-solid fa-arrow-up-right-from-square"></i></a
          >
        </li>
      </ul>
    </nav>`;
  }
}

customElements.define('header-bar', HeaderBar);
