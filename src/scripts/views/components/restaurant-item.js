import CONFIG from '../../globals/config';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  set dataSource(source) {
    this._dataSource = source;
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
    }, 0);
  }

  connectedCallback() {
    this._fontAwesomeLoader();
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = /* HTML */ `
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        :host {
          width: 100%;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
        }

        .restaurant-item__thumbnail {
          width: 100%;
          position: relative;
        }

        .restaurant-item__picture {
          width: 100%;
        }

        .restaurant-item__rating {
          width: 50px;
          height: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgb(255, 113, 113);
          color: #fff;
          position: absolute;
          top: 25px;
          right: 25px;
          transform: translate(50%, -50%);
        }

        .restaurant-item__rating span {
          font-size: 1.2em;
        }

        .restaurant-item__rating i {
          font-size: 1.7em;
        }

        .restaurant-item__content {
          padding: 20px;
        }

        .restaurant-item__city {
          text-transform: uppercase;
          font-size: 1.05em;
          font-weight: bold;
        }

        .restaurant-item__title {
          font-size: 1.8em;
        }

        .restaurant-item__title > a {
          color: black;
          display: inline-block;
          min-width: 44px;
          min-height: 44px;
        }

        .restaurant-item__title > a:hover {
          color: rgb(255, 113, 113);
        }

        .restaurant-item__description {
          font-size: 1.2em;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }

        @media screen and (min-width: 425px) {
          .restaurant-item__content {
            padding: 20px 35px;
          }
        }

        @media screen and (min-width: 525px) {
          .restaurant-item__content {
            padding: 20px 50px;
          }

          .restaurant-item__description {
            font-size: 1.3em;
          }
        }

        @media screen and (min-width: 600px) {
          :host {
            width: 40%;
          }

          .restaurant-item__content {
            padding: 20px;
          }

          .restaurant-item__description {
            font-size: 1.2em;
          }
        }

        @media screen and (min-width: 850px) {
          .restaurant-item__content {
            padding: 20px 40px;
          }

          .restaurant-item__description {
            font-size: 1.3em;
          }
        }

        @media screen and (min-width: 1000px) {
          :host {
            width: 30%;
          }

          .restaurant-item__content {
            padding: 20px;
          }

          .restaurant-item__description {
            font-size: 1.2em;
          }
        }

        @media screen and (min-width: 1200px) {
          .restaurant-item__content {
            padding: 20px 30px;
          }

          .restaurant-item__description {
            font-size: 1.3em;
          }

          .restaurant-item__title {
            font-size: 2em;
          }
        }
      </style>

      <div class="restaurant-item__thumbnail">
        <img
          src="${CONFIG.BASE_IMAGE_URL_SMALL}${this._dataSource.pictureId}"
          class="restaurant-item__picture"
          alt="${this._dataSource.name}"
          loading="lazy"
        />
        <div class="restaurant-item__rating">
          <i class="fa fa-heart"></i>
          <span>${this._dataSource.rating}</span>
        </div>
      </div>
      <div class="restaurant-item__content">
        <span class="restaurant-item__city">
          <i class="fa-solid fa-location-pin"></i>
          ${this._dataSource.city}
        </span>
        <h3 class="restaurant-item__title">
          <a href="#/detail/${this._dataSource.id}">${this._dataSource.name}</a>
        </h3>
        <p class="restaurant-item__description">
          ${this._dataSource.description}
        </p>
      </div>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
