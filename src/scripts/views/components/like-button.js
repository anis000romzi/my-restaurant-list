import LikedRestaurantIdb from '../../data/liked-restaurant-idb';

class LikeButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  set restaurantData(data) {
    this._restaurant = data;
  }

  async _fontAwesomeLoader() {
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
    }, 200);
  }

  connectedCallback() {
    this._renderButton();
  }

  async _renderButton() {
    await this._fontAwesomeLoader();
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async _isRestaurantExist(id) {
    const restaurant = await LikedRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  }

  _renderLike() {
    this._shadowRoot.innerHTML = `
    <style>
    .like {
        width: 55px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(255, 113, 113);
        
        position: fixed;
        bottom: 16px;
        right: 16px;
        border-radius: 50%;
        border: 0;
        
        font-size: 18px;
        color: white;
        cursor: pointer;
        z-index: 99;
    }
    </style>

    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa-regular fa-heart" aria-hidden="true"></i>
    </button>
    `;

    const likeButton = this._shadowRoot.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await LikedRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  }

  _renderLiked() {
    this._shadowRoot.innerHTML = `
    <style>
    .like {
        width: 55px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(255, 113, 113);
        
        position: fixed;
        bottom: 16px;
        right: 16px;
        border-radius: 50%;
        border: 0;
        
        font-size: 18px;
        color: white;
        cursor: pointer;
        z-index: 1;
    }
    </style>

    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa-solid fa-heart" aria-hidden="true"></i>
    </button>
    `;

    const likeButton = this._shadowRoot.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await LikedRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  }
}

customElements.define('like-button', LikeButton);
